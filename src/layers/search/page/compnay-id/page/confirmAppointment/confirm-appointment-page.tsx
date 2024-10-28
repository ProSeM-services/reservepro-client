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
import React from "react";
import {
  AppointmentZodSchema,
  IAppointment,
} from "@/interfaces/appointments.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { BookIcon } from "lucide-react";

export function ConfirmAppointmentPage() {
  const form = useForm<IAppointment>({
    resolver: zodResolver(AppointmentZodSchema),
    defaultValues: {},
  });

  function onSubmit(values: IAppointment) {
    console.log("SE EJECUTA EL ONSUBTIM", { values });
  }
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
                  <FormLabel>Nombre</FormLabel>
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

          <Button type="submit" className="flex items-center gap-2">
            <BookIcon className="size-4" />
            Agendar turno
          </Button>
        </form>
      </Form>
    </div>
  );
}
