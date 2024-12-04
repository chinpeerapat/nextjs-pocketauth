import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to Our App</h1>
        <p className="text-gray-600">Get started by signing in or creating a new account.</p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/auth/login">Sign In</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/auth/signup">Create Account</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}