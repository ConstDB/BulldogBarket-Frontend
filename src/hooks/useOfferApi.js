import { createOffer } from "@/api/OffersApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateOffer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOffer,
    onSuccess: () => queryClient.invalidateQueries(["offers"]),
  });
};
