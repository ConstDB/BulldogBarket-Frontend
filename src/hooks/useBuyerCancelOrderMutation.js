import { buyerCancelOrder } from "@/api/OrderApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useBuyerCancelOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId) => buyerCancelOrder(orderId),
    onSuccess: () => queryClient.invalidateQueries(["buyer-orders", "pending"]),
  });
};
