// "use client";
// import { useState } from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth, db } from "@/firebaseConfig"; // Import Firestore
// import { collection, doc, setDoc } from "firebase/firestore";
// import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
// import { useRouter } from "next/navigation";

// export default function SignupPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const router = useRouter();

//   const togglePassword = () => setShowPassword(!showPassword);

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       // Create user in Firebase Authentication
//       const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
//       const user = userCredential.user;

//       // Save user details in Firestore under "users" collection
//       await setDoc(doc(collection(db, "users"), user.uid), {
//         uid: user.uid,
//         name: formData.name,
//         email: formData.email,
//         createdAt: new Date(),
//       });

//       router.push("/dashboard"); // Redirect after successful signup
//     } catch (error) {
//       setError("Signup failed! Email may already be in use.");
//       console.error("Signup error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
//       <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
//         <h2 className="text-3xl font-bold text-center mb-6 text-primary">Create Account</h2>
        
//         {error && <p className="text-red-500 text-center">{error}</p>}

//         <form onSubmit={handleSignup} className="space-y-4">
//           {/* Name Input */}
//           <div className="relative">
//             <User className="absolute left-3 top-3 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Enter full name"
//               className="w-full p-3 pl-10 border rounded focus:ring-2 focus:ring-primary"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               required
//             />
//           </div>

//           {/* Email Input */}
//           <div className="relative">
//             <Mail className="absolute left-3 top-3 text-gray-400" />
//             <input
//               type="email"
//               placeholder="Enter email"
//               className="w-full p-3 pl-10 border rounded focus:ring-2 focus:ring-primary"
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//               required
//             />
//           </div>

//           {/* Password Input with Eye Icon */}
//           <div className="relative">
//             <Lock className="absolute left-3 top-3 text-gray-400" />
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Create a password"
//               className="w-full p-3 pl-10 pr-10 border rounded focus:ring-2 focus:ring-primary"
//               value={formData.password}
//               onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//               required
//             />
//             {showPassword ? (
//               <EyeOff className="absolute right-3 top-3 text-gray-400 cursor-pointer" onClick={togglePassword} />
//             ) : (
//               <Eye className="absolute right-3 top-3 text-gray-400 cursor-pointer" onClick={togglePassword} />
//             )}
//           </div>

//           {/* Submit Button */}
//           <button type="submit" disabled={loading} className="w-full bg-primary text-white p-3 rounded hover:bg-opacity-90">
//             {loading ? "Signing up..." : "Sign Up"}
//           </button>
//         </form>

//         {/* Already have an account? */}
//         <p className="text-center mt-4 text-gray-600">
//           Already have an account? <a href="/login" className="text-primary font-semibold">Login</a>
//         </p>
//       </div>
//     </div>
//   );
// }
