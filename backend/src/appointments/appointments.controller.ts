import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  // GET /appointments/slots?date=YYYY-MM-DD
  @Get('slots')
  async getAvailableSlots(@Query('date') date: string) {
    return this.appointmentsService.getSlotsForDate(date);
  }

  // New endpoint: GET /appointments/all-slots?date=YYYY-MM-DD
  @Get('all-slots')
  async getAllSlots(@Query('date') date: string) {
    return this.appointmentsService.getAllSlotsForDate(date);
  }

  // POST /appointments/book
  @Post('book')
  async bookAppointment(@Body() body: { name: string; phone: string; date: string; timeSlot: string }) {
    return this.appointmentsService.bookAppointment(body.name, body.phone, body.date, body.timeSlot);
  }
}
