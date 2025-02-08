"use client";
import { useEffect, useState } from "react";
import { db } from "@/firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { Trash2, Pencil } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


    // Delete product
    const handleDelete = async (id) => {
      if (!confirm("Are you sure you want to delete this product?")) return;
      try {
          await deleteDoc(doc(db, "products", id));
          setProducts(prev => prev.filter(product => product.id !== id));
          toast.success("Product deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete product. Try again!");

      }
  };

  // Define Table Columns
  const columns = [
    {
      header: "Product Name",
      accessorKey: "name",
    },
    {
      header: "Price",
      accessorKey: "price",
      cell: ({ row }) => `PKR ${row.getValue("price")}`,
    },
    {
      header: "Category",
      accessorKey: "category",
    },
    {
      header: "Images",
      accessorKey: "images",
      cell: ({ row }) =>
        row.original.images ? (
          <img
            src={row.original.images[0]}
            alt="Product"
            className="w-16 h-16 object-cover rounded"
          />
        ) : (
          "No Image"
        ),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
          <div className="flex gap-2">
              <button className="text-blue-500 hover:text-blue-700">
                  <Pencil size={18} />
              </button>
              <button onClick={() => handleDelete(row.original.id)} className="text-red-500 hover:text-red-700">
                  <Trash2 size={18} />
              </button>
          </div>
      )
  }

  ];

  // Initialize TanStack Table
  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <Toaster position="top-right" />

      <h2 className="text-2xl font-semibold mb-4">All Products</h2>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="border border-gray-300 p-2">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-100">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="border border-gray-300 p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllProducts;
