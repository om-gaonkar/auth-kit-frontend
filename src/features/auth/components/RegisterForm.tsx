import { Button } from "../../../components/ui/Button/Button";
import { Form } from "../../../components/ui/Form/Form";
import { FormField } from "../../../components/ui/FormField/FormField";
import {
  registerUserSchema,
  type RegisterFormType,
} from "../schemas/auth.schemas";
import { registerFields } from "../types/AuthFields";

export default function RegisterForm() {
  const handleRegister = (data) => {
    console.log("RHFData>>>", data);
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
