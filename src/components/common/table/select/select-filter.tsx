"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { TableType } from "@/interfaces";
import { getMembers } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";
import { LoaderSpinner } from "../../loader-spinner";
interface ISelectFilter {
  tableType?: TableType;
  onValueChange: (value: string) => void;
  value?: string;
}
export function SelectFilter({
  onValueChange,
  tableType,
  value,
}: ISelectFilter) {
  const { data, isLoading } = useQuery({
    queryKey: ["members"],
    queryFn: getMembers,
  });

  if (isLoading) {
    return (
      <div>
        <LoaderSpinner />
      </div>
    );
  }

  if (data) {
    return (
      <Select onValueChange={(value) => onValueChange(value)}>
        <SelectTrigger className=" bg-white  text-xs ">
          <SelectValue placeholder="Filter by Profesional" />
        </SelectTrigger>
        <SelectContent className="bg-white text-xs">
          <SelectGroup>
            <SelectLabel className="px-2 py-1 font-semibold">
              Categories
            </SelectLabel>
            <SelectItem value="all">All</SelectItem>
            {data.map((t) => (
              <SelectItem value={t.id} key={t.id}>
                {t.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }
}
