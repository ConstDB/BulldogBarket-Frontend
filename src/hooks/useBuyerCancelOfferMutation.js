import { cancelOffer } from "@/api/OffersApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useBuyerCancelOfferMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (offerId) => cancelOffer(offerId),
    onSuccess: () => queryClient.invalidateQueries(["offers"]),
  });
};
