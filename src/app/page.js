"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { signInWithEmailAndPassword, signOut} from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { auth } from "@/firebaseConfig";
import { useRouter } from "next/navigation";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");   
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
console.log(user);

      // Check Firestore for user role
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists() && userDoc.data().role === "Admin") {
        console.log(userDoc);
        
        toast.success("Logged in successfully!");
        router.push("/dashboard"); // Redirect to dashboard
      } else {
        await signOut(auth); // Log out non-admins
        setError("Access Denied. Only admins can log in.");
        toast.error("Access Denied. Only admins can log in.");
      }
    } catch (error) {
      setError("Invalid email or password");
      console.log(error);
      
      toast.error("Failed to log in");
    } finally {
      setLoading(false);
    }
   };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    
    <Toaster position="top-right" />

      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-primary mb-6">
          FA Traditions
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-500" size={20} />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 p-3 border rounded-md focus:ring-2 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-500" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-10 p-3 border rounded-md focus:ring-2 focus:ring-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white p-3 rounded-md hover:bg-opacity-90 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
