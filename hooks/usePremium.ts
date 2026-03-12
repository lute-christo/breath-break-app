"use client";

import { useState } from "react";
import {
  isPremium,
  isBetaUnlock,
  setBetaUnlock,
} from "@/lib/premiumStore";

export function usePremium() {
  const [premium, setPremiumState] = useState<boolean>(isPremium);
  const [betaUnlock, setBetaUnlockState] = useState<boolean>(isBetaUnlock);

  const toggleBetaUnlock = () => {
    const next = !betaUnlock;
    setBetaUnlock(next);
    setBetaUnlockState(next);
    setPremiumState(isPremium());
  };

  return { isPremium: premium, isBetaUnlock: betaUnlock, toggleBetaUnlock };
}
