import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to your facility dashboard on ReferNet Nigeria.",
};

export default function LoginPage() {
  return <LoginForm />;
}
