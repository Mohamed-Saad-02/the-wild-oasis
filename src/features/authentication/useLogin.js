import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      if (user.role === "admin") {
        localStorage.setItem("token", user.token);
        navigate("/", { replace: true });
      } else {
        toast.error("You are not authorized to access this page");
        localStorage.removeItem("token");
        queryClient.clear();
      }
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Provided email or password are incorrect");
    },
  });

  return { login, isPending };
}
