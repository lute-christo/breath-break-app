// app/head.tsx
export default function Head() {
  return (
    <>
      <meta charSet="utf-8" />
      <link rel="manifest" href="/manifest.webmanifest" />

      {/* Icons for browser + iOS */}
      <link rel="icon" href="/icons/icon-192.png" sizes="192x192" />
      <link rel="icon" href="/icons/icon-512.png" sizes="512x512" />
      <link rel="apple-touch-icon" href="/icons/icon-192.png" />
    </>
  );
}