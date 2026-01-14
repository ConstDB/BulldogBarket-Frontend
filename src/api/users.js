import api from "@/lib/axios";

export const fetchUserProfile = async () => {
  const { data } = await api.get("/users/me");
  return data;
};

export const getSellerDashboardSummary = async () => {
  const { data } = await api.get("/users/seller/dashboard/summary");
  return data;
};
