import React, { useState } from 'react';
import { Truck } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  loading?: 'eager' | 'lazy';
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackTitle,
  loading = 'eager',
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-navy-900 via-navy-800 to-slate-800 text-white p-6 ${className}`}
      >
        <Truck className="w-10 h-10 text-slate-300 mb-3" aria-hidden="true" />
        <span className="text-sm font-medium text-slate-200 text-center max-w-xs">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={loading}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
