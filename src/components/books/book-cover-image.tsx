"use client";

import Image, { type ImageProps } from "next/image";
import { useState, type ReactNode } from "react";

type BookCoverImageProps = Pick<
  ImageProps,
  "alt" | "className" | "sizes" | "preload"
> & { src: string; fallback?: ReactNode };

export function BookCoverImage({ alt, fallback, ...imageProps }: BookCoverImageProps) {
  const [failedSource, setFailedSource] = useState<string>();

  if (failedSource === imageProps.src) return fallback ?? null;

  return (
    <Image
      {...imageProps}
      alt={alt}
      fill
      unoptimized={imageProps.src.startsWith("https://covers.openlibrary.org/")}
      onError={() => setFailedSource(imageProps.src)}
    />
  );
}
