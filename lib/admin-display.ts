export function getInitials(fullName?: string | null): string {
  if (!fullName || !fullName.trim()) return "AD";

  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function formatRole(role?: string | null): string {
  if (!role) return "Admin";

  return role
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
