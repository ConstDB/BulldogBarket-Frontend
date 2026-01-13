import { getSellerDashboardSummary } from "@/api/users";
import { useQuery } from "@tanstack/react-query";

export const useFetchDashboardSummary = () => {
  return useQuery({
    queryKey: ["dashboardSummary"],
    queryFn: getSellerDashboardSummary,
  });
};
