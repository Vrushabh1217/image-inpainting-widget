import { UploadCloud } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
}

export default function ImageUpload({ onImageUpload }: ImageUploadProps) {

    const handleFileValidation = (file: File) => {
    const supportedFormats = ['image/jpeg', 'image/png'];
    if (!supportedFormats.includes(file.type)) {
      alert('Unsupported file format! Please upload a JPEG or PNG image.');
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB. Please upload a smaller image.');
      return false;
    }
    return true;
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      onImageUpload(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      onImageUpload(file);
    }
  };

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <input
        type="file"
        accept="image/jpeg,image/png"
        onChange={handleChange}
        className="hidden"
        id="image-upload"
      />
      <label
        htmlFor="image-upload"
        className="cursor-pointer flex flex-col items-center"
      >
        <UploadCloud className="w-12 h-12 text-gray-400 mb-4" />
        <p className="text-lg mb-2">Drop an image here or click to upload</p>
        <p className="text-sm text-gray-500">Supports JPEG and PNG</p>
      </label>
    </div>
  );
}