import type { Metadata } from "next";
import ForgotPasswordForm from "./ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your ReferNet Nigeria facility account password.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
