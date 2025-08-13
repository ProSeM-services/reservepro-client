"use client";

import { formatDuration } from "@/lib/formatDuration";
import { useAppSelector } from "@/store/hooks";
import { motion } from "framer-motion";
export function SelectedServiceDetails() {
  const {
    bookingData: { service },
  } = useAppSelector((s) => s.booking);

  if (!service) return null;
  return (
    <div className="">
      <motion.div
        key={service.id}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="space-y-1 p-2 text-gray-600 text-sm "
      >
        <div className=" flex justify-between font-semibold">
          <p>{service.title}</p>
          <p>$ {service.price}</p>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [1.2, 1] }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-gray-400">{formatDuration(service.duration)}</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
