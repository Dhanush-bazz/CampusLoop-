"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

/* =========================================================================
   3D CLAY OBJECT 1: Stack of Books
   ========================================================================= */
function ClayBooks() {
  return (
    <svg
      viewBox="0 0 160 140"
      className="w-full h-full drop-shadow-lg"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="3D Stack of books"
      role="img"
    >
      <defs>
        <radialGradient id="bookShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0f172a" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bookBottom" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="bookMid" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>
        <linearGradient id="bookTop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="pageGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
      </defs>

      {/* Ambient Ground Shadow */}
      <ellipse cx="80" cy="125" rx="60" ry="12" fill="url(#bookShadow)" />

      {/* Book 1 (Bottom - Blue) */}
      <g transform="translate(18, 75)">
        <rect x="0" y="8" width="124" height="22" rx="6" fill="#1e40af" />
        <rect
          x="0"
          y="4"
          width="124"
          height="20"
          rx="6"
          fill="url(#bookBottom)"
        />
        <rect
          x="18"
          y="7"
          width="102"
          height="13"
          rx="2"
          fill="url(#pageGrad)"
        />
        <line
          x1="22"
          y1="10"
          x2="116"
          y2="10"
          stroke="#cbd5e1"
          strokeWidth="1"
        />
        <line
          x1="22"
          y1="14"
          x2="116"
          y2="14"
          stroke="#cbd5e1"
          strokeWidth="1"
        />
        <rect x="2" y="4" width="16" height="20" rx="3" fill="#2563eb" />
      </g>

      {/* Book 2 (Middle - Coral Pink) */}
      <g transform="translate(24, 52) rotate(-4 60 12)">
        <rect x="0" y="6" width="112" height="20" rx="6" fill="#be123c" />
        <rect x="0" y="2" width="112" height="18" rx="6" fill="url(#bookMid)" />
        <rect
          x="16"
          y="5"
          width="92"
          height="11"
          rx="2"
          fill="url(#pageGrad)"
        />
        <line x1="20" y1="8" x2="104" y2="8" stroke="#cbd5e1" strokeWidth="1" />
        <line
          x1="20"
          y1="11"
          x2="104"
          y2="11"
          stroke="#cbd5e1"
          strokeWidth="1"
        />
        <rect x="2" y="2" width="14" height="18" rx="3" fill="#f43f5e" />
      </g>

      {/* Book 3 (Top - Emerald Green) */}
      <g transform="translate(32, 28) rotate(3 50 10)">
        <rect x="0" y="6" width="98" height="19" rx="6" fill="#047857" />
        <rect x="0" y="2" width="98" height="18" rx="6" fill="url(#bookTop)" />
        <rect
          x="14"
          y="5"
          width="80"
          height="11"
          rx="2"
          fill="url(#pageGrad)"
        />
        <line x1="18" y1="8" x2="90" y2="8" stroke="#cbd5e1" strokeWidth="1" />
        <rect x="2" y="2" width="12" height="18" rx="3" fill="#10b981" />
        {/* Ribbon Bookmark */}
        <path d="M 68 8 L 74 24 L 68 22 L 62 24 Z" fill="#fbbf24" />
      </g>
    </svg>
  );
}

/* =========================================================================
   3D CLAY OBJECT 2: Graduation Cap (Mortarboard)
   ========================================================================= */
