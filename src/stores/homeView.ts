import { defineStore } from "pinia";

interface NewsItemDTO {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
}

interface HomeViewDTO {
  newsItems: NewsItemDTO[];
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useHomeViewStore = defineStore("homeView", {
  state: () => ({
    homePageData: null as HomeViewDTO | null,
    isLoading: false,
    error: null as string | null,
  }),

  getters: {
    getNewsItems: (state) => state.homePageData?.newsItems || [],
  },

  actions: {
    fetchHomePageData() {
      this.isLoading = true;
      this.error = null;

      return fetch(`${API_BASE_URL}/home-page`, {
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
        .then((data: HomeViewDTO) => {
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
  },
});
