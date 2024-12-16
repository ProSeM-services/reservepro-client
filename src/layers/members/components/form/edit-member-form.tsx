"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  CreateMemberZodSchema,
  ICreateMember,
  IMember,
  IUpdateMember,
  MemberZodSchema,
  ROLES_VALUES,
  UpdateMemberZodSchema,
} from "@/interfaces/member.iterface";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BaselineIcon,
  Paperclip,
  ShieldCheck,
  UserIcon,
  XIcon,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import useCreatingFetch from "@/app/hooks/useCreatingFetch";
import useFetchData from "@/app/hooks/useFetchData";
import Image from "next/image";
import { FilesServices } from "@/services/files.services";

export function EditMemberForm({ member }: { member: IMember }) {
  const { toast } = useToast();
  const { editMember } = useCreatingFetch();
  const { fetchMembers } = useFetchData();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    member.image ? member.image : null
  );
  const [loading, setLoading] = useState(false);
  const form = useForm<IUpdateMember>({
    resolver: zodResolver(UpdateMemberZodSchema),
    // mode: "onChange",
    defaultValues: member,
  });
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;

    setFile(selectedFile);
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = () => setPreview(fileReader.result as string);
      fileReader.readAsDataURL(selectedFile); // Convierte la imagen a Base64 para previsualización
    } else {
      setPreview(null);
    }
  };
  const handleResetImageFile = () => {
    setPreview(member.image ? member.image : null);
    setFile(null);
  };
  const onSubmit = async (values: IUpdateMember) => {
    // const values = form.getValues();
    try {
      setLoading(true);
      let data = values;
      if (file) {
        const imageData = await FilesServices.upload(file);
        data = { ...values, image: imageData.url };
      }
      await editMember(member.id, data);
      await fetchMembers();
      toast({
        title: "Miembro actualizado!",
        description: `Se actualizaron los datos de ${values.name} ${values.lastName}  `,
        variant: "default",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error al editar un miembro!",
        variant: "destructive",
      });
      console.log("Error creating Member, ", error);
    } finally {
      setLoading(false);
    }
  };
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 text-left  h-full max-h-full overflow-auto"
      >
        <section className=" space-y-3">
          <div className="flex flex-col ">
            <p className="font-medium">Informacion de accesso</p>
            <span className="font-light">
              {" "}
              Definir las claves de accesso para {form.getValues("name")}{" "}
              {form.getValues("lastName")}
            </span>
          </div>

          <section>
            <div className="w-full  flex justify-center">
              {preview ? (
                <>
                  <Image
                    src={preview}
                    alt="Vista previa"
                    width={250}
                    height={250}
                    className="rounded-full aspect-square object-cover"
                  />
                  {preview !== member.image && (
                    <Button
                      type="button"
                      variant={"secondary"}
                      size={"sm"}
                      onClick={handleResetImageFile}
                    >
                      <XIcon className="size-4" />
                    </Button>
                  )}
                </>
              ) : (
                <UserIcon className="size-[250px] aspect-square " />
              )}
            </div>

            <FormLabel>Seleccionar una imagen</FormLabel>
            <>
              <Button
                onClick={handleButtonClick}
                variant={"ghost"}
                type="button"
              >
                <Paperclip className="size-4 text-primary" />
              </Button>
              <Input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </>

            <FormMessage />
          </section>
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@mail.com"
                    {...field}
                  />
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
                <FormLabel>Núemro de celular</FormLabel>
                <FormControl>
                  <PhoneInput {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rol</FormLabel>
                <FormControl>
                  <Select value={field.value}>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLES_VALUES.map((role) => (
                        <SelectItem value={role} key={role}>
                          <div className="flex gap-1 items-center">
                            {role === "ADMIN" ? (
                              <ShieldCheck />
                            ) : (
                              <BaselineIcon />
                            )}
                            {role}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <section className="absolute bottom-0 right-0 p-2 w-full">
          <div className="flex gap-2 ">
            <Button type="button" variant={"outline"} className="w-1/4">
              Cancelar
            </Button>
            <Button
              type="submit"
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