function ClayGraduationCap() {
  return (
    <svg
      viewBox="0 0 140 120"
      className="w-full h-full drop-shadow-md"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="3D Graduation Cap"
      role="img"
    >
      <defs>
        <linearGradient id="capTop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="capUnder" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#090d16" />
        </linearGradient>
        <linearGradient id="goldTassel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>

      {/* Skull Cap Base */}
      <path
        d="M 45 55 Q 70 82 95 55 L 95 72 Q 70 94 45 72 Z"
        fill="url(#capUnder)"
      />

      {/* Diamond Top (Beveled 3D Clay Rhombus) */}
      <path d="M 70 18 L 126 42 L 70 66 L 14 42 Z" fill="#1e293b" />
      <path d="M 70 14 L 124 38 L 70 62 L 16 38 Z" fill="url(#capTop)" />

      {/* Bevel Highlight */}
      <path
        d="M 70 14 L 124 38 L 70 41 L 16 38 Z"
        fill="#475569"
        fillOpacity="0.35"
      />

      {/* Button on top */}
      <ellipse cx="70" cy="38" rx="5" ry="3" fill="#f59e0b" />

      {/* Tassel cord & brush */}
      <path
        d="M 70 38 Q 88 40 102 54 Q 106 66 104 82"
        stroke="url(#goldTassel)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <rect
        x="100"
        y="78"
        width="7"
        height="15"
        rx="3"
        fill="url(#goldTassel)"
      />
      <circle cx="103.5" cy="78" r="3.5" fill="#fef08a" />
    </svg>
  );
}

/* =========================================================================
   3D CLAY OBJECT 3: Open Laptop
   ========================================================================= */
function ClayLaptop() {
  return (
    <svg
      viewBox="0 0 150 120"
      className="w-full h-full drop-shadow-md"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="3D Laptop"
      role="img"
    >
      <defs>
        <linearGradient id="laptopLid" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id="laptopScreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="laptopBase" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
      </defs>

      {/* Screen Frame (Angled 3D) */}
      <path
        d="M 28 20 L 122 20 L 118 72 L 32 72 Z"
        fill="url(#laptopLid)"
        rx="4"
      />
      {/* Screen Glass */}
      <rect
        x="34"
        y="24"
        width="82"
        height="44"
        rx="2"
        fill="url(#laptopScreen)"
      />
      {/* Code / Visual lines on screen */}
      <rect x="40" y="30" width="30" height="3" rx="1.5" fill="#38bdf8" />
      <rect x="40" y="36" width="48" height="3" rx="1.5" fill="#818cf8" />
      <rect x="40" y="42" width="22" height="3" rx="1.5" fill="#34d399" />
      <rect x="40" y="48" width="56" height="3" rx="1.5" fill="#fb7185" />
      {/* Mini logo badge */}
      <circle cx="98" cy="46" r="6" fill="#2563eb" fillOpacity="0.8" />
      <circle cx="98" cy="46" r="3" fill="#60a5fa" />

      {/* Laptop Keyboard Base (Isometric slant) */}
      <path d="M 32 72 L 118 72 L 134 98 L 16 98 Z" fill="url(#laptopBase)" />
      {/* Base thickness edge */}
      <path d="M 16 98 L 134 98 L 130 103 L 20 103 Z" fill="#64748b" />
      {/* Keyboard Area */}
      <path
        d="M 36 75 L 114 75 L 124 90 L 26 90 Z"
        fill="#cbd5e1"
        fillOpacity="0.9"
      />
      {/* Trackpad */}
      <rect x="62" y="92" width="26" height="5" rx="1" fill="#94a3b8" />
    </svg>
  );
}

/* =========================================================================
   3D CLAY OBJECT 4: College Backpack
   ========================================================================= */
