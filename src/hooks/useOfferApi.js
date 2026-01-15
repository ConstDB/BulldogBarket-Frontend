import {
  approvePendingOffers,
  createOffer,
  getSellerPendingOffers,
  rejectPendingOffers,
} from "@/api/OffersApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateOffer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOffer,
    onSuccess: () => queryClient.invalidateQueries(["offers"]),
  });
};

export const useGetSellerPendingOffer = () => {
  return useQuery({
    queryKey: ["seller-pending-offers"],
    queryFn: getSellerPendingOffers,
  });
};

export const useApprovePendingOffer = (offerId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: approvePendingOffers,
    onSuccess: () => queryClient.invalidateQueries("offers"),
  });
};

export const useRejectPendingOffer = (offerId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rejectPendingOffers,

    onSuccess: () => queryClient.invalidateQueries("offers"),
  });
};
