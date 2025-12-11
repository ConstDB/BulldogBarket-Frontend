import { fetchUserProfile } from "@/api/users";
import { useQuery } from "@tanstack/react-query";

export const useFetchProfileQuery = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUserProfile,
  });
};
