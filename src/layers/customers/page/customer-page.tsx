"use client";
import { BarLoader } from "@/components/common/bar-loader";
import { ICustomer } from "@/interfaces/customer.interface";
import CustomerTable from "@/layers/customers/components/customers-table";
import { getCustomers } from "@/lib/actions";
import { UserSearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

export function CustomersPages() {
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [loading, setLoading] = useState(false);

  // const customers = getCustomers();

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const res = await getCustomers();
        setCustomers(res);
      } catch (error) {
        console.error("Error fetching customers ==>", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);
  console.log("CUSTOMERS!", customers);

  if (loading)
    return (
      <div className="relative h-full">
        <BarLoader />
        <div className=" p-10 h-full w-full flex flex-col gap-4 justify-center items-center">
          <UserSearchIcon className="size-10" />
          Cargando clientes...
        </div>
      </div>
    );
  return (
    <div>
      <div className="flex justify-between items-center p-2">
        <h2 className="font-bold">Clientes</h2>
      </div>
      <hr />
      <div className="flex flex-col gap-0 p-4 max-md:p-1">
        <CustomerTable customers={customers} />
      </div>
    </div>
  );
}
