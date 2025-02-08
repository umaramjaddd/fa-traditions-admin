"use client";
import Link from "next/link";
import { PackagePlus, Boxes } from "lucide-react";

export default function Home() {
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

      </div>
    </div>
  );
}
