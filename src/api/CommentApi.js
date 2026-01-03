import api from "../lib/axios";

export const createComment = async ({ listingId, message }) => {
  const response = await api.post(`/listings/${listingId}/comments`, {
    message,
  });
  return response.data;
};
