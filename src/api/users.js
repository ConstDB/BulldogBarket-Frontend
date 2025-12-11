import api from "@/lib/axios";

export const fetchUserProfile = async () => {
  const { data } = await api.get("/users/me");
  return data;
};
