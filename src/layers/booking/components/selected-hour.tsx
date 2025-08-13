"use client";
import { useAppSelector } from "@/store/hooks";
import { motion } from "framer-motion";

export function SelectedHour() {
  const {
    bookingData: { time },
  } = useAppSelector((s) => s.booking);

  if (!time) return null;
  return (
    <motion.div
      key={time}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex w-full p-2 text-gray-600 justify-between items-center"
    >
      <p>Horario</p>
      <p>{time} hs</p>
    </motion.div>
  );
}
