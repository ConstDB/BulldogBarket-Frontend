import { buyerConfirmReceived } from "@/api/OrderApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useBuyerConfirmReceivedMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId) => buyerConfirmReceived(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["buyer-orders", "completed"] });
    },
  });
};
