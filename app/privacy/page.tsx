import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="space-y-8 pb-16">
      <header className="space-y-1">
        <Link
          href="/settings"
          className="text-[0.65rem] uppercase tracking-[0.2em] text-neutral-500 hover:text-neutral-300 transition"
        >
          ← Settings
        </Link>
        <h1 className="text-lg font-semibold pt-2">Privacy Policy</h1>
        <p className="text-xs text-neutral-500">Last updated: March 2026</p>
      </header>

      <section className="space-y-6 text-sm text-neutral-300 leading-relaxed">
        <div className="space-y-2">
          <h2 className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            The short version
          </h2>
          <p>
            BREATH//BREAK does not collect, transmit, or store any personal
            data on external servers. Everything stays on your device.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            What we store locally
          </h2>
          <p>
            Your practice sessions, settings, and onboarding status are saved
            in your device&apos;s local storage. This data never leaves your
            device and is not accessible to us or any third party.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            Notifications
          </h2>
          <p>
            If you enable daily reminders, the app uses your device&apos;s
            local notification system. No notification data is sent to any
            server. You can revoke notification permission at any time in your
            device settings.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            Analytics & tracking
          </h2>
          <p>
            None. We do not use analytics services, advertising SDKs, or any
            third-party tracking tools.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            Third-party services
          </h2>
          <p>
            None currently integrated. If this changes, this policy will be
            updated before any such integration ships.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            Deleting your data
          </h2>
          <p>
            You can delete all local data at any time from the Settings page
            using &quot;Reset all practice data.&quot; Uninstalling the app
            also removes all locally stored data.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            Contact
          </h2>
          <p>
            Questions about this policy?{" "}
            <a
              href="mailto:hello@breathbreak.app"
              className="underline underline-offset-4 hover:text-neutral-100 transition"
            >
              hello@breathbreak.app
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
