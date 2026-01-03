import { createComment } from "@/api/CommentApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createComment,
    onSuccess: () => queryClient.invalidateQueries(["comments"]),
  });
};
