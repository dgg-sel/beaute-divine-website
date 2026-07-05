"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";

export function ReviewImageUpload({ defaultImage }: { defaultImage?: string }) {
  const [uploadedUrl, setUploadedUrl] = useState<string>(defaultImage || "");

  return (
    <div>
      <div className="flex items-center gap-4">
        {uploadedUrl && (
          <img src={uploadedUrl} alt="Preview" className="w-16 h-16 rounded-full object-cover bg-zinc-100 border border-zinc-200" />
        )}
        
        <CldUploadWidget
          signatureEndpoint="/api/cloudinary/sign"
          options={{
            folder: "beaute-divine-reviews",
            multiple: false,
            maxFiles: 1,
          }}
          onSuccess={(result: any) => {
            if (result?.info?.secure_url) {
              setUploadedUrl(result.info.secure_url);
            }
          }}
        >
          {({ open }) => (
            <button 
              type="button" 
              onClick={() => open()} 
              className="flex items-center gap-2 border border-zinc-300 hover:bg-zinc-50 px-4 py-2 rounded-lg text-sm font-medium text-zinc-700 transition-colors"
            >
              <ImageIcon className="w-4 h-4" />
              {uploadedUrl ? "Cambiar Foto" : "Subir Foto"}
            </button>
          )}
        </CldUploadWidget>
      </div>

      {/* Hidden input to submit the URL in the server action form */}
      <input type="hidden" name="authorImage" value={uploadedUrl} />
    </div>
  );
}
