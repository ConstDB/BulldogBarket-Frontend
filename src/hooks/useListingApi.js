import { getActiveListing } from "@/api/ListingApi";
import { useQuery } from "@tanstack/react-query";

export const useGetActiveListings = () => {
  return useQuery({
    queryKey: ["seller-active-listings"],
    queryFn: getActiveListing,
  });
};
