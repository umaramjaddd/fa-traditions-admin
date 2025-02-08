"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ProductCategory } from "@/utils/enums";
import { db } from "@/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const AddProduct = () => {    
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    
    const [loading, setLoading] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);

    // Handle Image Upload
    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.map(file => URL.createObjectURL(file)); // Create preview URLs
        setSelectedImages(prev => [...prev, ...newImages]); // Add to state
    };
    // Remove Image
    const removeImage = (index) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index));
    };

    const onSubmit = async (data) => {
 if (selectedImages.length==0) {
    alert("Please select at least one image");
    return;
 } 
 
        setLoading(true);
        try {
            const docRef = await addDoc(collection(db, "products"), {
                name: data.name,
                price: Number(data.price),
                category: data.category,
                // image: data.image, // Image field added
                images: selectedImages, // Store selected images
                createdAt: new Date(),
            });

            console.log("Document written with ID: ", docRef.id);
            toast.success("Product deleted successfully!");
            reset(); // Reset form after successful submission
            setSelectedImages([]);
            setTimeout(() => {
                router.push("allproducts");
            }, 1000);

        } catch (error) {
            console.error("Error Adding Document", error);
            toast.error("Failed to add product. Try again!");
       
        }
        finally{
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
        <Toaster position="top-right" />
            <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
                {/* Product Name */}
                <div>
                    <label className="block font-medium">Product Name</label>
                    <input
                        {...register("name", { required: "Product name is required" })}
                        className="w-full p-2 border rounded"
                        placeholder="Enter product name"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                {/* Price */}
                <div>
                    <label className="block font-medium">Price</label>
                    <input
                        type="number"
                        {...register("price", { required: "Price is required", valueAsNumber: true })}
                        className="w-full p-2 border rounded"
                        placeholder="Enter price"
                    />
                    {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                </div>

                {/* Category */}
                <div>
                    <label className="block font-medium">Category</label>
                    <select {...register("category", { required: "Category is required" })} className="w-full p-2 border rounded">
                        {Object.values(ProductCategory).map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                </div>

                {/* Multiple Image Upload */}
                <div>
                    <label className="block font-medium">Upload Images</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Image Preview */}
                {selectedImages.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {selectedImages.map((image, index) => (
                            <div key={index} className="relative w-20 h-20">
                                <img src={image} alt="Selected" className="w-full h-full object-cover rounded-md" />
                                <button
                                    type="button"
                                    className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1"
                                    onClick={() => removeImage(index)}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Submit Button */}
                <button type="submit" disabled={loading} className="w-full bg-primary text-white p-2 rounded">
                    {loading? "Adding Product...." : "Add Product"}
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
