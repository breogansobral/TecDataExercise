import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Power } from 'src/powers/entities/power.entity';

@Entity('superheros')
export class Superhero {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  element: string;

  @Column()
  color: string;

  @Column()
  age: number;

  @Column()
  place: string;

  @Column()
  img: string;

  @OneToMany(() => Power, (power) => power.superhero)
  powers: Power[];
}
