import { ICompany } from "@/interfaces";
import { getS3Url } from "@/lib/s3-image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
export function CompanyImages({ company }: { company: ICompany }) {
  return (
    <>
      <section className=" w-full flex gap-4 justify-around max-md:hidden   ">
        <div className="h-[500px]  w-full flex gap-2  items-center overflow-auto  ">
          {company.images?.map((image) => (
            <img
              key={image}
              alt={company.name}
              className="rounded-xl h-[80%] object-contain"
              src={getS3Url(image)}
            />
          ))}
        </div>
      </section>
      <section className=" w-5/6 mx-auto flex gap-4 justify-around    md:hidden   ">
        <Carousel className="w-[80%] max-w-[80%] mx-auto ">
          <CarouselContent className="">
            {company.images?.map((image) => (
              <CarouselItem className="shadow-md" key={image}>
                <img
                  key={image}
                  alt={company.name}
                  className="rounded-xl w-[100%] object-contain"
                  src={getS3Url(image)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        </Carousel>
      </section>
    </>
  );
}
