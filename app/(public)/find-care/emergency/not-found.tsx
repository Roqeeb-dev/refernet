import Link from "next/link";
import { SearchX } from "lucide-react";
import Button from "@/components/shared/Button";

export default function EmergencyResultsNotFound() {
  return (
    <div className="mx-auto flex w-full max-w-[400px] flex-1 items-center justify-center px-xl py-xl">
      <div className="w-full rounded-lg border border-gray-100 bg-white p-xl text-center">
        <div className="mx-auto mb-lg flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
          <SearchX size={24} className="text-text-secondary" />
        </div>

        <h2 className="mb-sm font-display text-heading-md font-bold text-text-primary">
          No facilities found nearby
        </h2>
        <p className="mb-xl font-body text-body-sm text-text-secondary">
          Try expanding your search area or check back later.
        </p>

        <div className="flex flex-col gap-sm">
          <Link href="/find-care/emergency">
            <Button variant="outline" fullWidth>
              Change Location
            </Button>
          </Link>
          <a href="tel:112">
            <Button variant="danger" fullWidth>
              Emergency Helpline: 112
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
