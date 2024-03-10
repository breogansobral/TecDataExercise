/* eslint-disable prettier/prettier */
// create-superhero.dto.ts
export class CreateSuperheroDto {
  name: string;
  element: string;
  color: string;
  age: number;
  place: string;
  img: string;
  powers: string[]; // Array de nombres de poderes
}
