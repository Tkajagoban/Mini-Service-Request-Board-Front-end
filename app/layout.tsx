import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Service Request Board",
  description: "Browse and create home service requests.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="navbar">
          <div>
            <h1 className="navbar-title">Service Request Board</h1>
          </div>
          <div className="navbar-links">
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/new" className="nav-link">
              New Request
            </Link>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
