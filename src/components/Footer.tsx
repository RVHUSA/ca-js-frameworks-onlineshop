import Image from "next/image";
import Link from "next/link";

// Footer with logo and slogan
export function Footer() {
  return (
    <footer className="mt-16 bg-card">
      <div className="mx-auto flex max-w-6xl p-6">
        <div>
          {/* Logo and links */}
          <Link href="/" className="inline-block">
            <Image
              src="/logo.png"
              alt="OMNI. home"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
          <p className="mt-2 text-sm text-muted">Everything, in one place.</p>
        </div>
      </div>

      <p className="pb-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} OMNI. All rights reserved.
      </p>
    </footer>
  );
}
