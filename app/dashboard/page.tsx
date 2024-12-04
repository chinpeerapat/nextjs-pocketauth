"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth";
import { pb } from "@/lib/pocketbase";

export default function DashboardPage() {
  const router = useRouter();
  const user = pb.authStore.model;

  useEffect(() => {
    if (!pb.authStore.isValid) {
      router.push("/auth/login");
    }
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <Button onClick={handleLogout} variant="outline">
              Sign Out
            </Button>
          </div>
          <div className="space-y-4">
            <p className="text-gray-600">Welcome back, {user.name}!</p>
            <p className="text-gray-600">Email: {user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}