"use client";

import {
  Camera,
  Check,
  Image as ImageIcon,
  Trash2,
  Upload,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import UserAvatar from "@/components/profile/user-avatar";
import { PRESET_AVATARS, type PresetAvatar } from "@/data/preset-avatars";

interface ProfileImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentImage?: string;
  fallbackInitials: string;
  onSave: (newImage: string | undefined) => void;
  title?: string;
}

export default function ProfileImageModal({
  isOpen,
  onClose,
  currentImage,
  fallbackInitials,
  onSave,
  title = "Update Profile Photo",
}: ProfileImageModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    currentImage,
  );
  const [activeTab, setActiveTab] = useState<"presets" | "upload">("presets");
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedImage(currentImage);
      setUploadError("");
    }
  }, [isOpen, currentImage]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file (PNG, JPG, WebP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image file size should be less than 5MB.");
      return;
    }

    setUploadError("");

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = document.createElement("img");
      img.onload = () => {
        // Downscale image via canvas to maximum 300x300 for optimal localStorage footprint
        const maxDim = 300;
        let { width, height } = img;
        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.85);
          setSelectedImage(compressedDataUrl);
        } else {
          setSelectedImage(event.target?.result as string);
        }
      };
      img.onerror = () => {
        setUploadError("Failed to process image file.");
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      setUploadError("Failed to read image file.");
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    onSave(selectedImage);
    onClose();
  };

  const handleRemove = () => {
    setSelectedImage(undefined);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-image-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg rounded-2xl border border-border bg-surface shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4 bg-surface-muted/50">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Camera className="h-4 w-4" aria-hidden="true" />
            </div>
            <h2
              id="profile-image-modal-title"
              className="text-base font-bold text-text-primary"
            >
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-text-secondary hover:bg-surface-muted hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Live Preview & Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-xl border border-border/80 bg-surface-muted/30">
            <div className="relative h-24 w-24 shrink-0 rounded-full border-2 border-primary/30 overflow-hidden bg-primary/10 flex items-center justify-center shadow-md">
              <UserAvatar
                src={selectedImage}
                alt="Profile preview"
                fallback={fallbackInitials}
                className="text-2xl font-bold text-primary flex items-center justify-center"
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-sm font-bold text-text-primary">
                Preview Photo
              </h3>
              <p className="mt-0.5 text-xs text-text-secondary">
                This image will represent your account across CampusLoop.
              </p>
              {selectedImage && (
                <button
                  type="button"
                  onClick={handleRemove}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-danger hover:underline focus-visible:outline-none"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Remove Photo</span>
                </button>
              )}
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex rounded-xl bg-surface-muted p-1 border border-border">
            <button
              type="button"
              onClick={() => setActiveTab("presets")}
              className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold transition-all ${
                activeTab === "presets"
                  ? "bg-surface text-primary shadow-xs"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <User className="h-4 w-4" />
              <span>Campus Avatars</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("upload")}
              className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold transition-all ${
                activeTab === "upload"
                  ? "bg-surface text-primary shadow-xs"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <Upload className="h-4 w-4" />
              <span>Upload from Device</span>
            </button>
          </div>

          {/* Tab 1: Preset Campus Avatars */}
          {activeTab === "presets" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-text-secondary">
                <span>Choose a persona avatar</span>
                <span>{PRESET_AVATARS.length} options</span>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {PRESET_AVATARS.map((avatar: PresetAvatar) => {
                  const isSelected = selectedImage === avatar.svgDataUri;
                  return (
                    <button
                      key={avatar.id}
                      type="button"
                      onClick={() => setSelectedImage(avatar.svgDataUri)}
                      className={`group relative flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                        isSelected
                          ? "border-primary bg-primary/10 shadow-xs ring-2 ring-primary/30"
                          : "border-border bg-surface hover:border-primary/50 hover:bg-surface-muted"
                      }`}
                      title={`${avatar.name} (${avatar.category})`}
                    >
                      <div className="relative h-12 w-12 rounded-full overflow-hidden mb-1.5 shadow-2xs">
                        <Image
                          src={avatar.svgDataUri}
                          alt={avatar.name}
                          fill
                          sizes="48px"
                          className="object-cover transition-transform group-hover:scale-105"
                          unoptimized
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-primary/30 flex items-center justify-center">
                            <Check className="h-4 w-4 text-white stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <span className="text-[11px] font-semibold text-text-primary truncate max-w-full">
                        {avatar.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 2: Custom File Upload */}
          {activeTab === "upload" && (
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                onChange={handleFileChange}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex flex-col items-center justify-center gap-2 p-8 border-2 border-dashed border-border hover:border-primary rounded-2xl bg-surface-muted/30 hover:bg-primary/5 transition-all cursor-pointer text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ImageIcon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    Click to browse or drop photo
                  </p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    PNG, JPG, or WebP up to 5MB (auto-optimized)
                  </p>
                </div>
              </button>

              {uploadError && (
                <p className="text-xs font-semibold text-danger">
                  {uploadError}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-4 bg-surface-muted/40">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-border bg-surface px-4 py-2 text-xs font-semibold text-text-secondary hover:bg-surface-muted hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-xl bg-primary px-5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-primary-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            Save Photo
          </button>
        </div>
      </div>
    </div>
  );
}