function ClayBackpack() {
  return (
    <svg
      viewBox="0 0 130 140"
      className="w-full h-full drop-shadow-md"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="3D College Backpack"
      role="img"
    >
      <defs>
        <linearGradient id="backpackMain" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="pocketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
      </defs>

      {/* Top Handle */}
      <path
        d="M 50 25 C 50 14, 80 14, 80 25"
        stroke="#0369a1"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />

      {/* Main Bag Body */}
      <rect
        x="25"
        y="22"
        width="80"
        height="96"
        rx="28"
        fill="url(#backpackMain)"
      />

      {/* Padded Shoulder Straps peek */}
      <path
        d="M 28 40 Q 14 65 24 95"
        stroke="#075985"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 102 40 Q 116 65 106 95"
        stroke="#075985"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />

      {/* Front Pouch Pocket */}
      <rect
        x="35"
        y="62"
        width="60"
        height="48"
        rx="16"
        fill="url(#pocketGrad)"
      />
      {/* Zipper details */}
      <path
        d="M 42 70 Q 65 67 88 70"
        stroke="#f8fafc"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="65" cy="69" r="3" fill="#f8fafc" />

      {/* Campus Loop Pin / Badge on backpack */}
      <circle cx="50" cy="42" r="7" fill="#fbbf24" />
      <path
        d="M 48 40 L 52 44 M 52 40 L 48 44"
        stroke="#78350f"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/* =========================================================================
   3D CLAY OBJECT 5: Open Notebook
   ========================================================================= */
function ClayNotebook() {
  return (
    <svg
      viewBox="0 0 130 110"
      className="w-full h-full drop-shadow-md"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="3D Open Notebook"
      role="img"
    >
      <defs>
        <linearGradient id="coverL" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="coverR" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#9333ea" />
        </linearGradient>
      </defs>

      {/* Left Page & Cover */}
      <path
        d="M 10 20 Q 38 16 65 24 L 65 92 Q 38 84 10 90 Z"
        fill="url(#coverL)"
      />
      <path d="M 14 23 Q 40 20 63 26 L 63 88 Q 40 82 14 86 Z" fill="#f8fafc" />
      {/* Ruled lines on Left */}
      <line
        x1="22"
        y1="36"
        x2="56"
        y2="38"
        stroke="#cbd5e1"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="22"
        y1="46"
        x2="56"
        y2="48"
        stroke="#cbd5e1"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="22"
        y1="56"
        x2="56"
        y2="58"
        stroke="#cbd5e1"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="22"
        y1="66"
        x2="48"
        y2="68"
        stroke="#cbd5e1"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Right Page & Cover */}
      <path
        d="M 65 24 Q 92 16 120 20 L 120 90 Q 92 84 65 92 Z"
        fill="url(#coverR)"
      />
      <path
        d="M 67 26 Q 90 20 116 23 L 116 86 Q 90 82 67 88 Z"
        fill="#ffffff"
      />
      {/* Ruled lines on Right with Checkbox tasks */}
      <rect x="74" y="34" width="5" height="5" rx="1" fill="#3b82f6" />
      <line
        x1="83"
        y1="37"
        x2="108"
        y2="35"
        stroke="#94a3b8"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect x="74" y="44" width="5" height="5" rx="1" fill="#10b981" />
      <line
        x1="83"
        y1="47"
        x2="108"
        y2="45"
        stroke="#94a3b8"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect x="74" y="54" width="5" height="5" rx="1" fill="#f59e0b" />
      <line
        x1="83"
        y1="57"
        x2="102"
        y2="55"
        stroke="#94a3b8"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Center Binding Ridge */}
      <path
        d="M 65 24 L 65 92"
        stroke="#6b21a8"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Bookmark Ribbon */}
      <path
        d="M 65 24 Q 68 45 72 80 L 76 75 L 80 80 Q 74 45 65 24"
        fill="#fbbf24"
      />
    </svg>
  );
}

/* =========================================================================
   3D CLAY OBJECT 6: Headphones
   ========================================================================= */
