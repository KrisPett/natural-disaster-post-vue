import { defineStore } from "pinia";

interface NewsItemDTO {
  id: string;
  title: string;
  description: string;
  date: string;
  imageSrc: string;
  content: string;
}

interface NewsItemPageDTO {
  newsItem: NewsItemDTO;
}

export const useNewsItemViewStore = defineStore("newsItemView", {
  state: () => ({
    newsItemsCache: new Map<string, NewsItemDTO>(),
    currentNewsItem: null as NewsItemDTO | null,
    isLoading: false,
    error: null as string | null,
  }),

  getters: {
    getNewsItemById:
      (state) =>
      (id: string): NewsItemDTO | undefined => {
        return state.newsItemsCache.get(id);
      },

    isItemCached:
      (state) =>
      (id: string): boolean => {
        return state.newsItemsCache.has(id);
      },

    cacheSize: (state) => state.newsItemsCache.size,
  },

  actions: {
    async fetchNewsItem(id: string): Promise<NewsItemDTO | undefined> {
      const cached = this.newsItemsCache.get(id);
      if (cached) {
        this.currentNewsItem = cached;
        return cached;
      }

      this.isLoading = true;
      this.error = null;

      try {
        const response = await fetch(`/api/news/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: NewsItemPageDTO = await response.json();

        this.newsItemsCache.set(id, data.newsItem);
        this.currentNewsItem = data.newsItem;

        return data.newsItem;
      } catch (error) {
        this.error = error instanceof Error ? error.message : `Failed to load news item ${id}`;
        console.error("News item fetch error:", error);
        return undefined;
      } finally {
        this.isLoading = false;
      }
    },

    setCurrentNewsItem(id: string): boolean {
      const item = this.newsItemsCache.get(id);
      if (item) {
        this.currentNewsItem = item;
        return true;
      }
      return false;
    },

    async refreshNewsItem(id: string): Promise<NewsItemDTO | undefined> {
      this.newsItemsCache.delete(id);
      return await this.fetchNewsItem(id);
    },

    clearCurrentItem() {
      this.currentNewsItem = null;
    },

    clearCache() {
      this.newsItemsCache.clear();
      this.currentNewsItem = null;
      this.error = null;
    },

    clearError() {
      this.error = null;
    },

    removeFromCache(id: string) {
      this.newsItemsCache.delete(id);
      if (this.currentNewsItem?.id === id) {
        this.currentNewsItem = null;
      }
    },
  },
});
