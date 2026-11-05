/**
 * Utility to process uploaded banner images into compressed Data URLs
 * suitable for persistent storage in browser localStorage.
 */
export async function fileToOptimizedDataUrl(
  file: File,
  maxWidth = 1200,
  maxHeight = 675,
  quality = 0.82,
): Promise<string> {
  return new Promise((resolve, reject) => {
    // If not an image, reject
    if (!file.type.startsWith("image/")) {
      reject(new Error("File is not an image"));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result !== "string") {
        reject(new Error("FileReader result is not a string"));
        return;
      }

      // If it's an SVG, return data URL directly
      if (file.type === "image/svg+xml") {
        resolve(result);
        return;
      }

      const img = new Image();
      img.onerror = () =>
        reject(new Error("Failed to load image for resizing"));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect-preserving dimensions
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          // Fallback to original data URL if canvas context fails
          resolve(result);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(compressedDataUrl);
      };

      img.src = result;
    };

    reader.readAsDataURL(file);
  });
}
