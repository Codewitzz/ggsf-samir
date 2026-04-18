export type OptimizeImageOptions = {
  /** Max width/height (preserve aspect). */
  maxDimension?: number;
  /** 0..1 for JPEG/WebP. */
  quality?: number;
  /** Prefer webp, fallback to jpeg. */
  preferWebp?: boolean;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

async function decodeImage(file: File): Promise<HTMLImageElement> {
  // Use object URL + <img> for broad browser support (Vite/React target).
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.decoding = "async";
    img.loading = "eager";
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Failed to decode image."));
      img.src = url;
    });
    return img;
  } finally {
    URL.revokeObjectURL(url);
  }
}

function canvasToDataUrl(canvas: HTMLCanvasElement, mime: string, quality: number): string {
  try {
    return canvas.toDataURL(mime, quality);
  } catch {
    // Some browsers throw on unsupported mime; fallback.
    return canvas.toDataURL("image/jpeg", quality);
  }
}

/**
 * Convert an image file to a compressed data URL (WebP/JPEG) to reduce localStorage usage.
 * This is NOT as good as real object storage, but improves current browser-only storage.
 */
export async function fileToOptimizedImageDataUrl(file: File, opts: OptimizeImageOptions = {}): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("Only image files are supported.");

  const maxDimension = opts.maxDimension ?? 1600;
  const quality = clamp(opts.quality ?? 0.82, 0.4, 0.95);
  const preferWebp = opts.preferWebp ?? true;

  const img = await decodeImage(file);
  const w = img.naturalWidth || img.width;
  const h = img.naturalHeight || img.height;
  if (!w || !h) throw new Error("Invalid image dimensions.");

  const scale = Math.min(1, maxDimension / Math.max(w, h));
  const outW = Math.max(1, Math.round(w * scale));
  const outH = Math.max(1, Math.round(h * scale));

  const canvas = document.createElement("canvas");
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported.");

  // Slight sharpening by drawing once at target resolution (simple + fast).
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, outW, outH);

  const mime = preferWebp ? "image/webp" : "image/jpeg";
  const dataUrl = canvasToDataUrl(canvas, mime, quality);
  if (!dataUrl.startsWith("data:image/")) throw new Error("Failed to encode image.");
  return dataUrl;
}

