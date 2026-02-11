import { editUserProfile } from "@/api/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditProfileMutation = () => {
  const queryCLient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => editUserProfile(payload),
    onSuccess: () => queryCLient.invalidateQueries({ queryKey: ["user"] }),
  });
};
