import React, { useState } from 'react';
import Canvas from './components/Canvas';
import ImageUpload from './components/ImageUpload';
import ImagePreview from './components/ImagePreview';

function App() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [maskImage, setMaskImage] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string);
      setMaskImage(null);
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    setOriginalImage(null);
    setMaskImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Image Inpainting Widget
        </h1>

        {!originalImage ? (
          <ImageUpload onImageUpload={handleImageUpload} />
        ) : (
          <div className="space-y-8">
            <Canvas
              originalImage={originalImage}
              onMaskGenerated={setMaskImage}
            />

            {maskImage && (
              <ImagePreview
                originalImage={originalImage}
                maskImage={maskImage}
              />
            )}

            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Upload New Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;