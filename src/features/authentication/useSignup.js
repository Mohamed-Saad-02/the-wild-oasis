import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { isPending, mutate: signup } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        "Account successfully created!"
      );
    },
    onError: (error) => {
      toast.error(error.response.data.message || "An error occurred during signup");
    },
  });

  return { isPending, signup };
}
