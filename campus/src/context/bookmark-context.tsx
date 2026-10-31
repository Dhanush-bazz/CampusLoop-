"use client";

import type { ReactNode } from "react";
import { StudentProvider, useStudent } from "./student-context";

export function BookmarkProvider({ children }: { children: ReactNode }) {
  return <StudentProvider>{children}</StudentProvider>;
}

export function useBookmarks() {
  const { bookmarkedIds, toggleBookmark, isBookmarked, removeBookmark } =
    useStudent();
  return { bookmarkedIds, toggleBookmark, isBookmarked, removeBookmark };
}
