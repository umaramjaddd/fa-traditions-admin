"use client";
import Link from "next/link";
import { PackagePlus, Boxes } from "lucide-react";
import { signOut } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { auth } from "@/firebaseConfig";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      router.push("/"); // Redirect to login page
    } catch (error) {
      toast.error("Error signing out");
      console.error("Sign out error:", error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        
        {/* Add Product Card */}
        <Link href="/addproduct">
          <div className="group bg-white shadow-lg rounded-xl p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer">
            <PackagePlus className="w-16 h-16 text-primary mb-4 group-hover:rotate-6 transition-transform" />
            <h2 className="text-xl font-semibold text-gray-800">Add Product</h2>
            <p className="text-gray-600 text-sm text-center mt-2">
              Add new products with details and images.
            </p>
          </div>
        </Link>

        {/* All Products Card */}
        <Link href="/allproducts">
          <div className="group bg-white shadow-lg rounded-xl p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer">
            <Boxes className="w-16 h-16 text-green-600 mb-4 group-hover:rotate-6 transition-transform" />
            <h2 className="text-xl font-semibold text-gray-800">All Products</h2>
            <p className="text-gray-600 text-sm text-center mt-2">
              View and manage all listed products.
            </p>
          </div>
        </Link>
        <button 
        onClick={handleSignOut} 
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Sign Out
      </button>
      </div>
    </div>
  );
}
