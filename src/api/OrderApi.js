import api from "../lib/axios";

export const createOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data;
};

export const getBuyerOrder = async (status) => {
  const { data } = await api.get("/orders/buyer", { params: { status } });
  return data;
};
