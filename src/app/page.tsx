import { WaterMark } from "./components/BackgroundMark";
import HomeLinks from "./components/home-links";

export default function Home() {
  return (
    <section className=" h-screen w-full flex justify-center items-center   ">
      <div className="flex flex-col items-center select-none gap-4">
        <div className="rotate-[20deg] text-primary ">
          <WaterMark />
        </div>
        <div>Bienvenido al sistema de turnos mas completo !</div>
        <HomeLinks />
      </div>
    </section>
  );
}
