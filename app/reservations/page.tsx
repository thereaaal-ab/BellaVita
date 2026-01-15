"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";

const reservationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  date: z.date(),
  time: z.string().min(1, "Please select a time"),
  partySize: z.string().min(1, "Please select party size"),
  specialRequests: z.string().optional(),
});

type ReservationFormData = z.infer<typeof reservationSchema>;

const timeSlots = [
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
  "10:00 PM",
];

const partySizes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];

export default function ReservationsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      date: new Date(),
      time: "",
      partySize: "",
    },
  });

  const onSubmit = async (data: ReservationFormData) => {
    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          date: data.date.toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Failed to submit reservation");

      toast.success("Reservation submitted successfully! We'll confirm shortly.");
      // Reset form
      setSelectedDate(new Date());
      setValue("name", "");
      setValue("email", "");
      setValue("phone", "");
      setValue("time", "");
      setValue("partySize", "");
      setValue("specialRequests", "");
    } catch {
      toast.error("Failed to submit reservation. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
          Make a Reservation
        </h1>
        <p className="text-muted-foreground text-lg">
          Reserve your table for an unforgettable dining experience
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Reservation Details</CardTitle>
            <CardDescription>
              Please fill in the form below to reserve your table
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="John Doe"
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="john@example.com"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  placeholder="(123) 456-7890"
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">
                    <Calendar className="inline h-4 w-4 mr-2" />
                    Date *</Label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date: Date | null) => {
                      setSelectedDate(date);
                      setValue("date", date || new Date());
                    }}
                    minDate={new Date()}
                    dateFormat="MMMM d, yyyy"
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    wrapperClassName="w-full"
                  />
                  {errors.date && (
                    <p className="text-sm text-destructive mt-1">{errors.date.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="time">
                    <Clock className="inline h-4 w-4 mr-2" />
                    Time *</Label>
                  <Select
                    id="time"
                    {...register("time")}
                    aria-invalid={!!errors.time}
                  >
                    <option value="">Select time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </Select>
                  {errors.time && (
                    <p className="text-sm text-destructive mt-1">{errors.time.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="partySize">
                  <Users className="inline h-4 w-4 mr-2" />
                  Party Size *</Label>
                <Select
                  id="partySize"
                  {...register("partySize")}
                  aria-invalid={!!errors.partySize}
                >
                  <option value="">Select party size</option>
                  {partySizes.map((size) => (
                    <option key={size} value={size}>
                      {size} {size === "1" ? "guest" : "guests"}
                    </option>
                  ))}
                </Select>
                {errors.partySize && (
                  <p className="text-sm text-destructive mt-1">{errors.partySize.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="specialRequests">Special Requests</Label>
                <Textarea
                  id="specialRequests"
                  {...register("specialRequests")}
                  placeholder="Dietary restrictions, celebrations, etc."
                  rows={4}
                />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Reservation"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

