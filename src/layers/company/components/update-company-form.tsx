"use client";
import {
  CompanyZodSchema,
  CreateCompanyZodSchema,
  ICompany,
  ICreateCompany,
} from "@/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Category, CATEGORY_VALUES } from "@/interfaces/categeory.interface";

import { useToast } from "@/components/ui/use-toast";
import useCreatingFetch from "@/app/hooks/useCreatingFetch";
import { CategoryCard } from "@/layers/dashboard/components";
import { EditAddressInput } from "./edit-address-input";
import { Location } from "@/interfaces/location.interface";
interface UpdateCompanyFormProps {
  company: ICompany;
}
export function UpdateCompanyForm({ company }: UpdateCompanyFormProps) {
  const [categoryList, setCategoryList] = useState<Category[]>(
    company.category
  );
  const [loading, setLoading] = useState(false);
  const { updateCompany } = useCreatingFetch();
  const { toast } = useToast();

  const form = useForm<Partial<ICompany>>({
    resolver: zodResolver(CompanyZodSchema),
    mode: "onChange",
    defaultValues: company,
  });

  const onSubmit = async (values: Partial<ICompany>) => {
    console.log("VALUES TO UPDATE: ", values);
    try {
      setLoading(true);
      await updateCompany(company.id, values);
      toast({
        title: "Sucursal actualizada correctamente!",
        description: `Se actualiazron los datos de ${values.name}, recargar la pagina para ver los cambios.`,
        variant: "default",
      });
      form.reset();
    } catch (error) {
      console.log("Hubo un error al crear la sucursal", error);
      toast({
        title: "Hubo un error al crear la sucursal!",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCategories = (newCategory: Category) => {
    let res = [];

    if (categoryList.includes(newCategory)) {
      res = categoryList.filter((cat) => cat !== newCategory);
    } else {
      if (categoryList.length === 3) {
        return form.setError("category", {
          message: "Sólo puedas seleccionar hasta 3 categorías.",
        });
      }
      res = [...categoryList, newCategory];
    }

    form.clearErrors("category");
    form.setValue("category", res);
    setCategoryList(res);
  };

  const handleAddressChange = (newLocation: Location) => {
    form.setValue("address", newLocation);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 text-left  h-full max-h-full overflow-auto"
      >
        <section className=" space-y-3">
          <div className="flex gap-3 items-center w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Company Name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="exapmple@email.com"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                {field.value && (
                  <>
                    <FormControl>
                      <EditAddressInput
                        location={field.value.value}
                        placeholder="exapmple@email.com"
                        handleAddressChange={handleAddressChange}
                      />
                    </FormControl>

                    <FormMessage />
                  </>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categorías</FormLabel>
                <FormDescription className="text-xs">
                  Min 1 - Max 3
                </FormDescription>

                <div className="flex w-max space-x-4 py-3 flex-wrap max-w-full gap-2">
                  {CATEGORY_VALUES.map((category) => (
                    <div
                      key={category}
                      onClick={() => handleCategories(category)}
                    >
                      <CategoryCard
                        category={category}
                        selected={categoryList.includes(category)}
                      />
                    </div>
                  ))}
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <section className="absolute bottom-0 right-0 p-2 w-full">
          <div className="flex gap-2 w-1/3 ml-auto ">
            <Button
              onClick={() => onSubmit(form.getValues())}
              className="flex-grow text-white"
              isLoading={loading}
              disabled={loading}
            >
              Actualizar
            </Button>
          </div>
        </section>
      </form>
    </Form>
  );
}