function ClayHeadphones() {
  return (
    <svg
      viewBox="0 0 130 130"
      className="w-full h-full drop-shadow-md"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="3D Headphones"
      role="img"
    >
      <defs>
        <linearGradient id="headband" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="50%" stopColor="#fda4af" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>
        <linearGradient id="earcupL" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e11d48" />
          <stop offset="100%" stopColor="#9f1239" />
        </linearGradient>
        <linearGradient id="earcupR" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="100%" stopColor="#be123c" />
        </linearGradient>
      </defs>

      {/* Headband arch */}
      <path
        d="M 28 72 C 20 20, 110 20, 102 72"
        stroke="url(#headband)"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 36 60 C 32 30, 98 30, 94 60"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeOpacity="0.6"
        strokeLinecap="round"
        fill="none"
      />

      {/* Left Ear Cup */}
      <g transform="translate(14, 62)">
        <ellipse cx="14" cy="22" rx="12" ry="20" fill="#475569" />
        <ellipse cx="10" cy="22" rx="9" ry="17" fill="url(#earcupL)" />
        <ellipse
          cx="8"
          cy="22"
          rx="4"
          ry="9"
          fill="#fda4af"
          fillOpacity="0.6"
        />
      </g>

      {/* Right Ear Cup */}
      <g transform="translate(90, 62)">
        <ellipse cx="14" cy="22" rx="12" ry="20" fill="#475569" />
        <ellipse cx="18" cy="22" rx="9" ry="17" fill="url(#earcupR)" />
        <ellipse
          cx="20"
          cy="22"
          rx="4"
          ry="9"
          fill="#fda4af"
          fillOpacity="0.6"
        />
      </g>
    </svg>
  );
}

/* =========================================================================
   3D CLAY OBJECT 7: Pencil and Pen
   ========================================================================= */
function ClayPencilPen() {
  return (
    <svg
      viewBox="0 0 110 110"
      className="w-full h-full drop-shadow-md"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="3D Pencil and Pen"
      role="img"
    >
      <defs>
        <linearGradient id="pencilBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
        <linearGradient id="penBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#0f766e" />
        </linearGradient>
      </defs>

      {/* Pencil (Angled) */}
      <g transform="translate(20, 20) rotate(42)">
        {/* Pink Eraser */}
        <rect x="0" y="0" width="12" height="14" rx="4" fill="#f472b6" />
        {/* Metal Ferrule */}
        <rect x="0" y="14" width="12" height="6" fill="#cbd5e1" />
        {/* Yellow Body */}
        <rect x="0" y="20" width="12" height="52" fill="url(#pencilBody)" />
        <line x1="4" y1="20" x2="4" y2="72" stroke="#ca8a04" strokeWidth="1" />
        <line x1="8" y1="20" x2="8" y2="72" stroke="#fef08a" strokeWidth="1" />
        {/* Wood cone */}
        <polygon points="0,72 12,72 6,86" fill="#fed7aa" />
        {/* Graphite tip */}
        <polygon points="4,82 8,82 6,86" fill="#1e293b" />
      </g>

      {/* Gel Pen (Opposite slant) */}
      <g transform="translate(68, 12) rotate(24)">
        {/* Cap Clip */}
        <rect x="1" y="2" width="2" height="22" rx="1" fill="#e2e8f0" />
        {/* Pen Body */}
        <rect x="0" y="0" width="8" height="76" rx="4" fill="url(#penBody)" />
        {/* Grip section */}
        <rect x="0" y="54" width="8" height="12" fill="#115e59" />
        {/* Nib */}
        <polygon points="1,76 7,76 4,84" fill="#cbd5e1" />
      </g>
    </svg>
  );
}

/* =========================================================================
   3D CLAY OBJECT 8: Paper Plane
   ========================================================================= */
function ClayPaperPlane() {
  return (
    <svg
      viewBox="0 0 110 90"
      className="w-full h-full drop-shadow-md"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="3D Paper Plane"
      role="img"
    >
      <defs>
        <linearGradient id="planeTop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
        <linearGradient id="planeUnderside" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
      </defs>

      {/* Flight motion dots */}
      <circle cx="8" cy="72" r="2" fill="#94a3b8" opacity="0.4" />
      <circle cx="20" cy="62" r="2.5" fill="#94a3b8" opacity="0.6" />
      <circle cx="34" cy="50" r="3" fill="#94a3b8" opacity="0.8" />

      {/* Left Main Wing */}
      <polygon points="40,44 100,12 48,72" fill="url(#planeTop)" />
      {/* Keel / Center fold */}
      <polygon points="48,72 100,12 62,56" fill="url(#planeUnderside)" />
      {/* Right Wing */}
      <polygon points="62,56 100,12 88,48" fill="#f1f5f9" />
    </svg>
  );
}

