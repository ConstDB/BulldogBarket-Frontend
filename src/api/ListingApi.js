import api from "@/lib/axios";

export const getActiveListing = async () => {
  const { data } = await api.get("/listings/seller/active");
  return data;
};
