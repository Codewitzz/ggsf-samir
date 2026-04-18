import { useEffect, useMemo, useState } from "react";
import {
  getAdminDownloadItems,
  getDefaultDownloadOverrides,
  type AdminDownloadItem,
  type DefaultDownloadOverride,
} from "@/lib/downloads/adminDownloadsStore";

export function useAdminDownloads() {
  const [items, setItems] = useState<AdminDownloadItem[]>(() => getAdminDownloadItems());
  const [defaultOverrides, setDefaultOverrides] = useState<Record<string, DefaultDownloadOverride>>(
    () => getDefaultDownloadOverrides()
  );

  useEffect(() => {
    const sync = () => {
      setItems(getAdminDownloadItems());
      setDefaultOverrides(getDefaultDownloadOverrides());
    };
    window.addEventListener("ggsf_admin_downloads_changed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("ggsf_admin_downloads_changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return useMemo(() => ({ items, defaultOverrides }), [items, defaultOverrides]);
}
