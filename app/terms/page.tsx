import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Bella Vita Restaurant",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-display font-bold mb-8">Terms of Service</h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
        <p className="text-muted-foreground">
          <strong>Last updated:</strong> {new Date().toLocaleDateString()}
        </p>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
          <p className="text-muted-foreground">
            By accessing or using the Bella Vita website and services, you agree to be bound by
            these Terms of Service. If you disagree with any part of these terms, you may not
            access our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Reservations</h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Reservations are subject to availability</li>
            <li>We require 24 hours notice for cancellations</li>
            <li>Late cancellations or no-shows may be subject to a fee</li>
            <li>We reserve the right to cancel reservations due to unforeseen circumstances</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Online Orders</h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>All orders are subject to availability</li>
            <li>Prices are subject to change without notice</li>
            <li>Orders are for pickup only unless otherwise stated</li>
            <li>We are not responsible for orders not picked up within the specified time</li>
            <li>Refunds are at our discretion</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
          <p className="text-muted-foreground">
            All content on this website, including text, graphics, logos, images, and software, is
            the property of Bella Vita and is protected by copyright and other intellectual
            property laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
          <p className="text-muted-foreground">
            Bella Vita shall not be liable for any indirect, incidental, special, consequential, or
            punitive damages resulting from your use of our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
          <p className="text-muted-foreground">
            We reserve the right to modify these terms at any time. Changes will be effective
            immediately upon posting to the website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-muted-foreground">
            If you have questions about these Terms of Service, please contact us at:
            <br />
            Email: legal@bellavita.com
            <br />
            Phone: (123) 456-7890
          </p>
        </section>

        <div className="mt-8 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> This is a template terms of service. Please consult with a
            legal professional to ensure compliance with applicable laws and regulations in your
            jurisdiction.
          </p>
        </div>
      </div>
    </div>
  );
}

