import { defineStore } from "pinia";

interface NewsItemDTO {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
}

interface HomePageDTO {
  newsItems: NewsItemDTO[];
}

export const useHomeViewStore = defineStore("homeView", {
  state: () => ({
    homePageData: null as HomePageDTO | null,
    isLoading: false,
    error: null as string | null,
  }),

  getters: {
    newsItems: (state) => state.homePageData?.newsItems ?? [],

    featuredItems: (state) => state.homePageData?.newsItems.slice(0, 3) ?? [],

    recentItems: (state) => state.homePageData?.newsItems.slice(0, 5) ?? [],

    getNewsItemById:
      (state) =>
      (id: string): NewsItemDTO | undefined => {
        return state.homePageData?.newsItems.find((item) => item.id === id);
      },

    hasData: (state) => state.homePageData !== null && state.homePageData.newsItems.length > 0,
  },

  actions: {
    fetchHomePageData() {
      this.isLoading = true;
      this.error = null;

      return fetch("http://localhost:8080/home-page", {
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
        .then((data: HomePageDTO) => {
          this.homePageData = data;
          return data;
        })
        .catch((error) => {
          this.error = error instanceof Error ? error.message : "Failed to load home page data";
          console.error("Home page fetch error:", error);
          throw error;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    async refreshData() {
      await this.fetchHomePageData();
    },

    clearData() {
      this.homePageData = null;
      this.error = null;
    },

    clearError() {
      this.error = null;
    },
  },
});
