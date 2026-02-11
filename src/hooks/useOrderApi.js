import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createOrder,
  getSellerPendingOrder,
  markOrderAsComplete,
  sellerCancelOrder,
} from "@/api/OrderApi";

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

export const useMarkOrderAsComplete = (orderId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markOrderAsComplete,
    onSuccess: () => queryClient.invalidateQueries(["orders"]),
  });
};

export const useSellerCancelOrder = (data) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sellerCancelOrder,
    onSuccess: () => queryClient.invalidateQueries(["orders"]),
  });
};