/* =========================================================================
   3D CLAY OBJECT 9: Coffee Cup
   ========================================================================= */
function ClayCoffeeCup() {
  return (
    <svg
      viewBox="0 0 90 120"
      className="w-full h-full drop-shadow-md"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="3D Coffee Cup"
      role="img"
    >
      <defs>
        <linearGradient id="cupBody" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
        <linearGradient id="cupSleeve" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#c2410c" />
        </linearGradient>
      </defs>

      {/* Swirling Steam */}
      <path
        d="M 38 22 C 34 14, 44 8, 40 2"
        stroke="#cbd5e1"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M 48 24 C 44 16, 54 10, 50 4"
        stroke="#cbd5e1"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />

      {/* Lid */}
      <ellipse cx="45" cy="28" rx="26" ry="6" fill="#0f172a" />
      <rect x="22" y="24" width="46" height="6" rx="2" fill="#334155" />
      <rect x="42" y="20" width="6" height="4" rx="1" fill="#1e293b" />

      {/* Cup Cone */}
      <polygon points="22,30 68,30 60,105 30,105" fill="url(#cupBody)" />

      {/* Terracotta Sleeve */}
      <polygon points="25,52 65,52 61,82 29,82" fill="url(#cupSleeve)" />
      {/* Heart or coffee bean emblem */}
      <circle cx="45" cy="67" r="7" fill="#fed7aa" />
      <path d="M 42 66 Q 45 63 48 66 Q 45 71 42 66" fill="#9a3412" />
    </svg>
  );
}

/* =========================================================================
   3D CLAY OBJECT 10: Chemistry Flask
   ========================================================================= */
function ClayFlask() {
  return (
    <svg
      viewBox="0 0 100 120"
      className="w-full h-full drop-shadow-md"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="3D Chemistry Flask"
      role="img"
    >
      <defs>
        <linearGradient id="flaskGlass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="flaskLiquid" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
      </defs>

      {/* Flask Glass Body */}
      <path
        d="M 42 15 L 58 15 L 58 40 L 88 95 C 92 103 86 112 76 112 L 24 112 C 14 112 8 103 12 95 L 42 40 Z"
        fill="url(#flaskGlass)"
        stroke="#7dd3fc"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Rim */}
      <rect x="38" y="11" width="24" height="5" rx="2" fill="#38bdf8" />

      {/* Glowing Liquid */}
      <path
        d="M 28 72 Q 50 66 72 72 L 80 98 C 82 104 78 110 72 110 L 28 110 C 22 110 18 104 20 98 Z"
        fill="url(#flaskLiquid)"
      />
      {/* Liquid Wave top */}
      <ellipse cx="50" cy="72" rx="22" ry="4" fill="#67e8f9" />

      {/* Measurement Ticks */}
      <line
        x1="38"
        y1="84"
        x2="45"
        y2="84"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="34"
        y1="94"
        x2="43"
        y2="94"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Bubbles */}
      <circle cx="46" cy="88" r="3" fill="#ffffff" fillOpacity="0.8" />
      <circle cx="56" cy="98" r="2.5" fill="#ffffff" fillOpacity="0.8" />
      <circle cx="52" cy="78" r="1.5" fill="#ffffff" fillOpacity="0.8" />
      <circle cx="48" cy="55" r="2" fill="#38bdf8" fillOpacity="0.6" />
    </svg>
  );
}

/* =========================================================================
   MAIN COMPONENT: FloatingCampusObjects
   ========================================================================= */

interface ObjectConfig {
  id: string;
  name: string;
  Component: React.ComponentType;
  // Positioning in % inside the container
  top: string;
  left: string;
  width: string;
  height: string;
  // Parallax intensity coefficient
  parallaxFactor: number;
  // Animation duration & delay
  duration: number;
  delay: number;
  // Rotation range in deg
  rotateRange: [number, number];
  // Float translation range in px
  floatRange: [number, number];
  // Device visibility tier: 'mobile' (all devices), 'tablet' (>=640px), 'desktop' (>=1024px)
  tier: "mobile" | "tablet" | "desktop";
}

