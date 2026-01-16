import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Bella Vita - Authentic Italian Restaurant",
  description: "Privacy Policy for Bella Vita Restaurant. Learn how we collect, use, and protect your personal information.",
  keywords: "privacy policy, data protection, bella vita privacy, restaurant privacy policy",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-display font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
        <p className="text-muted-foreground">
          <strong>Last updated:</strong> {new Date().toLocaleDateString()}
        </p>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-muted-foreground">
            At Bella Vita, we are committed to protecting your privacy. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your information when you visit
            our website or use our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p className="text-muted-foreground mb-2">We may collect information about you in a variety of ways:</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Personal information (name, email, phone number) when you make a reservation or contact us</li>
            <li>Payment information when you place an order (processed securely through third-party providers)</li>
            <li>Usage data and analytics when you visit our website</li>
            <li>Cookies and tracking technologies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p className="text-muted-foreground mb-2">We use the information we collect to:</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Process and manage your reservations and orders</li>
            <li>Send you confirmations and updates</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Improve our website and services</li>
            <li>Send marketing communications (with your consent)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p className="text-muted-foreground">
            We implement appropriate technical and organizational measures to protect your personal
            information. However, no method of transmission over the Internet is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p className="text-muted-foreground mb-2">You have the right to:</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
            <li>Withdraw consent at any time</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-muted-foreground">
            If you have questions about this Privacy Policy, please contact us at:
            <br />
            Email: privacy@bellavita.com
            <br />
            Phone: (123) 456-7890
          </p>
        </section>

        <div className="mt-8">
          <Button asChild variant="outline" className="border">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

