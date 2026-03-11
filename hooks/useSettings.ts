"use client";

import { useState } from "react";
import { getSettings, saveSettings, AppSettings } from "@/lib/settingsStore";

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(getSettings);

  const update = (patch: Partial<AppSettings>) => {
    setSettings(saveSettings(patch));
  };

  return { settings, update };
}
