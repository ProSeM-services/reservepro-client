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
import { TableColumnFilterType, TableType } from "@/interfaces";
import { getCustomers, getMembers } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";
import { LoaderSpinner } from "../../loader-spinner";
interface ISelectFilter {
  tableType?: TableType;
  onValueChange: (value: string) => void;
  value?: string;
  filterType?: TableColumnFilterType;
}
const SelctMembers = ({ filterType, onValueChange }: ISelectFilter) => {
  const { data, isLoading } = useQuery({
    queryKey: [filterType],
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
              Profesionales
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
};

const SelectCustomer = ({ filterType, onValueChange }: ISelectFilter) => {
  const { data, isLoading } = useQuery({
    queryKey: [filterType],
    queryFn: getCustomers,
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
          <SelectValue placeholder="Filtrar por email" />
        </SelectTrigger>
        <SelectContent className="bg-white text-xs">
          <SelectGroup>
            <SelectLabel className="px-2 py-1 font-semibold">
              Clientes
            </SelectLabel>
            <SelectItem value="all">All</SelectItem>
            {data.map((t) => (
              <SelectItem value={t.email} key={t.id}>
                {t.email}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }
};

export function SelectFilter({
  onValueChange,
  tableType,
  value,
  filterType = "members",
}: ISelectFilter) {
  if (filterType === "members") {
    return (
      <SelctMembers onValueChange={onValueChange} filterType={filterType} />
    );
  }

  if (filterType === "customers") {
    return (
      <SelectCustomer onValueChange={onValueChange} filterType={filterType} />
    );
  }

  return <></>;
}
