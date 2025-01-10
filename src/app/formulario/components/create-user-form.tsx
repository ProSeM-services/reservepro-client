import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MemberServices } from "@/services/member.services";
const userShchema = z.object({
  name: z.string().min(1),
  lastName: z.string().min(1),
  img: z.string().url(),
  email: z.string().email(),
  age: z.string(),
});

type IUser = z.infer<typeof userShchema>;

const INITIAL_VALUES: IUser = {
  name: "default name",
  img: "",
  lastName: "",
  email: "",
  age: "0",
};
export function CreateUserForm() {
  const form = useForm<IUser>({
    resolver: zodResolver(userShchema),
    defaultValues: INITIAL_VALUES,
  });

  const onSubmit = (values: IUser) => {
    console.log("VALORES", values);
    alert("Datos enviados a la API!!!");
    form.reset();
  };
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-3 bg-primary p-10 w-[85vw] mx-auto"
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Edad</FormLabel>
              <FormControl>
                <Input placeholder="Edad" {...field} />
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

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="img"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagen</FormLabel>
              <FormControl>
                <Input placeholder="fotito" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">submit2</Button>
      </form>
    </Form>
  );
}
