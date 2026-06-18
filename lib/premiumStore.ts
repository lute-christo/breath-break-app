"use client";

const PREMIUM_KEY = "breathbreak_premium";
const BETA_KEY = "breathbreak_beta_unlock";

// Change this to rotate the beta code whenever needed
const BETA_CODES = ["BREATHBETA", "BB2024", "TONGLENONME"];

export function isPremium(): boolean {
  if (typeof window === "undefined") return false;
  return (
    localStorage.getItem(BETA_KEY) === "1" ||
    localStorage.getItem(PREMIUM_KEY) === "1"
  );
}

export function isBetaUnlock(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(BETA_KEY) === "1";
}

export function setBetaUnlock(enabled: boolean): void {
  if (typeof window === "undefined") return;
  if (enabled) {
    localStorage.setItem(BETA_KEY, "1");
  } else {
    localStorage.removeItem(BETA_KEY);
  }
}

export function setPremium(enabled: boolean): void {
  if (typeof window === "undefined") return;
  if (enabled) {
    localStorage.setItem(PREMIUM_KEY, "1");
  } else {
    localStorage.removeItem(PREMIUM_KEY);
  }
}

export function redeemCode(code: string): boolean {
  if (BETA_CODES.includes(code.trim().toUpperCase())) {
    setBetaUnlock(true);
    return true;
  }
  return false;
}
