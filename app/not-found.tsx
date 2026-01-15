import Link from "next/link";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-9xl font-display font-bold text-primary mb-4">404</h1>
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
          Page Not Found
        </h2>
        <p className="text-muted-foreground text-lg mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/menu">
              <Search className="mr-2 h-4 w-4" />
              Browse Menu
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

