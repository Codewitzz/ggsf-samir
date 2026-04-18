import {
  getAdminImageOverride,
} from "@/lib/adminImages/adminImagesStore";

// Module cache is handled inside `adminImagesStore`.
export function getAdminImageUrl(slotKey: string, fallbackUrl: string = slotKey): string {
  const override = getAdminImageOverride(slotKey);
  return override ?? fallbackUrl;
}

export { getAdminImageOverrides } from "@/lib/adminImages/adminImagesStore";

