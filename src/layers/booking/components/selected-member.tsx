"use client";
import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import { motion } from "framer-motion";
export function SelectedMember() {
  const {
    bookingData: { member },
  } = useAppSelector((s) => s.booking);

  if (!member) return null;
  return (
    <div>
      <motion.div
        key={member.id}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="p-2  flex items-center gap-2 border rounded-xl select-none  w-full "
      >
        <div className="relative size-14 aspect-square ">
          <Image
            src={member.image ? member.image : "/avatars/avatar.webp"}
            fill
            alt={member.name}
            className="shadow-md rounded-full object-cover border border-border cursor-pointer transition-all duration-150 hover:scale-105"
          />
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [1.2, 1] }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center gap-2"
        >
          <p>{member.name}</p>
          <p> {member.lastName}</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
