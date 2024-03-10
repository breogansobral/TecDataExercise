import { Power } from "./power";

export interface Hero {
  id: number;
  name: string;
  element: string;
  color: string;
  age: number;
  place: string;
  img: string;
  powers: Power[];
}
