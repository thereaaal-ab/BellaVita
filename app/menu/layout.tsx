import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu | Bella Vita - Authentic Italian Restaurant",
  description: "Discover our authentic Italian menu featuring traditional dishes from Antipasti to Dolci. Fresh ingredients, traditional recipes, and authentic flavors.",
  keywords: "italian menu, pasta, pizza, risotto, antipasti, primi, secondi, dolci, italian food menu, bella vita menu",
  openGraph: {
    title: "Menu | Bella Vita",
    description: "Discover our authentic Italian menu featuring traditional dishes",
    type: "website",
  },
};

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

