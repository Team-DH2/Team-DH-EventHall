"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface AuthFormProps {
  view: "login" | "signup";
  onViewChange: (view: "login" | "signup") => void;
}

export const AuthForm = ({ view, onViewChange }: AuthFormProps) => {
  const isLoginView = view === "login";

  // ✅ State for all input fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoginView) {
      const result = await fetch("/api/logIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await result.json();

      console.log("Logging in with:", { email, password });
    } else {
      const result = await fetch("/api/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, email, password }),
      });

      console.log("Signing up with:", { name, phone, email, password });
      const data = await result.json();
    }

    // You can integrate Clerk or any auth API here
  };

  return (
    <div className="w-full max-w-md rounded-2xl shadow-lg overflow-hidden bg-">
      <div className="p-8 text-white">
        <h2 className="text-3xl font-bold mb-8 text-center">
          {isLoginView ? "Welcome Back" : "Create Account"}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLoginView && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="shadow appearance-none border border-white/20 rounded w-full py-3 px-4
             bg-black/20 text-white placeholder:text-gray-300 leading-tight
             focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your Phone Number"
                  className="shadow appearance-none border border-white/20 rounded w-full py-3 px-4
             bg-black/20 text-white placeholder:text-gray-300 leading-tight
             focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
            </>
          )}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              {isLoginView ? "Email or Phone Number" : "Email"}
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="shadow appearance-none border border-white/20 rounded w-full py-3 px-4
             bg-black/20 text-white placeholder:text-gray-300 leading-tight
             focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="shadow appearance-none border border-white/20 rounded w-full py-3 px-4
             bg-black/20 text-white placeholder:text-gray-300 leading-tight
             focus:outline-none focus:shadow-outline"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full"
          >
            {isLoginView ? "Log In" : "Sign Up"}
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-sm">
            {isLoginView
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => onViewChange(isLoginView ? "signup" : "login")}
              className="font-bold text-blue-400 hover:text-blue-300 bg-transparent border-none"
            >
              {isLoginView ? "Sign Up" : "Log In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
