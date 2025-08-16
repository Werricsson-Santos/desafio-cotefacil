import type React from "react";

export interface AppRoute {
  path: string;
  name: string;
  element: React.ReactNode;
  showOnHome: boolean;
}