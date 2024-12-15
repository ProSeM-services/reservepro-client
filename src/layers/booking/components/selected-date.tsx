"use client";

import { useAppSelector } from "@/store/hooks";
import { motion } from "framer-motion";
export function SelectedDate() {
  const {
    bookingData: { date },
  } = useAppSelector((s) => s.booking);

  if (!date) return null;
  return (
    <motion.div
      key={date}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex w-full p-2 text-gray-600 justify-between items-center"
    >
      <p>Dia</p>
      <p>{new Date(date).toLocaleDateString()} hs</p>
    </motion.div>
  );
}
