// Data source: https://open.toronto.ca/dataset/street-tree-data/
import { ICompany } from "@/interfaces";
import trees from "../mock/trees.json";

export type ICompanyMap = {
  key: string;
  name: string;
  category: string;
  company: ICompany;
  position: google.maps.LatLngLiteral;
};

export default trees as ICompanyMap[];
