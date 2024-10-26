import { BookingPage } from "@/layers/search/page/compnay-id/page";
import React from "react";

export default function page({ params }: { params: { id: string } }) {
  return <BookingPage params={params} />;
}
