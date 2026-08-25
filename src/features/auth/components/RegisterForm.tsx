import { Lock, Mail, User } from "lucide-react";
import { Button } from "../../../components/ui/Button/Button";
import { Form } from "../../../components/ui/Form/Form";
import { FormField } from "../../../components/ui/FormField/FormField";
import {
  registerUserSchema,
  type RegisterFormType,
} from "../schemas/auth.schemas";

export default function RegisterForm() {
  const handleRegister = (data) => {
    console.log("RHFData>>>", data);
  };

  return (
    <div>
      <Form<RegisterFormType>
        schema={registerUserSchema}
        defaultValues={{
          name: "",
          email: "",
          password: "",
        }}
        mode="onChange"
        onSubmit={handleRegister}
      >
        <div className="flex flex-col gap-3 w-full">
          <FormField<RegisterFormType>
            name="name"
            placeholder="Full name"
            autoComplete="name"
            leftIcon={<User className="size-4" />}
          />

          <FormField<RegisterFormType>
            name="email"
            type="email"
            leftIcon={<Mail className="size-4" />}
            placeholder="Email address"
            autoComplete="email"
          />

          <FormField<RegisterFormType>
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            leftIcon={<Lock className="size-4" />}
            passwordToggle
          />

          <FormField<RegisterFormType>
            name="confirmPassword"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            leftIcon={<Lock className="size-4" />}
            passwordToggle
          />

          <Button type="submit">Create account</Button>
        </div>
      </Form>
    </div>
  );
}
