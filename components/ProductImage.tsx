"use client";
import { useState } from 'react';
import { CldImage } from 'next-cloudinary';

export default function ProductImage({ src, alt, className }: { src: string, alt: string, className: string }) {
  const [error, setError] = useState(false);
  
  if (error) {
    return <img src="https://via.placeholder.com/400x400/eeeeec/B28612?text=Foto+Pendiente" alt="Placeholder" className={className} />;
  }

  if (src.startsWith('http')) {
    return <img src={src} alt={alt} className={className} onError={() => setError(true)} />;
  }

  return (
    <CldImage 
      src={src} 
      alt={alt} 
      width={800}
      height={800}
      className={className} 
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      onError={() => setError(true)} 
    />
  );
}
