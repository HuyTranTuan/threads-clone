import http from "@/utils/http";

export const interactionsServices = {
  like: async (id) => {
    const response = await http.post(`posts/${id}/like`);
    return response.data;
  },
  repost: async (id) => {
    const response = await http.post(`posts/${id}/repost`);
    return response.data;
  },
  _buildFormData: (data) => {
    const formData = new FormData();
    formData.append("content", data.content);

    if (data.media && data.media.length > 0) {
      data.media.forEach((file) => {
        formData.append("media[]", file);
      });
    } else {
      formData.append("media[]", "");
    }

    formData.append("reply_permission", data.reply_permission || "");
    return formData;
  },
  quote: async (id, data) => {
    const formData = interactionsServices._buildFormData(data);
    const response = await http.post(`posts/${id}/quote`, formData);
    return response.data;
  },
  reply: async (id, data) => {
    const formData = interactionsServices._buildFormData(data);
    const response = await http.post(`posts/${id}/reply`, formData);
    return response.data;
  },
};
