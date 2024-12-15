import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import BrushControls from './BrushControls';
import { initializeCanvas, loadImageToCanvas, createMaskFromCanvas } from '../utils/canvas';

interface CanvasProps {
  originalImage: string | null;
  onMaskGenerated: (maskDataUrl: string) => void;
}

export default function Canvas({ originalImage, onMaskGenerated }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [brushSize, setBrushSize] = useState(20);

  useEffect(() => {
    if (canvasRef.current && !canvas) {
      const fabricCanvas = initializeCanvas(canvasRef.current, 800, 600);
      fabricCanvas.freeDrawingBrush.color = 'white';
      fabricCanvas.freeDrawingBrush.width = brushSize;
      setCanvas(fabricCanvas);
    }
  }, [canvasRef, canvas]);

  useEffect(() => {
    if (canvas && originalImage) {
      loadImageToCanvas(canvas, originalImage);
    }
  }, [canvas, originalImage]);

  useEffect(() => {
    if (canvas) {
      canvas.freeDrawingBrush.width = brushSize;
    }
  }, [brushSize, canvas]);

  const handleBrushSize = (increment: boolean) => {
    setBrushSize((prev) => Math.max(1, Math.min(100, prev + (increment ? 5 : -5))));
  };

  const handleClear = () => {
    if (canvas && originalImage) {
      loadImageToCanvas(canvas, originalImage);
    }
  };

  const handleSave = async () => {
    if (canvas && originalImage) {
      const maskDataUrl = await createMaskFromCanvas(canvas, originalImage);
      onMaskGenerated(maskDataUrl);
    }
  };

  return (
    <div className="space-y-4">
      <BrushControls
        brushSize={brushSize}
        onBrushSizeChange={handleBrushSize}
        onClear={handleClear}
        onSave={handleSave}
      />
      <canvas ref={canvasRef} className="border border-gray-300 rounded-lg" />
    </div>
  );
}