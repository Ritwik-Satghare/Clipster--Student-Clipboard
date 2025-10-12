import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function AboutModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* About Button */}
      <button
        className="text-white font-bold hover:text-red-400 transition-transform duration-300 hover:scale-110 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        About
      </button>

      {/* Modal */}
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative text-white rounded-3xl p-8 w-11/12 md:w-2/3 lg:w-1/2 shadow-2xl border border-red-500/40 
                  bg-white/10 backdrop-blur-xl backdrop-saturate-150"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {/* Header */}
                <h2 className="text-3xl font-bold mb-5 text-center text-red-400">
                  About Clipster
                </h2>

                {/* Journey + Tech */}
                <p className="mb-4 text-gray-200 text-center leading-relaxed">
                  Clipster began as a project for the DJS Unicode Committee, evolving from a simple task into a full-featured web app for fast, clean, and intuitive text sharing. It showcases my journey of learning and experimenting to create something practical and user-friendly.
                </p>

                <p className="mb-6 text-gray-200 text-center leading-relaxed">
                  The app is built using React for the frontend, Tailwind CSS for styling, Framer Motion for smooth animations, and Node.js with Express and MongoDB on the backend. Axios handles API requests, while React Hot Toast provides notifications, creating a modern, responsive, and interactive experience.
                </p>

                {/* Footer / Creator */}
                <p className="text-gray-400 text-center mt-4 text-sm italic">
                  Created by <span className="text-lime-400 font-semibold">Ritwik Satghare</span>
                </p>

                {/* Close Button */}
                <div className="flex justify-center mt-6">
                  <motion.button
                    className="px-6 py-2 bg-red-500 rounded-full font-bold text-white hover:bg-red-600 transition-transform duration-200 hover:scale-105 cursor-pointer"
                    onClick={() => setOpen(false)}
                    whileTap={{ scale: 0.9 }}
                  >
                    Close
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
