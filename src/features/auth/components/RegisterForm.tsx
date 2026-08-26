import { useMutation } from "@tanstack/react-query";
import { Button } from "../../../components/ui/Button/Button";
import { Form } from "../../../components/ui/Form/Form";
import { FormField } from "../../../components/ui/FormField/FormField";
import { registerApi } from "../api/auth.api";
import {
  registerUserSchema,
  type RegisterFormType,
} from "../schemas/auth.schemas";
import { registerFields } from "../types/AuthFields";
import { appToast } from "../../../components/common/Toaster/Toast";
import { useNavigate } from "react-router";

export default function RegisterForm() {
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: registerApi,

    onSuccess: (res) => {
      appToast.success(res.message || "user registered successfully");
      navigate("/auth/login");
    },
    onError: (error) => {
      appToast.error(error.message);
    },
  });

  const handleRegister = async (data: RegisterFormType) => {
    const { confirmPassword, ...payload } = data;
    registerMutation.mutate(payload);
  };

  return (
    <div>
      <Form<RegisterFormType>
        schema={registerUserSchema}
        mode="onChange"
        onSubmit={handleRegister}
      >
        {(methods) => (
          <div className="mt-8 flex w-full flex-col gap-3">
            {registerFields.map((field) => (
              <FormField<RegisterFormType> key={field.name} {...field} />
            ))}
            <Button
              type="submit"
              disabled={
                !methods.formState.isValid || registerMutation.isPending
              }
              isLoading={registerMutation.isPending}
            >
              {registerMutation.isPending
                ? "Creating account"
                : "Create account"}
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
}
