/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

import { Skeleton } from "./ui/skeleton";

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
  className = "",
}: GameImageProps) {
  if (useOptimization) {
    return (
      <>
        <Skeleton className="absolute inset-0 h-full w-full" />
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: "contain" }}
          draggable={false}
          priority
        />
      </>
    );
  }

  return (
    <>
      <Skeleton className="absolute inset-0 -z-[1] h-full w-full" />
      <img
        src={src}
        alt={alt}
        draggable={false}
        className={`h-full w-full object-contain ${className}`}
      />
    </>
  );
}
