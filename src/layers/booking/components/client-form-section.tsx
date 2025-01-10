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
import React, { useState } from "react";
import {
  ClientDataSchema,
  IClientData,
  ICreateAppointment,
} from "@/interfaces/appointments.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { BookIcon } from "lucide-react";
import { AppointmentServices } from "@/services/appointment.services";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setStep } from "@/store/feature/booking/bookingSlice";
import { Label } from "@/components/ui/label";

export function ClientFormSection() {
  const { bookingData } = useAppSelector((s) => s.booking);
  const dispatch = useAppDispatch();

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

  const onSubmit = async (clientData: IClientData) => {
    if (
      !bookingData.date ||
      !bookingData.service ||
      !bookingData.member ||
      !bookingData.time
    )
      return;

    const data: ICreateAppointment = {
      name: clientData.name,
      lastName: clientData.lastName,
      email: clientData.email,
      phone: clientData.phone,
      date: bookingData.date,
      ServiceId: bookingData.service.id,
      UserId: bookingData.member.id,
      time: bookingData.time,
    };

    try {
      setLoading(true);
      const res = await AppointmentServices.createAppointment(data);
      if (res.data.status === 401) throw new Error(res.data.message);
      dispatch(setStep("forward"));
    } catch (error) {
      console.error("Error creating appointment: ", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-full md:p-10 max-md:space-y-2 space-y-4">
      <Label className="text-[18px] mx-auto">
        Completar con sus datos personales
      </Label>
      <hr />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-between h-[90%]"
        >
          <section className="space-y-2 ">
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
