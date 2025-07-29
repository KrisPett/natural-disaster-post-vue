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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useNewsItemViewStore = defineStore("newsItemView", {
  state: () => ({
    currentNewsItem: null as NewsItemDTO | null,
    isLoading: false,
    error: null as string | null,
  }),

  getters: {},

  actions: {
    fetchNewsItem(id: string) {
      this.isLoading = true;
      this.error = null;

      return fetch(`${API_BASE_URL}/news-item-page/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data: NewsItemPageDTO) => {
          this.currentNewsItem = data.newsItem;
          return data.newsItem;
        })
        .catch((error) => {
          this.error = error instanceof Error ? error.message : `Failed to load news item ${id}`;
          console.error("News item fetch error:", error);
          throw error;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
});
