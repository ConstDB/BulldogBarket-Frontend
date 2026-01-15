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

export const markOrderAsComplete = async (orderId) => {
  const response = await api.patch(`/orders/${orderId}/complete/seller`);
  return response.data;
};

export const sellerCancelOrder = async (data) => {
  const orderId = data.orderId;
  delete data.orderId;
  const response = await api.patch(`/orders/${orderId}/seller-cancel`, data);
  return response.data;
};
