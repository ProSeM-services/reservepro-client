import React, { Suspense } from "react";
import { BarLoader } from "@/components/common/bar-loader";
import { BoxIcon } from "lucide-react";
import { ServiceDetailsPage } from "@/layers/services/components";
import LoaderWrapper from "@/components/common/loadingWrappers/loader-wrapper";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <Suspense
      fallback={<LoaderWrapper loading type="services"></LoaderWrapper>}
    >
      <ServiceDetailsPage serviceId={params.id} />
    </Suspense>
  );
}
