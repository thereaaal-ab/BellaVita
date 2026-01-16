"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { DarkModeToggle } from "./dark-mode-toggle";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
      >
        Skip to main content
      </a>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/80 backdrop-blur-md shadow-md"
            : "bg-transparent"
        )}
        role="banner"
      >
        <nav className="container mx-auto px-4 sm:px-6 md:px-8 py-3 sm:py-4" role="navigation" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2" aria-label="Bella Vita - Home">
            <span className="text-xl sm:text-2xl font-display font-bold text-primary">
              Bella Vita
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm lg:text-base font-medium text-foreground/80 hover:text-primary transition-colors px-2 py-1 min-h-[44px] flex items-center"
                aria-label={`Navigate to ${item.label} page`}
              >
                {item.label}
              </Link>
            ))}
            <DarkModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <DarkModeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className="min-h-[44px] min-w-[44px]"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-3 text-base font-medium text-foreground/80 hover:text-primary hover:bg-accent rounded-md transition-colors min-h-[44px] flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="w-full mt-4 min-h-[48px]">
              <Link href="/reservations" onClick={() => setIsMobileMenuOpen(false)}>
                Reserve Table
              </Link>
            </Button>
          </div>
        )}
      </nav>
      </header>
    </>
  );
}

