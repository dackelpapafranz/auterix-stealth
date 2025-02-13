import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function StealthLanding() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      console.log("Email submitted:", email);
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-black text-white overflow-hidden">
      {/* Moving Background Elements */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            width: `${Math.random() * 5 + 2}px`,
            height: `${Math.random() * 5 + 2}px`,
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`,
            opacity: Math.random() * 0.8 + 0.2,
          }}
          animate={{
            y: ["0vh", "100vh"],
            opacity: [1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      
      <div className="bg-gray-900 p-6 rounded-2xl shadow-xl w-96 text-center relative z-10">
        <motion.h1
          className="text-2xl font-bold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Something Big is Coming
        </motion.h1>
        <p className="mt-2 text-gray-400">Be the first to know.</p>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="mt-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="mt-3 w-full bg-blue-600 hover:bg-blue-700 p-2 rounded">
              Notify Me
            </button>
          </form>
        ) : (
          <p className="mt-4 text-green-500">Thank you! You'll be the first to know.</p>
        )}
      </div>
    </div>
  );
}
