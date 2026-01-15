"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import toast from "react-hot-toast";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
}

export default function OrderPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => {
        setMenuItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    toast.success("Added to cart");
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
    toast.success("Removed from cart");
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          total,
        }),
      });

      if (!response.ok) throw new Error("Failed to place order");

      toast.success("Order placed successfully! We'll prepare it for pickup.");
      setCart([]);
    } catch {
      toast.error("Failed to place order. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p>Loading menu...</p>
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
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Order Online</h1>
        <p className="text-muted-foreground text-lg">
          Order your favorite dishes for pickup
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Menu Items */}
        <div className="lg:col-span-2 space-y-6">
          {["appetizer", "main", "dessert"].map((category) => {
            const items = menuItems.filter((item) => item.category === category);
            if (items.length === 0) return null;

            return (
              <motion.section
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-display font-bold mb-4 capitalize">
                  {category === "main" ? "Main Courses" : category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {items.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      {item.image && (
                        <div className="relative h-32">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      )}
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                          <span className="text-lg font-bold text-primary">
                            {formatCurrency(item.price)}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          className="w-full"
                          onClick={() => addToCart(item)}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.section>
            );
          })}
        </div>

        {/* Cart */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <ShoppingCart className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Your Cart</h2>
              </div>

              {cart.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Your cart is empty
                </p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        {item.image && (
                          <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatCurrency(item.price)} × {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            className="border h-8 w-8"
                            size="icon"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            className="border h-8 w-8"
                            size="icon"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            className="border h-8 w-8 text-destructive"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleCheckout}
                    >
                      Checkout
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Orders are for pickup only. We&apos;ll notify you when ready.
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

