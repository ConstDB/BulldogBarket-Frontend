import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder, getSellerPendingOrder } from "@/api/OrderApi";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => queryClient.invalidateQueries(["orders"]),
  });
};

export const useGetSellerPendingOrder = () => {
  return useQuery({
    queryKey: ["seller-pending-order"],
    queryFn: getSellerPendingOrder,
  });
};
