import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export default function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateSettings } = useMutation({
    mutationKey: ["update Settings"],
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Setting is updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateSettings };
}
