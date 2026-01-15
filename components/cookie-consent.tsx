"use client";

import { useState } from "react";
import { X, Cookie } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(() => {
    if (typeof window === "undefined") return false;
    return !localStorage.getItem("cookie-consent");
  });

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-card border-t shadow-lg"
        >
          <div className="container mx-auto max-w-4xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Cookie className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div className="flex-1">
              <p className="text-sm text-foreground">
                We use cookies to enhance your browsing experience and analyze our traffic. By
                clicking &quot;Accept&quot;, you consent to our use of cookies.{" "}
                <a
                  href="/privacy"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more
                </a>
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button variant="outline" size="sm" className="border" onClick={rejectCookies}>
                Reject
              </Button>
              <Button size="sm" onClick={acceptCookies}>
                Accept
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="sm:hidden"
                onClick={acceptCookies}
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

