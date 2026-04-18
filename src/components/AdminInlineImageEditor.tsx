import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Image as ImageIcon, Upload } from "lucide-react";
import { isAdminSessionActive, validateAndNormalizeImageDataUrl } from "@/lib/notices/adminNoticesStore";
import { getAdminImageOverrides, setAdminImageOverride } from "@/lib/adminImages/adminImagesStore";
import { fileToOptimizedImageDataUrl } from "@/lib/images/optimizeImage";

function deriveSlotFromImageSrc(rawSrc: string): string | null {
  if (!rawSrc) return null;

  // Data URLs need explicit slot mapping from data-admin-slot.
  if (rawSrc.startsWith("data:image/")) return null;

  try {
    const url = new URL(rawSrc, window.location.origin);
    // Keep only the path as slot key (same pattern used by many images in this project).
    if (!url.pathname || url.pathname === "/") return null;
    return decodeURIComponent(url.pathname);
  } catch {
    return null;
  }
}

function getSlotFromImageElement(img: HTMLImageElement): string | null {
  if (img.dataset.adminSlot) return img.dataset.adminSlot;
  const original = img.dataset.adminOriginalSrc;
  if (original) return deriveSlotFromImageSrc(original);
  return deriveSlotFromImageSrc(img.currentSrc || img.src);
}

function getImageFromClickTarget(target: HTMLElement, event: MouseEvent): HTMLImageElement | null {
  const direct = target.closest("img");
  if (direct instanceof HTMLImageElement) return direct;

  // Some sections (e.g. hero slider overlays) sit above the <img>.
  // Use pointer coordinates to locate the underlying image element.
  const stack = document.elementsFromPoint(event.clientX, event.clientY);
  for (const el of stack) {
    if (el instanceof HTMLImageElement) return el;
  }
  return null;
}

const AdminInlineImageEditor = () => {
  const location = useLocation();
  const [enabled, setEnabled] = useState(false);
  const [activeSession, setActiveSession] = useState(isAdminSessionActive());

  const isAdminPage = useMemo(() => location.pathname.startsWith("/admin"), [location.pathname]);

  useEffect(() => {
    const onStorage = () => setActiveSession(isAdminSessionActive());
    window.addEventListener("storage", onStorage);
    window.addEventListener("ggsf_admin_notices_changed", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("ggsf_admin_notices_changed", onStorage);
    };
  }, []);

  useEffect(() => {
    // Session may change after login without navigation.
    setActiveSession(isAdminSessionActive());
  }, [location.pathname]);

  useEffect(() => {
    if (enabled) {
      document.body.classList.add("admin-image-edit-mode");
    } else {
      document.body.classList.remove("admin-image-edit-mode");
    }
    return () => document.body.classList.remove("admin-image-edit-mode");
  }, [enabled]);

  useEffect(() => {
    const applyOverridesToImages = () => {
      const overrides = getAdminImageOverrides();
      const images = Array.from(document.querySelectorAll("img"));
      images.forEach((img) => {
        if (!(img instanceof HTMLImageElement)) return;

        if (!img.dataset.adminOriginalSrc) {
          const attrSrc = img.getAttribute("src");
          if (attrSrc) img.dataset.adminOriginalSrc = attrSrc;
        }

        const slotKey = getSlotFromImageElement(img);
        if (!slotKey) return;

        const override = overrides[slotKey];
        if (override) {
          if (img.src !== override) img.src = override;
          return;
        }

        // If override was removed, restore original static source.
        if (img.dataset.adminOriginalSrc && img.src.startsWith("data:image/")) {
          img.src = img.dataset.adminOriginalSrc;
        }
      });
    };

    applyOverridesToImages();
    const observer = new MutationObserver(() => applyOverridesToImages());
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("ggsf_admin_images_changed", applyOverridesToImages);

    return () => {
      observer.disconnect();
      window.removeEventListener("ggsf_admin_images_changed", applyOverridesToImages);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (!enabled || !activeSession || isAdminPage) return;

    const onClick = async (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const img = getImageFromClickTarget(target, event);
      if (!img) return;

      event.preventDefault();
      event.stopPropagation();

      if (!isAdminSessionActive()) return;

      const slotKey = getSlotFromImageElement(img);
      if (!slotKey) {
        toast({
          title: "Cannot edit this image",
          description: "This image has no editable slot. Only images marked for inline editing can be replaced.",
          variant: "destructive",
        });
        return;
      }

      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.style.display = "none";
      document.body.appendChild(input);

      input.onchange = async () => {
        try {
          const file = input.files?.[0] ?? null;
          if (!file) return;
          const dataUrl = await fileToOptimizedImageDataUrl(file, { maxDimension: 1600, quality: 0.82, preferWebp: true });
          const normalized = validateAndNormalizeImageDataUrl(dataUrl);
          setAdminImageOverride(slotKey, normalized);
          img.src = normalized ?? img.src;
          toast({
            title: "Image updated",
            description: `Saved for slot: ${slotKey}`,
          });
        } catch (err) {
          const message = err instanceof Error ? err.message : "Could not update image.";
          toast({
            title: "Update failed",
            description: message,
            variant: "destructive",
          });
        } finally {
          input.remove();
        }
      };

      input.click();
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [enabled, activeSession, isAdminPage]);

  if (!activeSession || isAdminPage) return null;

  return (
    <>
      <div className="fixed bottom-5 left-5 z-[90] flex flex-col gap-2">
        <Button
          variant={enabled ? "default" : "outline"}
          className="gap-2 shadow-lg"
          onClick={() => {
            setEnabled((v) => !v);
            toast({
              title: !enabled ? "Inline image edit enabled" : "Inline image edit disabled",
              description: !enabled ? "Click any image to upload replacement." : "Normal browsing mode restored.",
            });
          }}
        >
          {enabled ? <Upload className="h-4 w-4" /> : <ImageIcon className="h-4 w-4" />}
          {enabled ? "Editing Images" : "Edit Images"}
        </Button>
      </div>

      <style>
        {`
          .admin-image-edit-mode img {
            cursor: pointer !important;
            outline: 2px dashed hsl(var(--primary));
            outline-offset: 2px;
            transition: outline-color 0.2s ease, transform 0.2s ease;
          }
          .admin-image-edit-mode img:hover {
            outline-color: hsl(var(--secondary));
            transform: scale(1.01);
          }
        `}
      </style>
    </>
  );
};

export default AdminInlineImageEditor;

