import { useEffect, useMemo, useState } from "react";
import type { AdminNoticesSettings, AdminNoticeItem } from "@/lib/notices/adminNoticesStore";
import { getAdminNoticesSettings, getDefaultNoticesAndAnnouncements, getEffectiveNoticesItems } from "@/lib/notices/adminNoticesStore";

export function useAdminNotices() {
  const [settings, setSettingsState] = useState<AdminNoticesSettings>(() => getAdminNoticesSettings());
  const [items, setItemsState] = useState<AdminNoticeItem[]>(() => getEffectiveNoticesItems());

  useEffect(() => {
    const onChanged = () => {
      setSettingsState(getAdminNoticesSettings());
      setItemsState(getEffectiveNoticesItems());
    };

    window.addEventListener("ggsf_admin_notices_changed", onChanged);
    window.addEventListener("storage", onChanged);

    return () => {
      window.removeEventListener("ggsf_admin_notices_changed", onChanged);
      window.removeEventListener("storage", onChanged);
    };
  }, []);

  const defaults = useMemo(() => getDefaultNoticesAndAnnouncements(), []);

  return { settings, items, defaults };
}

