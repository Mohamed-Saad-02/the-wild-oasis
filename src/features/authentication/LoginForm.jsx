import { useForm } from "react-hook-form";

import { useLogin } from "./useLogin";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  const { login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { email: "mohamedsaad23c@gmail.com", password: "0110Mo#5" },
  });

  const onSubmit = (data) =>
    login(data, { onSettled: () => reset({ email: "", password: "" }) });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          disabled={isPending}
          {...register("email", {
            required: "This Field Is Required",
          })}
        />
      </FormRowVertical>
      <FormRowVertical label="Password" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isPending}
          {...register("password", { required: "This Field Is Required" })}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button $size="large" disabled={isPending}>
          {isPending ? <SpinnerMini /> : "Log in"}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
