import Image from "next/image";

interface UserAvatarProps {
  src?: string;
  alt: string;
  fallback: string;
  className?: string;
}

export default function UserAvatar({
  src,
  alt,
  fallback,
  className = "",
}: UserAvatarProps) {
  if (src) {
    return (
      <div className={`relative h-full w-full overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="96px"
          className="object-cover"
          unoptimized
        />
      </div>
    );
  }

  return <span className={className}>{fallback}</span>;
}
