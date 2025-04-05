import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  date: string; // format: YYYY-MM-DD

  @Column()
  timeSlot: string; // e.g., "10:00", "10:30"
}
