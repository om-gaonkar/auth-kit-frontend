import { useMutation } from "@tanstack/react-query";
import { Button } from "../../../components/ui/Button/Button";
import { Form } from "../../../components/ui/Form/Form";
import { FormField } from "../../../components/ui/FormField/FormField";
import { loginUserSchema, type LoginFormType } from "../schemas/auth.schemas";
import { loginFields } from "../types/AuthFields";
import { useNavigate } from "react-router";
import { appToast } from "../../../components/common/Toaster/Toast";
import { loginApi } from "../api/auth.api";
import { useAuth } from "../../../app/providers/Auth/AuthContext";

export default function LoginForm() {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser, setAccessToken } = useAuth();

  const loginMutation = useMutation({
    mutationFn: loginApi,

    onSuccess: (res) => {
      setUser(res.data.user);
      setAccessToken(res.data.accessToken);
      setIsAuthenticated(true);
      navigate("/user/profile");
    },
    onError: (error) => {
      appToast.error(error.message);
    },
  });

  const handleLogin = (data: LoginFormType) => {
    loginMutation.mutate(data);
  };

  return (
    <div>
      <Form<LoginFormType>
        schema={loginUserSchema}
        mode="onChange"
        onSubmit={handleLogin}
      >
        {(methods) => (
          <div className="flex w-full flex-col gap-3">
            {loginFields.map((field) => (
              <FormField<LoginFormType> key={field.name} {...field} />
            ))}

            <Button
              type="submit"
              disabled={!methods.formState.isValid || loginMutation.isPending}
              isLoading={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
}
