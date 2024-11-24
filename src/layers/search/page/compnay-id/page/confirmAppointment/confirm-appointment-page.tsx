"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import {
  ClientDataSchema,
  IClientData,
  ICreateAppointment,
} from "@/interfaces/appointments.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { BookIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AppointmentServices } from "@/services/appointment.services";

export function ClientFormAppointmentPage() {
  const params = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const [appointmentData, setAppointmentData] = useState({
    date: params.get("date"),
    ServiceId: params.get("service"),
    UserId: params.get("member"),
    time: params.get("time"),
  });
  const [loading, setLoading] = useState(false);
  const form = useForm<IClientData>({
    resolver: zodResolver(ClientDataSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      lastName: "",
      phone: "",
    },
  });

  useEffect(() => {
    Array.from(params.keys()).forEach((e) => {
      if (e === "service") {
        setAppointmentData((s) => ({
          ...s,
          ServiceId: params.get(e),
        }));
      } else if (e === "member") {
        setAppointmentData((s) => ({ ...s, UserId: params.get(e) }));
      } else {
        setAppointmentData((s) => ({ ...s, [e]: params.get(e) }));
      }
    });
  }, [params]);
  const onSubmit = async (clientData: IClientData) => {
    if (
      !appointmentData.date ||
      !appointmentData.ServiceId ||
      !appointmentData.UserId ||
      !appointmentData.time
    )
      return;

    const data: ICreateAppointment = {
      name: clientData.name,
      lastName: clientData.lastName,
      email: clientData.email,
      phone: clientData.phone,
      date: appointmentData.date,
      ServiceId: appointmentData.ServiceId,
      UserId: appointmentData.UserId,
      time: appointmentData.time,
    };

    try {
      setLoading(true);
      const res = await AppointmentServices.createAppointment(data);
      if (res.data.status === 401) throw new Error(res.data.message);
      push(`${pathname}/confirmation?${params.toString()}`);
    } catch (error) {
      console.error("Error creating appointment: ", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-full p-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-between h-full"
        >
          <section className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input placeholder="Apellido" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Celular</FormLabel>
                  <FormControl>
                    <Input placeholder="Celular" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@mail.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    El valor de este mail es importat
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          <Button
            type="submit"
            className="flex items-center gap-2"
            isLoading={loading}
            disabled={loading}
          >
            <BookIcon className="size-4" />
            Agendar turno
          </Button>
        </form>
      </Form>
    </div>
  );
}
