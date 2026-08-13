import ServicesSpecialtiesCard from "@/components/profile/ServicesSpecialtiesCard";
import StaffManagementCard from "@/components/profile/StaffManagementCard";
import ChangePasswordCard from "@/components/profile/ChangePasswordCard";
import AccountStatusCard from "@/components/profile/AccountStatusCard";

export default function FacilityProfilePage() {
  return (
    <div className="flex flex-col gap-lg">
      <div>
        <h1 className="font-display text-heading-xl font-bold text-text-primary">
          Facility Profile
        </h1>
        <p className="font-body text-body-sm text-text-secondary">
          Manage your facility&apos;s services, staff, and account settings.
        </p>
      </div>

      <ServicesSpecialtiesCard />
      <StaffManagementCard />
      <ChangePasswordCard />
      <AccountStatusCard />
    </div>
  );
}