const OBJECTS: ObjectConfig[] = [
  // 1. Stack of Books (Hero Anchor - Center/Bottom)
  {
    id: "books",
    name: "Stack of Books",
    Component: ClayBooks,
    top: "42%",
    left: "28%",
    width: "140px",
    height: "120px",
    parallaxFactor: 0.03,
    duration: 6.5,
    delay: 0,
    rotateRange: [-1.5, 2],
    floatRange: [-10, 8],
    tier: "mobile",
  },
  // 2. Graduation Cap (Top Left)
  {
    id: "gradcap",
    name: "Graduation Cap",
    Component: ClayGraduationCap,
    top: "8%",
    left: "6%",
    width: "115px",
    height: "95px",
    parallaxFactor: -0.06,
    duration: 5.8,
    delay: 0.6,
    rotateRange: [-4, 6],
    floatRange: [-14, 10],
    tier: "mobile",
  },
  // 3. Laptop (Center Right)
  {
    id: "laptop",
    name: "Laptop",
    Component: ClayLaptop,
    top: "22%",
    left: "58%",
    width: "135px",
    height: "110px",
    parallaxFactor: 0.05,
    duration: 7.2,
    delay: 1.1,
    rotateRange: [-3, 3],
    floatRange: [-8, 12],
    tier: "mobile",
  },
  // 4. College Backpack (Far Right Bottom)
  {
    id: "backpack",
    name: "Backpack",
    Component: ClayBackpack,
    top: "50%",
    left: "66%",
    width: "115px",
    height: "125px",
    parallaxFactor: -0.04,
    duration: 6.8,
    delay: 1.8,
    rotateRange: [-3, 4],
    floatRange: [-10, 8],
    tier: "tablet",
  },
  // 5. Open Notebook (Bottom Left)
  {
    id: "notebook",
    name: "Open Notebook",
    Component: ClayNotebook,
    top: "60%",
    left: "8%",
    width: "110px",
    height: "95px",
    parallaxFactor: 0.04,
    duration: 7.5,
    delay: 0.4,
    rotateRange: [2, -3],
    floatRange: [-12, 6],
    tier: "tablet",
  },
  // 6. Paper Plane (Top Right Drift)
  {
    id: "paperplane",
    name: "Paper Plane",
    Component: ClayPaperPlane,
    top: "4%",
    left: "68%",
    width: "95px",
    height: "75px",
    parallaxFactor: -0.08,
    duration: 5.2,
    delay: 2.1,
    rotateRange: [-6, 8],
    floatRange: [-16, 12],
    tier: "desktop",
  },
  // 7. Headphones (Mid Left)
  {
    id: "headphones",
    name: "Headphones",
    Component: ClayHeadphones,
    top: "32%",
    left: "4%",
    width: "95px",
    height: "95px",
    parallaxFactor: 0.07,
    duration: 6.2,
    delay: 1.4,
    rotateRange: [-5, 5],
    floatRange: [-10, 10],
    tier: "desktop",
  },
  // 8. Pencil & Pen (Top Center Floating)
  {
    id: "pencil",
    name: "Pencil & Pen",
    Component: ClayPencilPen,
    top: "10%",
    left: "40%",
    width: "85px",
    height: "85px",
    parallaxFactor: -0.05,
    duration: 4.8,
    delay: 2.5,
    rotateRange: [-8, 6],
    floatRange: [-12, 14],
    tier: "desktop",
  },
  // 9. Coffee Cup (Bottom Center Right)
  {
    id: "coffeecup",
    name: "Coffee Cup",
    Component: ClayCoffeeCup,
    top: "66%",
    left: "48%",
    width: "75px",
    height: "95px",
    parallaxFactor: 0.04,
    duration: 6.0,
    delay: 0.9,
    rotateRange: [-4, 3],
    floatRange: [-8, 6],
    tier: "desktop",
  },
  // 10. Chemistry Flask (Top Center Left)
  {
    id: "flask",
    name: "Chemistry Flask",
    Component: ClayFlask,
    top: "20%",
    left: "24%",
    width: "75px",
    height: "90px",
    parallaxFactor: -0.06,
    duration: 6.6,
    delay: 1.6,
    rotateRange: [-3, 5],
    floatRange: [-10, 10],
    tier: "desktop",
  },
];

