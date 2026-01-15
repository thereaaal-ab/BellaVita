"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, Users, Mail, Phone, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  partySize: number;
  specialRequests: string | null;
  status: string;
  createdAt: string;
}

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch("/api/admin/reservations");
      if (response.ok) {
        const data = await response.json();
        setReservations(data);
      }
    } catch (error) {
      console.error("Error fetching reservations:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/reservations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        fetchReservations();
      }
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p>Loading reservations...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-8">
        <h1 className="text-4xl font-display font-bold mb-4">Reservations</h1>
        <p className="text-muted-foreground">
          View and manage all restaurant reservations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reservations List */}
        <div className="lg:col-span-2 space-y-4">
          {reservations.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No reservations found</p>
              </CardContent>
            </Card>
          ) : (
            reservations.map((reservation) => (
              <Card
                key={reservation.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedReservation?.id === reservation.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedReservation(reservation)}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{reservation.name}</h3>
                      <p className="text-sm text-muted-foreground">{reservation.email}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        reservation.status === "confirmed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : reservation.status === "cancelled"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}
                    >
                      {reservation.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {formatDate(reservation.date)}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {reservation.time}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {reservation.partySize} {reservation.partySize === 1 ? "guest" : "guests"}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      {reservation.phone}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Reservation Details */}
        <div className="lg:col-span-1">
          {selectedReservation ? (
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Reservation Details</CardTitle>
                <CardDescription>ID: {selectedReservation.id}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Guest Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Name:</span> {selectedReservation.name}
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span className="font-medium">Email:</span> {selectedReservation.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span className="font-medium">Phone:</span> {selectedReservation.phone}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Reservation Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Date:</span> {formatDate(selectedReservation.date)}
                    </p>
                    <p>
                      <span className="font-medium">Time:</span> {selectedReservation.time}
                    </p>
                    <p>
                      <span className="font-medium">Party Size:</span> {selectedReservation.partySize}{" "}
                      {selectedReservation.partySize === 1 ? "guest" : "guests"}
                    </p>
                    <p>
                      <span className="font-medium">Status:</span>{" "}
                      <span className="capitalize">{selectedReservation.status}</span>
                    </p>
                  </div>
                </div>

                {selectedReservation.specialRequests && (
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Special Requests
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedReservation.specialRequests}
                    </p>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold mb-2">Change Status</h4>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant={selectedReservation.status === "pending" ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateStatus(selectedReservation.id, "pending")}
                    >
                      Pending
                    </Button>
                    <Button
                      variant={selectedReservation.status === "confirmed" ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateStatus(selectedReservation.id, "confirmed")}
                    >
                      Confirm
                    </Button>
                    <Button
                      variant={selectedReservation.status === "cancelled" ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateStatus(selectedReservation.id, "cancelled")}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t text-xs text-muted-foreground">
                  <p>
                    Created: {formatDate(selectedReservation.createdAt)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">Select a reservation to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

