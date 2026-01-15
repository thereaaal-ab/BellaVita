"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import toast from "react-hot-toast";

const reviewSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  rating: z.string().min(1, "Please select a rating"),
  comment: z.string().min(10, "Comment must be at least 10 characters"),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  source: string;
  createdAt: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
  });

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load reviews");
        }
        return res.json();
      })
      .then((data) => {
        // Ensure data is an array
        setReviews(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setReviews([]);
        setLoading(false);
      });
  }, []);

  const onSubmit = async (data: ReviewFormData) => {
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to submit review");

      toast.success("Review submitted! Thank you for your feedback.");
      setIsModalOpen(false);
      reset();
      // Refresh reviews
      const updatedReviews = await fetch("/api/reviews")
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch");
          return res.json();
        })
        .then((data) => (Array.isArray(data) ? data : []))
        .catch(() => []);
      setReviews(updatedReviews);
    } catch {
      toast.error("Failed to submit review. Please try again.");
    }
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p>Loading reviews...</p>
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
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Reviews</h1>
        <p className="text-muted-foreground text-lg mb-6">
          See what our guests are saying about us
        </p>
        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">{averageRating.toFixed(1)}</div>
            <div className="flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Based on {reviews.length} reviews
            </p>
          </div>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="mt-6">
          <MessageSquare className="mr-2 h-4 w-4" />
          Write a Review
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{review.source}</span>
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  &ldquo;{review.comment}&rdquo;
                </p>
                <p className="font-semibold text-sm">— {review.name}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Write a Review">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="review-name">Name *</Label>
            <Input
              id="review-name"
              {...register("name")}
              placeholder="Your name"
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="review-email">Email (optional)</Label>
            <Input
              id="review-email"
              type="email"
              {...register("email")}
              placeholder="your@email.com"
            />
          </div>
          <div>
            <Label htmlFor="review-rating">Rating *</Label>
            <Select
              id="review-rating"
              {...register("rating")}
              aria-invalid={!!errors.rating}
            >
              <option value="">Select rating</option>
              {[5, 4, 3, 2, 1].map((rating) => (
                <option key={rating} value={rating}>
                  {rating} {rating === 1 ? "star" : "stars"}
                </option>
              ))}
            </Select>
            {errors.rating && (
              <p className="text-sm text-destructive mt-1">{errors.rating.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="review-comment">Comment *</Label>
            <Textarea
              id="review-comment"
              {...register("comment")}
              placeholder="Share your experience..."
              rows={5}
              aria-invalid={!!errors.comment}
            />
            {errors.comment && (
              <p className="text-sm text-destructive mt-1">{errors.comment.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </Modal>
    </div>
  );
}

