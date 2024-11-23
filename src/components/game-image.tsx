/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { Skeleton } from './ui/skeleton';

interface GameImageProps {
  src: string;
  alt: string;
  useOptimization?: boolean;
  className?: string;
}

export function GameImage({ 
  src, 
  alt, 
  useOptimization = true,
  className = "" 
}: GameImageProps) {
  if (useOptimization) {
    return (
      <>
        <Skeleton className="w-full h-full absolute inset-0" />
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </>
    );
  }

  return (
    <>
      <Skeleton className="w-full h-full absolute inset-0 -z-[1]" />
      <img 
        src={src} 
        alt={alt} 
        className={`w-full h-full object-contain ${className}`}
      />
    </>
  );
} 