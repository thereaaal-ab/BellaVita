"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Filter, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { formatCurrency } from "@/lib/utils";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image?: string;
  allergens?: string[];
  vegan: boolean;
  glutenFree: boolean;
  vegetarian: boolean;
}

const categories = ["all", "appetizer", "main", "dessert", "drink"];
const filters = ["all", "vegan", "vegetarian", "glutenFree"];

// Italian category names for display
const categoryNames: Record<string, string> = {
  appetizer: "Antipasti",
  main: "Primi & Secondi",
  dessert: "Dolci",
  drink: "Bevande",
};

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load menu");
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setMenuItems(data);
          setError(null);
        } else {
          setMenuItems([]);
          setError("Menu is unavailable right now. Please try again later.");
        }
        setLoading(false);
      })
      .catch(() => {
        setMenuItems([]);
        setError("Menu is unavailable right now. Please try again later.");
        setLoading(false);
      });
  }, []);

  const filteredItems = menuItems.filter((item) => {
    const categoryMatch = selectedCategory === "all" || item.category === selectedCategory;
    const filterMatch =
      selectedFilter === "all" ||
      (selectedFilter === "vegan" && item.vegan) ||
      (selectedFilter === "vegetarian" && item.vegetarian) ||
      (selectedFilter === "glutenFree" && item.glutenFree);
    return categoryMatch && filterMatch;
  });

  // Group items by category, maintaining Italian menu structure
  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  // Order categories for display: Antipasti, Primi/Secondi, Dolci, Bevande
  const categoryOrder = ["appetizer", "main", "dessert", "drink"];
  const orderedCategories = categoryOrder.filter(cat => groupedItems[cat] && groupedItems[cat].length > 0);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p>Loading menu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Our Menu</h1>
        <p className="text-muted-foreground text-lg">
          Discover our authentic Italian dishes made with the finest ingredients
        </p>
      </motion.div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium">Category:</span>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium">Dietary:</span>
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter)}
            >
              {filter === "glutenFree" ? "Gluten Free" : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-12">
        {orderedCategories.map((category) => {
          const items = groupedItems[category];
          return (
            <motion.section
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-display font-bold mb-6">
              {categoryNames[category] || category.charAt(0).toUpperCase() + category.slice(1)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {item.image && (
                    <div className="relative h-48">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{item.name}</CardTitle>
                      <Button
                        variant="outline"
                        className="border"
                        size="icon"
                        onClick={() => setSelectedItem(item)}
                        aria-label="View details"
                      >
                        <Info className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary">
                        {formatCurrency(item.price)}
                      </span>
                      <div className="flex gap-1">
                        {item.vegan && (
                          <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 rounded">
                            Vegan
                          </span>
                        )}
                        {item.vegetarian && !item.vegan && (
                          <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 rounded">
                            Vegetarian
                          </span>
                        )}
                        {item.glutenFree && (
                          <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 rounded">
                            GF
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>
          );
        })}
      </div>

      {/* Item Details Modal */}
      <Modal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title={selectedItem?.name}
      >
        {selectedItem && (
          <div className="space-y-4">
            {selectedItem.image && (
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <p className="text-muted-foreground">{selectedItem.description}</p>
            <div className="flex gap-2">
              {selectedItem.vegan && (
                <span className="px-3 py-1 text-sm bg-green-100 dark:bg-green-900 rounded">
                  Vegan
                </span>
              )}
              {selectedItem.vegetarian && !selectedItem.vegan && (
                <span className="px-3 py-1 text-sm bg-green-100 dark:bg-green-900 rounded">
                  Vegetarian
                </span>
              )}
              {selectedItem.glutenFree && (
                <span className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 rounded">
                  Gluten Free
                </span>
              )}
            </div>
            {selectedItem.allergens && selectedItem.allergens.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Allergens:</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedItem.allergens.join(", ")}
                </p>
              </div>
            )}
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(selectedItem.price)}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

