"use client";

import { XCircleIcon, HomeIcon } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { setStep } from "@/store/feature/booking/bookingSlice";

export default function RejectionPage() {
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  return (
    <div className="rounded-md h-full w-full flex justify-center items-center text-card-foreground">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-xl flex flex-col items-center bg-card text-card-foreground p-6 size-full rounded justify-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [1.2, 1] }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <XCircleIcon className="size-16 text-red-500" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-4 font-semibold uppercase"
        >
          Error al Agendar
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-1 font-light text-sm"
        >
          Hubo un problema al agendar el turno. Por favor, inténtalo nuevamente.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-4 font-light text-sm underline"
          onClick={() => dispatch(setStep("back"))}
        >
          <span>volver</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
