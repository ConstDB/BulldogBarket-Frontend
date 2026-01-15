import api from "@/lib/axios";

export const createOffer = async (offerData) => {
  const response = await api.post("/offers", offerData);
  return response.data;
};

export const getBuyerPendingOffers = async () => {
  const { data } = await api.get(`/offers/buyer/pending`);
  return data;
};

export const cancelOffer = async (offerId) => {
  await api.patch(`/offers/${offerId}/cancel`);
};

export const getSellerPendingOffers = async () => {
  const { data } = await api.get(`/offers/seller/pending`);
  return data;
};
