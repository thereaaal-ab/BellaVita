"use client";

import { motion } from "framer-motion";
import { Award, Heart, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    icon: Heart,
    title: "Authenticity",
    description: "We stay true to traditional Italian recipes passed down through generations.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Every dish is crafted with care using only the finest, freshest ingredients.",
  },
  {
    icon: Users,
    title: "Community",
    description: "We believe in bringing people together through the joy of great food.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80')" }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">Our Story</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            A passion for authentic Italian cuisine
          </p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            <h2 className="text-3xl font-display font-bold mb-6">Welcome to Bella Vita</h2>
            <p className="text-muted-foreground mb-4">
              Founded in 2015, Bella Vita was born from a dream to bring authentic Italian cuisine
              to our community. Our founders, Marco and Sofia, traveled throughout Italy to learn
              traditional recipes from nonnas and master chefs.
            </p>
            <p className="text-muted-foreground mb-4">
              Today, we continue to honor those traditions while creating memorable dining
              experiences. Every dish tells a story, every ingredient is carefully selected, and
              every meal is prepared with love and passion.
            </p>
            <p className="text-muted-foreground">
              We believe that great food brings people together. Whether you&apos;re celebrating a special
              occasion, enjoying a date night, or simply craving authentic Italian flavors, we&apos;re
              here to make your experience unforgettable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Our Values</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6 text-center">
                    <value.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="aspect-video bg-white rounded-lg overflow-hidden shadow-lg">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain"
                style={{ backgroundColor: "#ffffff" }}
              >
                <source src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4" />
              </video>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

