"use client";
import { useState } from 'react';

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

function buildCloudinaryUrl(publicId: string): string {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${publicId}`;
}

export default function ProductImage({ src, alt, className }: { src: string, alt: string, className: string }) {
  const [error, setError] = useState(false);
  
  if (error) {
    return <img src="https://via.placeholder.com/400x400/eeeeec/B28612?text=Foto+Pendiente" alt="Placeholder" className={className} />;
  }

  // Si ya es una URL completa (http), usarla directamente
  // Si es un public_id de Cloudinary, construir la URL
  const imgSrc = src.startsWith('http') ? src : buildCloudinaryUrl(src);

  return <img src={imgSrc} alt={alt} className={className} onError={() => setError(true)} />;
}
