import './globals.css';
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Chautari Resort & Spa",
  description: "Luxury resort in the Maldives",
  verification: {
    google: "google-site-verification=YOUR_VERIFICATION_CODE",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script defer data-domain="chautari.com" src="https://plausible.io/js/script.js"></script>
      </head>
      <body className="antialiased">
        <div style={{ minHeight: '100vh', backgroundColor: '#F4F0E8', color: '#1C1A17' }}>
          <Nav />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
