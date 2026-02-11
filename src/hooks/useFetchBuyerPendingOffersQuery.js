import { getBuyerPendingOffers } from "@/api/OffersApi";
import { useQuery } from "@tanstack/react-query";

export const useFetchBuyerPendingOffersQuery = () => {
  return useQuery({
    queryKey: ["buyer-pending-offers"],
    queryFn: getBuyerPendingOffers,
  });
};
