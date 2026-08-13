"use client";

import { useState } from "react";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";
import { useAuth } from "@/hooks/useAuth";
import ProfileSectionCard from "./ProfileSectionCard";

export default function ChangePasswordCard() {
  const { user, signIn, updatePassword } = useAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }
    if (!user?.email) {
      setError("Could not verify your account. Try refreshing the page.");
      return;
    }

    setSubmitting(true);

    const verified = await signIn(user.email, currentPassword);
    if (!verified) {
      setSubmitting(false);
      setError("Current password is incorrect.");
      return;
    }

    const updated = await updatePassword(newPassword);
    setSubmitting(false);

    if (!updated) {
      setError("Couldn't update your password. Please try again.");
      return;
    }

    setSuccess(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }

  return (
    <ProfileSectionCard
      title="Change Password"
      subtitle="Use a strong password of at least 8 characters."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-base">
        <Input
          label="Current Password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        <Input
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          autoComplete="new-password"
          required
        />
        <Input
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
          required
        />

        {error && (
          <p role="alert" className="font-body text-body-sm text-emergency">
            {error}
          </p>
        )}
        {success && (
          <p className="font-body text-body-sm font-medium text-green-700">
            Password updated successfully.
          </p>
        )}

        <div>
          <Button variant="primary" type="submit" isLoading={submitting}>
            Update Password
          </Button>
        </div>
      </form>
    </ProfileSectionCard>
  );
}
