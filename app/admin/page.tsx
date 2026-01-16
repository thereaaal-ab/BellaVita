"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";

// Simple mock authentication - in production, use proper auth (NextAuth, Clerk, etc.)
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Fix hydration error by checking localStorage only after mount
  useEffect(() => {
    setMounted(true);
    const authStatus = localStorage.getItem("admin-auth") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("admin-auth", "true");
      toast.success("Login successful");
    } else {
      toast.error("Invalid password");
    }

    setLoading(false);
  };

  // Show loading state during hydration
  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-md">
        <Card>
          <CardContent className="p-6 text-center">
            <p>Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-md">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <Lock className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-center">Admin Login</CardTitle>
            <CardDescription className="text-center">
              Enter password to access admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Default password: admin123 (change in production)
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-8">
        <h1 className="text-4xl font-display font-bold mb-4">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage restaurant reservations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Reservations</CardTitle>
            <CardDescription>View and manage all reservations</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full border">
              <Link href="/admin/reservations">View All Reservations</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Button
          variant="outline"
          className="border"
          onClick={() => {
            localStorage.removeItem("admin-auth");
            setIsAuthenticated(false);
            router.push("/");
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

