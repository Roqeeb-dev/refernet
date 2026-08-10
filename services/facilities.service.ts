import { supabase } from "@/lib/supabaseClient";
import type {
  Facility,
  FacilityStatus,
} from "@/components/emergency/FacilityCard";

interface FacilityRow {
  id: string;
  facility_name: string;
  facility_type: string;
  status: FacilityStatus;
  street_address: string;
  phone_number: string;
  latitude: number;
  longitude: number;
  status_updated_at: string;
}

const SEARCH_RADIUS_KM = 15;

function haversineDistanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export async function getNearbyEmergencyFacilities(
  lat: number,
  lng: number,
): Promise<Facility[]> {
  const latDelta = SEARCH_RADIUS_KM / 111; // ~111km per degree of latitude
  const lngDelta = SEARCH_RADIUS_KM / (111 * Math.cos((lat * Math.PI) / 180));

  const { data, error } = await supabase
    .from("facility_registrations")
    .select(
      "id, facility_name, facility_type, status, street_address, phone_number, latitude, longitude, status_updated_at",
    )
    .eq("verification_status", "approved")
    .gte("latitude", lat - latDelta)
    .lte("latitude", lat + latDelta)
    .gte("longitude", lng - lngDelta)
    .lte("longitude", lng + lngDelta);

  if (error || !data) return [];

  return (data as FacilityRow[])
    .map((row) => ({
      id: row.id,
      name: row.facility_name,
      type: row.facility_type,
      status: row.status,
      address: row.street_address,
      phone: row.phone_number,
      distanceKm:
        Math.round(
          haversineDistanceKm(lat, lng, row.latitude, row.longitude) * 10,
        ) / 10,
      lastUpdated: new Date(row.status_updated_at).toLocaleString("en-NG", {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "2-digit",
      }),
    }))
    .filter((facility) => facility.distanceKm <= SEARCH_RADIUS_KM)
    .sort((a, b) => a.distanceKm - b.distanceKm);
}
