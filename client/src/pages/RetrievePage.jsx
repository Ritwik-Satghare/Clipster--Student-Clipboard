import React, { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function RetrievePage() {

  const [code, setCode] = useState(["", "", "", "", ""]);
  const [clipText, setClipText] = useState("");
  const [loading, setLoading] = useState(false);


  const inputsRef = useRef([]); // store references to all input boxes (so we can move focus between them)

  // --- HANDLERS ---

  /**
   * Handle typing in one OTP input box
   */
  const handleChange = (e, index) => {
    const val = e.target.value;

   // if not a digit, do nothing
    if (!/^\d*$/.test(val)) return;

    // copy current state and replace the digit at the given index
    const newCode = [...code];
    newCode[index] = val;
    setCode(newCode);

    // if a digit was entered and it's not the last box, move focus forward
    if (val && index < code.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  /**
   * Handle Backspace key to move backwards
   */
  const handleBackspace = (e, index) => {
    // if Backspace is pressed on an empty box → move focus back
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  /**
   * Handle paste (user pastes the full code in one go)
   */
  const handlePaste = (e) => {
    e.preventDefault(); // stop default paste
    const pasteData = e.clipboardData.getData("text").trim(); // get pasted text

    // only proceed if it's all digits
    if (!/^\d+$/.test(pasteData)) return;

    // split pasted digits and fit them into the code array (limit to length of code)
    const pasteArr = pasteData.split("").slice(0, code.length);
    const newCode = [...code]; // shallow copy current state (code)

    // find the last filled input box
    const lastFilled = newCode.findIndex((digit) => !digit) - 1; // index of last filled box (or -1 if all empty)
    if (lastFilled === -2) return; // all boxes are filled, nothing to do

    // fill in the pasted digits starting from the next box
    pasteArr.forEach((digit, i) => { // fill each digit into newCode starting from the first empty box
      if (lastFilled + i + 1 < newCode.length) // ensure we don't go out of bounds
      newCode[lastFilled+i+1] = digit;
    });

    setCode(newCode);

    // focus the last filled input
    const lastIndex = pasteArr.length - 1;
    if (inputsRef.current[lastIndex]) { // defensive coding: even though we slice pasteArr to code length, just in case, we are checking if the last index exists ( its before the lenght of boxes)
      inputsRef.current[lastIndex].focus();
    }
  };

  /**
   * Copy full code to clipboard
   */
  const handleCopy = () => {
    const fullCode = code.join(""); // merge array into one string
    if (!fullCode) return;
    navigator.clipboard.writeText(fullCode); // copy to system clipboard
    toast.success("Code copied!");
  };

  /**
   * Send code to backend and retrieve the stored clip
   */
  const handleRetrieve = async () => {
    const fullCode = code.join(""); // merge array into string

    // check if user entered the full 5 digits
    if (fullCode.length !== code.length) {
      return toast.error("Enter full code");
    }

    setLoading(true);
    try {
      // GET request to backend
      const response = await axios.get(`/api/clipboard/${fullCode}`);
      const data = await response.data;

      if (data.success) {
        // success → show retrieved text
        setClipText(data.Clipboard.text);
        toast.success("Clip retrieved successfully!");
      } else {
        // invalid code
        setClipText("");
        toast.error("Invalid code");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error retrieving clip.");
    }
    setLoading(false);
  };

  // --- UI ---
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-800 max-w-4xl mx-auto flex flex-col items-center rounded-2xl shadow-xl">
      {/* --- Header --- */}
      <h2 className="text-4xl font-extrabold text-center text-red-400 mb-8">
        Retrieve a Clip
      </h2>

      {/* --- OTP Inputs --- */}
      <div
        className="flex justify-center gap-4 mb-4"
        onPaste={handlePaste} // allow paste into the whole container
      >
        {code.map((digit, idx) => (
          <motion.input
            key={idx}
            type="text"
            maxLength={1} // only 1 digit per box
            value={digit}
            ref={(el) => (inputsRef.current[idx] = el)} // save reference for focus control
            onChange={(e) => handleChange(e, idx)}
            onKeyDown={(e) => handleBackspace(e, idx)}
            animate={{ scale: digit ? 1.2 : 1 }} // bounce animation when filled
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="w-14 h-14 text-center text-2xl font-bold rounded-lg
              border border-gray-600 dark:border-gray-400
              focus:border-lime-500 focus:ring-2 focus:ring-lime-300
              outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white
              transition-all duration-200 hover:scale-105"
          />
        ))}
      </div>

      {/* --- Copy Button --- */}
      {/* <button
        onClick={handleCopy}
        className="px-5 py-2 mb-6 rounded-lg text-sm font-medium text-white bg-blue-500 
          hover:bg-blue-600 transition"
      >
        Copy Code
      </button> */}

      {/* --- Retrieve Button --- */}
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

      {/* --- Retrieved Clip Display --- */}
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
