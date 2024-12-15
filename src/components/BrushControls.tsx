import { Minus, Plus } from 'lucide-react';

interface BrushControlsProps {
  brushSize: number;
  onBrushSizeChange: (increment: boolean) => void;
  onClear: () => void;
  onSave: () => void;
}

export default function BrushControls({
  brushSize,
  onBrushSizeChange,
  onClear,
  onSave,
}: BrushControlsProps) {
  return (
    <div className="flex items-center space-x-4 mb-4">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onBrushSizeChange(false)}
          className="p-2 rounded-full hover:bg-gray-100"
          aria-label="Decrease brush size"
        >
          <Minus className="w-5 h-5" />
        </button>
        <span className="min-w-[3rem] text-center">{brushSize}px</span>
        <button
          onClick={() => onBrushSizeChange(true)}
          className="p-2 rounded-full hover:bg-gray-100"
          aria-label="Increase brush size"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <button
        onClick={onClear}
        className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
      >
        Clear
      </button>
      <button
        onClick={onSave}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Save Mask
      </button>
    </div>
  );
}