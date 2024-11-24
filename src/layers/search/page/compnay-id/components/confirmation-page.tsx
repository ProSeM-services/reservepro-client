"use client";

import { CheckIcon, HomeIcon } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ConfirmationPage() {
  const { push } = useRouter();
  return (
    <div className="rounded-md h-full w-full flex justify-center items-center text-card-foreground">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-xl flex flex-col items-center bg-card text-card-foreground p-6   size-full rounded  justify-center "
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [1.2, 1] }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <CheckIcon className="size-16 text-green-500" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-4 font-semibold uppercase"
        >
          Turno Confirmado
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-1 font-light text-sm"
        >
          Muchas gracias!
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-4 font-light text-sm underline   "
          onClick={() => push("/")}
        >
          <span>volver</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
