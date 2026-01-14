import { getBuyerPendingOffers } from "@/api/OrderApi";
import { useQuery } from "@tanstack/react-query";

export const useFetchBuyerPendingOffersQuery = () => {
  return useQuery({
    queryKey: ["buyer-pending-offers"],
    queryFn: getBuyerPendingOffers,
  });
};
