"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const featuredDishes = [
  {
    id: "1",
    name: "Spaghetti Carbonara",
    description: "Classic Roman pasta with eggs, pancetta, and pecorino",
    price: 24.99,
    image: "/images/carbonara.jpg",
  },
  {
    id: "2",
    name: "Osso Buco",
    description: "Braised veal shanks with risotto",
    price: 32.99,
    image: "/images/ossobuco.jpg",
  },
  {
    id: "3",
    name: "Tiramisu",
    description: "Classic Italian dessert with coffee and mascarpone",
    price: 10.99,
    image: "/images/tiramisu.jpg",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    rating: 5,
    comment: "Absolutely amazing! The pasta was perfect and the service was exceptional.",
    source: "Google",
  },
  {
    name: "Michael Chen",
    rating: 5,
    comment: "Best Italian restaurant in town. The Osso Buco was incredible!",
    source: "Yelp",
  },
  {
    name: "Emily Rodriguez",
    rating: 4,
    comment: "Great atmosphere and delicious food. Will definitely come back!",
    source: "Website",
  },
];

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero.jpg')",
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
            Bella Vita
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Authentic Italian Cuisine in the Heart of the City
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/reservations">Reserve a Table</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 bg-white/10 border-white text-white hover:bg-white/20"
            >
              <Link href="/menu">View Menu</Link>
            </Button>
          </div>
        </motion.div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowRight className="h-6 w-6 text-white rotate-90" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <Clock className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Open Daily</h3>
              <p className="text-muted-foreground">
                Mon-Thu: 5PM-10PM<br />
                Fri-Sat: 5PM-11PM<br />
                Sun: 4PM-9PM
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <MapPin className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Prime Location</h3>
              <p className="text-muted-foreground">
                123 Main Street<br />
                City, State 12345
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <Star className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Award Winning</h3>
              <p className="text-muted-foreground">
                Recognized for excellence in<br />
                authentic Italian cuisine
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-20 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
            >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Featured Dishes
          </h2>
          <p className="text-muted-foreground text-lg">
            Discover our chef&apos;s signature creations
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredDishes.map((dish, index) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-64">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{dish.name}</h3>
                  <p className="text-muted-foreground mb-4">{dish.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">
                      ${dish.price}
                    </span>
                    <Button asChild variant="outline">
                      <Link href="/menu">View</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/menu">View Full Menu</Link>
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              What Our Guests Say
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      &ldquo;{testimonial.comment}&rdquo;
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{testimonial.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {testimonial.source}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/reviews">Read More Reviews</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-primary text-primary-foreground rounded-lg p-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Ready to Experience Bella Vita?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Reserve your table today and indulge in authentic Italian cuisine
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
            <Link href="/reservations">Make a Reservation</Link>
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
