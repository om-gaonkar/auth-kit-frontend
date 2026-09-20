import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2 } from "lucide-react";

import { Button } from "../../../components/ui/Button/Button";
import { Input } from "../../../components/ui/Input/Input";

import { sendVerificationOtpApi, verifyEmailOtpApi } from "../api/auth.api";

import { appToast } from "../../../components/common/Toaster/Toast";

interface Props {
  email: string;
  isEmailValid: boolean;
  onVerified: (email: string) => void;
}

export default function EmailVerification({
  email,
  isEmailValid,
  onVerified,
}: Readonly<Props>) {
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [cooldown, setCooldown] = useState(0);

  const sendOtpMutation = useMutation({
    mutationFn: sendVerificationOtpApi,

    onSuccess: (response) => {
      setOtpSent(true);
      setCooldown(60);

      appToast.success(response.message || "Verification OTP sent");
    },

    onError: (error: Error) => {
      appToast.error(error.message);
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: () => verifyEmailOtpApi(email, otp),

    onSuccess: (response) => {
      setVerified(true);
      setVerifiedEmail(email);
      setOtp("");
      setOtpSent(false);
      setCooldown(0);

      onVerified(email);

      appToast.success(response.message || "Email verified successfully");
    },

    onError: (error: Error) => {
      appToast.error(error.message);
    },
  });

  useEffect(() => {
    if (cooldown === 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  useEffect(() => {
    if (email === verifiedEmail) return;

    setVerified(false);
    setOtpSent(false);
    setOtp("");
    setCooldown(0);
    setVerifiedEmail("");
  }, [email, verifiedEmail]);

  const handleSendOtp = () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      appToast.error("Enter your email address first");
      return;
    }

    sendOtpMutation.mutate(normalizedEmail);
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      appToast.error("Enter the 6-digit OTP");
      return;
    }

    verifyOtpMutation.mutate();
  };

  if (verified && email === verifiedEmail) {
    return (
      <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
        <CheckCircle2 size={18} />
        <span>Email verified</span>
      </div>
    );
  }

  return (
    <div className="mt-2 space-y-3">
      <Button
        type="button"
        onClick={handleSendOtp}
        disabled={!isEmailValid || cooldown > 0 || sendOtpMutation.isPending}
        isLoading={sendOtpMutation.isPending}
      >
        {cooldown > 0
          ? `Resend in ${cooldown}s`
          : otpSent
            ? "Resend OTP"
            : "Verify Email"}
      </Button>

      {otpSent && (
        <div className="flex gap-2">
          <Input
            value={otp}
            onChange={(event) => {
              const value = event.target.value.replace(/\D/g, "").slice(0, 6);

              setOtp(value);
            }}
            placeholder="Enter 6-digit OTP"
            inputMode="numeric"
            autoComplete="one-time-code"
          />

          <Button
            type="button"
            onClick={handleVerifyOtp}
            disabled={otp.length !== 6 || verifyOtpMutation.isPending}
            isLoading={verifyOtpMutation.isPending}
          >
            Verify OTP
          </Button>
        </div>
      )}
    </div>
  );
}
