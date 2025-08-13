import { Inter, Roboto, Libre_Baskerville, Montserrat } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "700"],
});
export const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
});
