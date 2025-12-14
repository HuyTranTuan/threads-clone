import http from "@/utils/http";

export const searchServices = {
  search: async (query, page = 1, perPageTopics = 10, perPageUsers = 10) => {
    const response = await http.get(`search`, {
      params: {
        q: query,
        page,
        per_page_topics: perPageTopics,
        per_page_users: perPageUsers,
      },
    });
    return response.data;
  },

  searchTopics: async (query) => {
    const response = await http.get(`topics/search`, {
      params: { q: query },
    });
    return response.data;
  },

  getUserSuggestions: async (page = 1, perPage = 10) => {
    const response = await http.get(`users/suggestions`, {
      params: { page, per_page: perPage },
    });
    return response.data;
  },

  followUser: async (userId) => {
    const response = await http.post(`users/${userId}/follow`);
    return response.data;
  },

  unfollowUser: async (userId) => {
    const response = await http.del(`users/${userId}/follow`);
    return response.data;
  },
};

export default searchServices;
