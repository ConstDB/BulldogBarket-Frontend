import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import { createOrder } from "@/api/OrderApi";

export const useCreateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({mutationFn: createOrder, 
        onSuccess:() => queryClient.invalidateQueries(["orders"])
    });
};