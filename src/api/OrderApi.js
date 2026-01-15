import api from "../lib/axios";

export const createOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data;
};

export const getBuyerOrder = async (status) => {
  const { data } = await api.get("/orders/buyer", { params: { status } });
  return data;
};

export const buyerCancelOrder = async (orderId) => {
  await api.patch(`/orders/${orderId}/buyer-cancel`);
};

export const buyerConfirmReceived = async (orderId) => {
  await api.patch(`/orders/${orderId}/complete/buyer`);
};

export const getSellerPendingOrder = async () => {
  const { data } = await api.get(`/orders/seller/pending`);
  return data;
};
