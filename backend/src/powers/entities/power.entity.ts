/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Superhero } from '../../superheros/entities/superhero.entity';

@Entity()
export class Power {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  power: string;

  @ManyToOne(() => Superhero, superhero => superhero.powers, {
    onDelete: "CASCADE"
  })
  superhero: Superhero;
}
