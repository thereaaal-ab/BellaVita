"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Modal } from "@/components/ui/modal";

const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80", alt: "Restaurant interior" },
  { id: 2, src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", alt: "Dining area" },
  { id: 3, src: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80", alt: "Kitchen" },
  { id: 4, src: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80", alt: "Wine selection" },
  { id: 5, src: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80", alt: "Dessert display" },
  { id: 6, src: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=800&q=80", alt: "Chef preparing dish" },
  { id: 7, src: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80", alt: "Pasta dish" },
  { id: 8, src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", alt: "Outdoor seating" },
  { id: 9, src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80", alt: "Bar area" },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Gallery</h1>
        <p className="text-muted-foreground text-lg">
          Take a visual journey through Bella Vita
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {galleryImages.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="relative aspect-square cursor-pointer overflow-hidden rounded-lg group"
            onClick={() => setSelectedImage(image.id)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <Modal
            isOpen={true}
            onClose={() => setSelectedImage(null)}
            className="max-w-4xl"
          >
            <div className="relative aspect-video">
              <Image
                src={galleryImages.find((img) => img.id === selectedImage)?.src || ""}
                alt={galleryImages.find((img) => img.id === selectedImage)?.alt || ""}
                fill
                className="object-contain"
              />
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

