import React, { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function RetrievePage() {
  const [code, setCode] = useState(["", "", "", "", ""]); // for 5-digit code
  const [clipText, setClipText] = useState("");
  const [loading, setLoading] = useState(false);

  const inputsRef = useRef([]);

  // Handle input change for OTP-style fields
  const handleChange = (e, index) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val)) return; // allow only numbers
    const newCode = [...code];
    newCode[index] = val;
    setCode(newCode);

    // move focus to next input
    if (val && index < code.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleRetrieve = async () => {
    const fullCode = code.join("");
    if (fullCode.length !== code.length) return toast.error("Enter full code");

    setLoading(true);
    try {
      const response = await axios.get(`/api/clipboard/${fullCode}`);
      const data = await response.data;

      if (data.success) {
        setClipText(data.Clipboard.text);
        toast.success("Clip retrieved successfully!");
      } else {
        setClipText("");
        toast.error("Invalid code");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error retrieving clip.");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-800 max-w-4xl mx-auto flex flex-col items-center rounded-2xl shadow-xl">
      {/* Header */}
      <h2 className="text-4xl font-extrabold text-center text-red-400 mb-8">
        Retrieve a Clip
      </h2>

      {/* OTP Inputs */}
      <div className="flex justify-center gap-4 mb-8">
        {code.map((digit, idx) => (
          <motion.input
            key={idx}
            type="text"
            maxLength={1}
            value={digit}
            ref={(el) => (inputsRef.current[idx] = el)}
            onChange={(e) => handleChange(e, idx)}
            onKeyDown={(e) => handleBackspace(e, idx)}
            animate={{ scale: digit ? 1.2 : 1 }} // bounce when filled
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="w-14 h-14 text-center text-2xl font-bold rounded-lg
              border border-gray-600 dark:border-gray-400
              focus:border-lime-500 focus:ring-2 focus:ring-lime-300
              outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white
              transition-all duration-200 hover:scale-105"
          />
        ))}
      </div>

      {/* Retrieve Button */}
      <button
        onClick={handleRetrieve}
        disabled={loading}
        className="px-10 py-3 rounded-2xl font-bold text-purple-500 bg-gray-800 shadow-md
          transform transition-all duration-300
          hover:bg-purple-500 hover:text-white hover:scale-105
          active:bg-purple-600 active:text-white active:scale-95 text-xl
          disabled:opacity-50 disabled:cursor-not-allowed mb-6"
      >
        {loading ? "Retrieving..." : "Retrieve"}
      </button>

      {/* Display Retrieved Clip */}
      <AnimatePresence>
        {clipText && (
          <motion.div
            key={clipText}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-3xl p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
              Here's your clip:
            </h3>
            <textarea
              value={clipText}
              readOnly
              rows={6}
              className="w-full p-4 rounded-xl border border-gray-600 dark:border-gray-400
                outline-none resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                text-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
