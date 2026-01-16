import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reviews | Bella Vita - Authentic Italian Restaurant",
  description: "Read what our guests say about Bella Vita. Authentic Italian cuisine, exceptional service, and memorable dining experiences.",
  keywords: "restaurant reviews, bella vita reviews, italian restaurant reviews, customer testimonials, dining reviews",
  openGraph: {
    title: "Reviews | Bella Vita",
    description: "Read what our guests say about Bella Vita",
    type: "website",
  },
};

export default function ReviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

