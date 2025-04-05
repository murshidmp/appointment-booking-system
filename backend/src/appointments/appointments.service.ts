// appointments.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
  ) {}

  // Generate time slots excluding 1:00 PM to 2:00 PM
  getAvailableSlots(date: string): string[] {
    const slots: string[] = [];
    for (let hour = 10; hour < 17; hour++) {
      if (hour === 13) continue; // Skip break hour
      for (let minute of [0, 30]) {
        slots.push(`${hour.toString().padStart(2, '0')}:${minute === 0 ? '00' : '30'}`);
      }
    }
    return slots;
  }

  async getSlotsForDate(date: string): Promise<string[]> {
    const allSlots = this.getAvailableSlots(date);
    const appointments = await this.appointmentsRepository.find({ where: { date } });
    const bookedSlots = appointments.map(app => app.timeSlot);
    return allSlots.filter(slot => !bookedSlots.includes(slot));
  }

  async getAllSlotsForDate(date: string): Promise<{ time: string, available: boolean }[]> {
    // Generate the fixed slots
    const allSlots = this.getAvailableSlots(date);
    // Retrieve booked appointments for the given date
    const appointments = await this.appointmentsRepository.find({ where: { date } });
    const bookedSlots = appointments.map(app => app.timeSlot);
    // Map each slot to an object with its availability status
    return allSlots.map(slot => ({
      time: slot,
      available: !bookedSlots.includes(slot),
    }));
  }

  async bookAppointment(name: string, phone: string, date: string, timeSlot: string): Promise<Appointment> {
    if (!this.getAvailableSlots(date).includes(timeSlot)) {
      throw new BadRequestException('Time slot not valid for booking.');
    }
    const existing = await this.appointmentsRepository.findOne({ where: { date, timeSlot } });
    if (existing) {
      throw new BadRequestException('This time slot is already booked.');
    }
    const appointment = this.appointmentsRepository.create({ name, phone, date, timeSlot });
    return this.appointmentsRepository.save(appointment);
  }
}
