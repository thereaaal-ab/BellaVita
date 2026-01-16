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
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80",
  },
  {
    id: "2",
    name: "Osso Buco",
    description: "Braised veal shanks with risotto",
    price: 32.99,
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
  },
  {
    id: "3",
    name: "Tiramisu",
    description: "Classic Italian dessert with coffee and mascarpone",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80",
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

  return (
    <div className="flex flex-col">
      {/* Hero Section - Mobile First */}
      <section className="relative w-full h-[100vh] min-h-[600px] max-h-[900px] flex items-center justify-center overflow-hidden">
        {/* Hero Image - Optimized for mobile and desktop */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80"
            alt="Bella Vita Italian Restaurant Interior"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-black/50 md:bg-black/40" />
        </div>
        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4 sm:px-6 md:px-8 w-full max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4 sm:mb-6 leading-tight">
            Bella Vita
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-2xl mx-auto px-2 leading-relaxed">
            Authentic Italian Cuisine in the Heart of the City
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <Button 
              asChild 
              size="lg" 
              className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 min-h-[48px] sm:min-h-[56px]" 
              aria-label="Make a reservation at Bella Vita"
            >
              <Link href="/reservations">Reserve a Table</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-white/10 border-white text-white hover:bg-white/20 min-h-[48px] sm:min-h-[56px]"
              aria-label="View our menu"
            >
              <Link href="/menu">View Menu</Link>
            </Button>
          </div>
        </motion.div>
        {/* Scroll Indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
          <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 text-white rotate-90" aria-hidden="true" />
        </div>
      </section>

      {/* Features Section - Mobile First */}
      <section className="py-12 sm:py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center px-4"
            >
              <Clock className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-primary" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Open Daily</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
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
              className="text-center px-4"
            >
              <MapPin className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-primary" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Prime Location</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                123 Main Street<br />
                City, State 12345
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center px-4 sm:col-span-2 md:col-span-1"
            >
              <Star className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-primary" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Award Winning</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Recognized for excellence in<br />
                authentic Italian cuisine
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Dishes - Mobile First */}
      <section className="py-12 sm:py-16 md:py-20 container mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 sm:mb-4 leading-tight">
            Featured Dishes
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground px-4">
            Discover our chef&apos;s signature creations
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {featuredDishes.map((dish, index) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
                <div className="relative h-48 sm:h-56 md:h-64 flex-shrink-0 w-full">
                  <Image
                    src={dish.image}
                    alt={`${dish.name} - ${dish.description}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-4 sm:p-6 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{dish.name}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 flex-grow leading-relaxed">{dish.description}</p>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mt-auto">
                    <span className="text-xl sm:text-2xl font-bold text-primary">
                      ${dish.price.toFixed(2)}
                    </span>
                    <Button asChild variant="outline" className="border w-full sm:w-auto min-h-[44px]" aria-label={`View ${dish.name} on menu`}>
                      <Link href="/menu">View</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8 sm:mt-12">
          <Button asChild size="lg" className="w-full sm:w-auto min-h-[48px] sm:min-h-[56px]" aria-label="View our full menu">
            <Link href="/menu">View Full Menu</Link>
          </Button>
        </div>
      </section>

      {/* Testimonials - Mobile First */}
      <section className="py-12 sm:py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 sm:mb-4 leading-tight">
              What Our Guests Say
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-4 sm:p-6 flex flex-col h-full">
                    <div className="flex mb-3 sm:mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400"
                          aria-label={`${testimonial.rating} stars`}
                        />
                      ))}
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground mb-4 italic flex-grow leading-relaxed">
                      &ldquo;{testimonial.comment}&rdquo;
                    </p>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mt-auto">
                      <span className="text-sm sm:text-base font-semibold">{testimonial.name}</span>
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        {testimonial.source}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-12">
            <Button asChild variant="outline" className="border w-full sm:w-auto min-h-[48px] sm:min-h-[56px]" aria-label="Read more customer reviews">
              <Link href="/reviews">Read More Reviews</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile First */}
      <section className="py-12 sm:py-16 md:py-20 container mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-primary text-primary-foreground rounded-lg p-6 sm:p-8 md:p-12 text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3 sm:mb-4 leading-tight px-2">
            Ready to Experience Bella Vita?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90 px-2 leading-relaxed">
            Reserve your table today and indulge in authentic Italian cuisine
          </p>
          <Button asChild size="lg" variant="secondary" className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 min-h-[48px] sm:min-h-[56px] w-full sm:w-auto" aria-label="Make a reservation at Bella Vita">
            <Link href="/reservations">Make a Reservation</Link>
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
