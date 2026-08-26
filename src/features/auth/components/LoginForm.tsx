import { Button } from "../../../components/ui/Button/Button";
import { Form } from "../../../components/ui/Form/Form";
import { FormField } from "../../../components/ui/FormField/FormField";
import { loginUserSchema, type LoginFormType } from "../schemas/auth.schemas";
import { loginFields } from "../types/AuthFields";

export default function LoginForm() {
  const handleLogin = (data) => {
    console.log("RHFData>>>", data);
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
              disabled={
                !methods.formState.isValid || methods.formState.isSubmitting
              }
              isLoading={methods.formState.isSubmitting}
            >
              {methods.formState.isSubmitting
                ? "Creating account"
                : "Create account"}
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
}
