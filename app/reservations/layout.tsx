import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reservations | Bella Vita - Authentic Italian Restaurant",
  description: "Reserve your table at Bella Vita. Experience authentic Italian cuisine in an elegant atmosphere. Book online for lunch or dinner.",
  keywords: "restaurant reservations, book table, italian restaurant booking, bella vita reservations, dinner reservations",
  openGraph: {
    title: "Reservations | Bella Vita",
    description: "Reserve your table at Bella Vita for an unforgettable dining experience",
    type: "website",
  },
};

export default function ReservationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

