"use client";
import { getCompnayServices } from "@/lib/clienta-actions";
import React, { useEffect, useState } from "react";
import { formatDuration } from "@/lib/formatDuration";
import { useSearchParams } from "next/navigation";
import { IService } from "@/interfaces";
import LoaderWrapper from "@/components/common/loadingWrappers/loader-wrapper";
import { SelectService } from "./select-services";
import { useAppDispatch } from "@/store/hooks";
import { setBookinData } from "@/store/feature/booking/bookingSlice";
import { Label } from "@/components/ui/label";

export default function SercvicesList({
  readonly = true,
}: {
  readonly?: boolean;
}) {
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const companyId = searchParams.get("company");
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!companyId) return;
    const fetch = async () => {
      setLoading(true);
      const res = await getCompnayServices(companyId);
      dispatch(setBookinData({ key: "companyId", value: companyId }));
      setServices(res);
      setLoading(false);
    };
    fetch();
  }, [companyId]);

  return (
    <div className="h-full">
      <Label>Seleccionar servicio</Label>
      <LoaderWrapper loading={loading} type="services">
        <div className="space-y-4 w-full h-full  ">
          {services.length
            ? [
                ...services,
                ...services,
                ...services,
                ...services,
                ...services,
                ...services,
              ].map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between border border-border rounded-lg p-4 cursor-pointer "
                >
                  <div className="space-y-2">
                    <strong>{service.title}</strong>
                    <p className="text-gray-400">
                      {formatDuration(service.duration)}
                    </p>
                    <p>$ {service.price}</p>
                  </div>
                  {!readonly && <SelectService service={service} />}
                </div>
              ))
            : !loading && (
                <div className="bg-muted p-6 h-full rounded-lg flex flex-col justify-center items-center gap-2 text-gray-800 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
                    />
                  </svg>

                  <p className="font-semibold">No data</p>
                </div>
              )}
        </div>
      </LoaderWrapper>
    </div>
  );
}
