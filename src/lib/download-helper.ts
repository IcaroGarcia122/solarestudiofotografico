/**
 * Helper to download images reliably in the browser.
 * Supports cross-origin fallback via canvas/blob, or direct synthetic link.
 */
export async function downloadImage(url: string, filename: string): Promise<boolean> {
  try {
    // If it's a data URL or blob URL, download directly
    if (url.startsWith("data:") || url.startsWith("blob:")) {
      const link = document.createElement("a");
      link.href = url;
      link.download = filename.endsWith(".jpg") || filename.endsWith(".png") ? filename : `${filename}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    }

    // Try fetching as blob
    const response = await fetch(url);
    if (response.ok) {
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename.endsWith(".jpg") || filename.endsWith(".png") ? filename : `${filename}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 2000);
      return true;
    }
  } catch (error) {
    console.warn("Direct blob download failed, attempting canvas capture fallback:", error);
  }

  // Fallback using Image + Canvas
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth || img.width || 1200;
        canvas.height = img.naturalHeight || img.height || 800;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            if (blob) {
              const blobUrl = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = blobUrl;
              link.download = filename.endsWith(".jpg") || filename.endsWith(".png") ? filename : `${filename}.jpg`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
              resolve(true);
              return;
            }
            resolve(false);
          }, "image/jpeg", 0.95);
        } else {
          resolve(false);
        }
      } catch (err) {
        console.error("Canvas export failed:", err);
        // Final fallback: open image in new tab or direct click
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.download = filename;
        link.click();
        resolve(true);
      }
    };
    img.onerror = () => {
      // Direct click fallback
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.target = "_blank";
      link.click();
      resolve(true);
    };
    img.src = url;
  });
}
