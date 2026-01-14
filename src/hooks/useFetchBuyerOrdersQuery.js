import { getBuyerOrder } from "@/api/OrderApi";
import { useQuery } from "@tanstack/react-query";

export const useFetchBuyerOrdersQuery = (status) => {
  return useQuery({
    queryKey: ["buyer-orders", status],
    queryFn: () => getBuyerOrder(status),
    enabled: !!status,
  });
};

export const usePendingBuyerOrdersQuery = () => {
  return useFetchBuyerOrdersQuery("pending");
};

export const useCompletedBuyerOrdersQuery = () => {
  return useFetchBuyerOrdersQuery("completed");
};

export const useCancelledBuyerOrdersQuery = () => {
  return useFetchBuyerOrdersQuery("cancelled");
};
