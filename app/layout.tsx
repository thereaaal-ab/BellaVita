import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CookieConsent } from "@/components/cookie-consent";
import { RestaurantStructuredData } from "@/components/structured-data";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://bellavita.com"),
  title: {
    default: "Bella Vita - Authentic Italian Restaurant",
    template: "%s | Bella Vita",
  },
  description:
    "Experience authentic Italian cuisine at Bella Vita. Fine dining with traditional recipes, fresh ingredients, and an elegant atmosphere.",
  keywords: ["Italian restaurant", "fine dining", "authentic Italian", "Bella Vita"],
  authors: [{ name: "Bella Vita" }],
  creator: "Bella Vita",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bella-vita-beta.vercel.app",
    siteName: "Bella Vita",
    title: "Bella Vita - Authentic Italian Restaurant",
    description:
      "Experience authentic Italian cuisine at Bella Vita. Fine dining with traditional recipes, fresh ingredients, and an elegant atmosphere.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Bella Vita Restaurant - Authentic Italian Dining",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bella Vita - Authentic Italian Restaurant",
    description:
      "Experience authentic Italian cuisine at Bella Vita. Fine dining with traditional recipes, fresh ingredients, and an elegant atmosphere.",
    images: ["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
          <head>
            <link rel="icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            <link rel="manifest" href="/manifest.json" />
            <meta name="theme-color" content="#f97316" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
            <RestaurantStructuredData />
          </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <ThemeProvider defaultTheme="system" storageKey="bellavita-theme">
          <div className="flex min-h-screen flex-col">
            <Header />
            <main id="main-content" className="flex-1" role="main">{children}</main>
            <Footer />
          </div>
          <CookieConsent />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "hsl(var(--card))",
                color: "hsl(var(--card-foreground))",
                border: "1px solid hsl(var(--border))",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
