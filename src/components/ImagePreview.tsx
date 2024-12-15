interface ImagePreviewProps {
  originalImage: string;
  maskImage: string;
}

export default function ImagePreview({ originalImage, maskImage }: ImagePreviewProps) {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-2">
        <h3 className="font-semibold">Original Image</h3>
        <img
          src={originalImage}
          alt="Original"
          className="w-full rounded-lg border border-gray-200"
        />
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold">Generated Mask</h3>
        <div className="w-full rounded-lg border border-gray-200 bg-[repeating-conic-gradient(#808080_0_90deg,#fff_0_180deg)_0_0/20px_20px]">
          <img
            src={maskImage}
            alt="Mask"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}