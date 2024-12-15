import { fabric } from 'fabric';

export const initializeCanvas = (
  canvasElement: HTMLCanvasElement,
  width: number,
  height: number
): fabric.Canvas => {
  return new fabric.Canvas(canvasElement, {
    isDrawingMode: true,
    width,
    height,
  });
};

export const loadImageToCanvas = (
  canvas: fabric.Canvas,
  imageUrl: string,
  callback?: () => void
): void => {
  fabric.Image.fromURL(imageUrl, (img) => {
    canvas.clear();
    canvas.setBackgroundImage(img, () => {
      canvas.renderAll();
      callback?.();
    }, {
      scaleX: canvas.width! / img.width!,
      scaleY: canvas.height! / img.height!,
    });
  });
};

export const createMaskFromCanvas = (
  canvas: fabric.Canvas,
  originalImage: string
): Promise<string> => {
  return new Promise((resolve) => {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width!;
    tempCanvas.height = canvas.height!;
    const ctx = tempCanvas.getContext('2d')!;

    // Load the original image
    const img = new Image();
    img.onload = () => {
      // Draw the original image
      ctx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);

      // Get the original image data
      const originalImageData = ctx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);

      // Get the mask data from the canvas
      const maskCanvas = canvas.toCanvasElement();
      const maskCtx = maskCanvas.getContext('2d')!;
      const maskData = maskCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);

      // Create the final mask data
      const finalImageData = ctx.createImageData(tempCanvas.width, tempCanvas.height);

      for (let i = 0; i < maskData.data.length; i += 4) {
        const isDrawn =
          maskData.data[i] > 200 &&
          maskData.data[i + 1] > 200 &&
          maskData.data[i + 2] > 200;

        if (isDrawn) {
          // Copy the corresponding pixel from the original image
          finalImageData.data[i] = originalImageData.data[i];
          finalImageData.data[i + 1] = originalImageData.data[i + 1];
          finalImageData.data[i + 2] = originalImageData.data[i + 2];
          finalImageData.data[i + 3] = 255; // Fully opaque
        } else {
          // Set pixel to black
          finalImageData.data[i] = 0;
          finalImageData.data[i + 1] = 0;
          finalImageData.data[i + 2] = 0;
          finalImageData.data[i + 3] = 255; // Fully opaque
        }
      }

      ctx.putImageData(finalImageData, 0, 0);
      resolve(tempCanvas.toDataURL('image/png'));
    };
    img.src = originalImage;
  });
};