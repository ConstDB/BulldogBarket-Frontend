import api from "@/lib/axios";

export const createOffer = async (offerData) => {
  const response = await api.post("/offers", offerData);
  return response.data;
};