export default function FloatingCampusObjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Motion values for smooth mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs to make parallax buttery and gentle
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const container = containerRef.current;
    if (!container) {
      return () => {
        window.removeEventListener("resize", checkMobile);
      };
    }

    const handlePointerMove = (e: MouseEvent) => {
      if (window.innerWidth < 640) return;
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      mouseX.set(deltaX);
      mouseY.set(deltaY);
    };

    const handlePointerLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    container.addEventListener("mousemove", handlePointerMove);
    container.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.removeEventListener("resize", checkMobile);
      container.removeEventListener("mousemove", handlePointerMove);
      container.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[320px] sm:h-[380px] lg:h-[420px] select-none pointer-events-auto"
      aria-hidden="true"
    >
      {/* Background Soft Studio Aura / Depth Glow */}
      <div
        className="pointer-events-none absolute inset-4 sm:inset-8 rounded-full bg-gradient-to-tr from-primary/10 via-accent/10 to-indigo-400/10 blur-2xl opacity-75"
        aria-hidden="true"
      />

      {/* Decorative campus badge pedestal in background */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-primary/10 bg-surface/40 backdrop-blur-xs shadow-inner flex items-center justify-center opacity-60"
        aria-hidden="true"
      >
        <div className="w-48 h-48 sm:w-60 sm:h-60 rounded-full border border-dashed border-border" />
      </div>

      {/* Floating 3D Objects Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {OBJECTS.map((item) => {
          // Responsive display class
          const visibilityClass =
            item.tier === "mobile"
              ? "block"
              : item.tier === "tablet"
                ? "hidden sm:block"
                : "hidden lg:block";

          return (
            <FloatingItem
              key={item.id}
              item={item}
              springX={springX}
              springY={springY}
              isMobile={isMobile}
              visibilityClass={visibilityClass}
            />
          );
        })}
      </div>
    </div>
  );
}

interface FloatingItemProps {
  item: ObjectConfig;
  springX: ReturnType<typeof useSpring>;
  springY: ReturnType<typeof useSpring>;
  isMobile: boolean;
  visibilityClass: string;
}

function FloatingItem({
  item,
  springX,
  springY,
  isMobile,
  visibilityClass,
}: FloatingItemProps) {
  // Parallax transform
  const parallaxX = useTransform(springX, (x) =>
    isMobile ? 0 : x * item.parallaxFactor,
  );
  const parallaxY = useTransform(springY, (y) =>
    isMobile ? 0 : y * item.parallaxFactor,
  );

  const { Component } = item;

  return (
    <motion.div
      style={{
        position: "absolute",
        top: item.top,
        left: item.left,
        width: item.width,
        height: item.height,
        x: parallaxX,
        y: parallaxY,
      }}
      className={`z-10 ${visibilityClass}`}
    >
      {/* Autonomous Floating & Oscillation Animation */}
      <motion.div
        animate={{
          y: [item.floatRange[0], item.floatRange[1], item.floatRange[0]],
          rotate: [
            item.rotateRange[0],
            item.rotateRange[1],
            item.rotateRange[0],
          ],
        }}
        transition={{
          duration: item.duration,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: item.delay,
        }}
        className="w-full h-full cursor-default transition-transform duration-300 hover:scale-110 pointer-events-auto"
        title={item.name}
      >
        <Component />
      </motion.div>
    </motion.div>
  );
}
