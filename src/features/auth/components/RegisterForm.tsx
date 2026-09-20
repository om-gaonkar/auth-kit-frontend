import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";

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

import EmailVerification from "./EmailVerification";

interface RegisterFieldsProps {
  emailVerified: boolean;
  onEmailVerified: (email: string) => void;
}

function RegisterFields({ onEmailVerified }: Readonly<RegisterFieldsProps>) {
  const { watch, formState } = useFormContext<RegisterFormType>();

  const email = watch("email");
  const emailError = formState.errors.email;

  const isValidEmail = Boolean(email?.trim()) && !emailError;

  return (
    <>
      {registerFields.map((field) => {
        if (field.name === "email") {
          return (
            <div key={field.name}>
              <FormField<RegisterFormType> {...field} />

              <EmailVerification
                email={email || ""}
                isEmailValid={isValidEmail}
                onVerified={onEmailVerified}
              />
            </div>
          );
        }

        return <FormField<RegisterFormType> key={field.name} {...field} />;
      })}
    </>
  );
}

export default function RegisterForm() {
  const navigate = useNavigate();

  const [emailVerified, setEmailVerified] = useState(false);

  const [verifiedEmail, setVerifiedEmail] = useState("");

  const registerMutation = useMutation({
    mutationFn: registerApi,

    onSuccess: (response) => {
      appToast.success(response.message || "User registered successfully");

      navigate("/auth/login");
    },

    onError: (error: Error) => {
      appToast.error(error.message);
    },
  });

  const handleRegister = async (data: RegisterFormType) => {
    const email = data.email.trim().toLowerCase();

    if (!emailVerified) {
      appToast.error("Please verify your email first");
      return;
    }

    if (email !== verifiedEmail) {
      appToast.error("Please verify this email address");
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...payload } = data;

    registerMutation.mutate({
      ...payload,
      email,
    });
  };

  return (
    <Form<RegisterFormType>
      schema={registerUserSchema}
      mode="onChange"
      onSubmit={handleRegister}
      defaultValues={{
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
    >
      {(methods) => (
        <div className="mt-8 flex w-full flex-col gap-3">
          <RegisterFields
            emailVerified={emailVerified}
            onEmailVerified={(email) => {
              setEmailVerified(true);
              setVerifiedEmail(email);
            }}
          />

          <Button
            type="submit"
            disabled={
              !methods.formState.isValid ||
              !emailVerified ||
              registerMutation.isPending
            }
            isLoading={registerMutation.isPending}
          >
            {registerMutation.isPending ? "Creating account" : "Create account"}
          </Button>
        </div>
      )}
    </Form>
  );
}
