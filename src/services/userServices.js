import http from "@/utils/http";

export const userServices = {
  mute: async (userId) => {
    const response = await http.post(`users/${userId}/mute`);
    return response.data;
  },
  unmute: async (userId) => {
    const response = await http.post(`users/${userId}/unmute`);
    return response.data;
  },
  restrict: async (userId) => {
    const response = await http.post(`users/${userId}/restrict`);
    return response.data;
  },
  unrestrict: async (userId) => {
    const response = await http.post(`users/${userId}/unrestrict`);
    return response.data;
  },
  block: async (userId) => {
    const response = await http.post(`users/${userId}/block`);
    return response.data;
  },
  unblock: async (userId) => {
    const response = await http.post(`users/${userId}/unblock`);
    return response.data;
  },
};
