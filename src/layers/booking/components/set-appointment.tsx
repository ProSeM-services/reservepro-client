"use client";
import { Button } from "@/components/ui/button";
import { setStep } from "@/store/feature/booking/bookingSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function SetAppointment() {
  const {
    bookingData: { companyId, date, duration, member, service, time },
    step,
  } = useAppSelector((s) => s.booking);
  const dispatch = useAppDispatch();

  const ableToSet = member && time && service && date && companyId;
  const handleSetTurno = () => {
    if (!ableToSet) return;
    dispatch(setStep("forward"));
  };

  return (
    <div className={`${step > 2 ? "hidden" : ""}`}>
      <Button className="w-full" disabled={!ableToSet} onClick={handleSetTurno}>
        Agendar turno
      </Button>
    </div>
  );
}
