import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SharePage() {
  const [clipText, setClipText] = useState("");
  const [focused, setFocused] = useState(false);
  const [code, setCode] = useState("");
  const [expiry, setExpiry] = useState("never");
  const [loading, setLoading] = useState(false); // to manage loading state

  const handleSend = async () => {
    if (!clipText.trim())
      return toast.error("Please enter some text to share.");

    setLoading(true); // Start loading

    try {
      const response = await axios.post("/api/clipboard", {
        text: clipText,
        ownerName: "Ritwik",
      }); // ownerName is hardcoded for now

      //with axios the response is wrapped in a data object
      const data = await response.data;

      if (data.success) {
        setCode(data.Clipboard.code);
        setExpiry(data.Clipboard.expiryTimestamp);
        setClipText("");
        toast.success("Clip created successfully!");
        console.log("Clip created with code:", data.Clipboard.code); // Log the code for debugging
      } else {
        toast.error("Failed to create clip. Please try again.");
        console.error("Unexpected response:", data); // Log the unexpected response for debugging when no error
      }
    } catch (error) {
      console.error("Error creating clip:", error); // Log the backend error for 404 or other server errors
      toast.error("An error occurred while creating the clip.");
    }
    setLoading(false); // End loading
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-800 max-w-4xl mx-auto flex flex-col items-center rounded-2xl shadow-xl">
      {/* Header */}
      <h2 className="text-4xl font-extrabold text-center text-red-400 mb-8">
        Share a Clip
      </h2>

      {/* Textarea */}
      <textarea
        value={clipText}
        onChange={(e) => setClipText(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Type or paste your text here..."
        className={`
          w-full max-w-3xl p-4 rounded-2xl border border-gray-600
          outline-none resize-none transition-all duration-300
          ${
            focused
              ? "h-64 focus:border-lime-500 focus:ring-2 focus:ring-lime-300"
              : "h-40"
          }
          text-lg dark:bg-gray-700 dark:text-white
        `}
      />

      {/* Send Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleSend}
          disabled={loading} // Disable button when loading
          className="px-10 py-3 rounded-2xl font-bold text-purple-500 bg-gray-800 shadow-md
            transform transition-all duration-300
            hover:bg-purple-500 hover:text-white hover:scale-105
            active:bg-purple-600 active:text-white active:scale-95 text-xl
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>

      {/* Info Text */}
      <p className="text-center text-gray-500 text-lg mt-4 max-w-xl">
        Your text can be retrieved using the generated code. Clips expire in 3
        minutes.
      </p>

      {/* Generated Code Display */}
      {code && (
        <div
          className="mt-8 w-full max-w-md p-6 rounded-2xl shadow-lg 
          bg-white dark:bg-gray-700 flex flex-col items-center transition-all duration-300"
        >
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Your Clip Code
          </h3>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold tracking-widest text-purple-600 dark:text-lime-400">
              {code}
            </span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(code);
                toast.success("Code copied to clipboard!");
              }}
              className="px-3 py-1 rounded-lg bg-purple-500 text-white font-medium 
                hover:bg-purple-600 active:scale-95 transition-transform"
            >
              Copy
            </button>
          </div>

          <p className="mt-3 text-sm text-gray-500 dark:text-gray-300">
            Expires at:{" "}
            <span className="font-medium">
              {expiry === "never"
                ? "Never"
                : new Date(expiry).toLocaleTimeString()}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
