import { redirect } from "next/navigation";
import { REGISTRATION_STEPS } from "@/lib/registrationSteps";

export default function RegisterIndexPage() {
  redirect(REGISTRATION_STEPS[0].path);
}
