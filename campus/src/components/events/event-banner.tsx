"use client";

import { Tag } from "lucide-react";
import Image from "next/image";
import { type ReactNode, useEffect, useState } from "react";
import { getFallbackBanner, resolveEventBanner } from "@/data/events";

interface EventBannerProps {
  event?: {
    id?: string;
    title?: string;
    category?: string;
    image?: string;
    bannerUrl?: string;
  };
  src?: string;
  alt?: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  showCategoryBadge?: boolean;
  showGradient?: boolean;
  children?: ReactNode;
}

const CATEGORY_BADGE_STYLES: Record<string, string> = {
  Workshop: "bg-blue-600/90 text-white border-blue-400/40",
  Hackathon: "bg-purple-600/90 text-white border-purple-400/40",
  Competition: "bg-amber-600/90 text-white border-amber-400/40",
  "Cultural Event": "bg-rose-600/90 text-white border-rose-400/40",
  "Technical Event": "bg-cyan-600/90 text-white border-cyan-400/40",
  "Club Activity": "bg-emerald-600/90 text-white border-emerald-400/40",
};

export default function EventBanner({
  event,
  src,
  alt,
  className = "relative h-44 w-full overflow-hidden",
  imageClassName = "object-cover",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false,
  showCategoryBadge = false,
  showGradient = true,
  children,
}: EventBannerProps) {
  const initialUrl =
    src ||
    (event ? resolveEventBanner(event) : getFallbackBanner()) ||
    getFallbackBanner();

  const [currentSrc, setCurrentSrc] = useState<string>(initialUrl);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const nextUrl =
      src ||
      (event ? resolveEventBanner(event) : getFallbackBanner()) ||
      getFallbackBanner();
    setCurrentSrc(nextUrl);
    setHasError(false);
  }, [src, event]);

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      const fallback = getFallbackBanner(event?.id, event?.category);
      if (fallback !== currentSrc) {
        setCurrentSrc(fallback);
      }
    }
  };

  const titleText = alt || event?.title || "Campus Event Banner";
  const categoryText = event?.category || "Event";
  const badgeStyle =
    CATEGORY_BADGE_STYLES[categoryText] ||
    "bg-black/70 text-white border-white/20";

  return (
    <div className={`relative overflow-hidden bg-surface-muted ${className}`}>
      {currentSrc ? (
        <Image
          src={currentSrc}
          alt={titleText}
          fill
          sizes={sizes}
          priority={priority}
          unoptimized
          onError={handleImageError}
          className={`h-full w-full transition-transform duration-500 ease-out ${imageClassName}`}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-tr from-primary/20 via-accent/15 to-primary/10 text-primary">
          <Tag className="h-8 w-8 opacity-60" aria-hidden="true" />
        </div>
      )}

      {/* Subtle overlay gradient for readability */}
      {showGradient && (
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-70"
          aria-hidden="true"
        />
      )}

      {/* Category Badge overlay */}
      {showCategoryBadge && event?.category && (
        <div className="absolute top-3 left-3 z-10">
          <span
            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold shadow-xs backdrop-blur-md ${badgeStyle}`}
          >
            <Tag className="h-3 w-3" />
            {event.category}
          </span>
        </div>
      )}

      {/* Floating Action Slots (e.g. Bookmark, status tag) */}
      {children && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {children}
        </div>
      )}
    </div>
  );
}
