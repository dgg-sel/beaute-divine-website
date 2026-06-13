"use client";
import { useState } from 'react';

export default function ProductImage({ src, alt, className }: { src: string, alt: string, className: string }) {
  const [error, setError] = useState(false);
  
  if (error) {
    return <img src="https://via.placeholder.com/400x400/eeeeec/B28612?text=Foto+Pendiente" alt="Placeholder" className={className} />;
  }

  return <img src={src} alt={alt} className={className} onError={() => setError(true)} />;
}
