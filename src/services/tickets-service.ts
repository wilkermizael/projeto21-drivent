import { Ticket, TicketResponse } from '@/protocols';
import { ticketsRepository } from '@/repositories';

async function getTickets(userId: number) {
  const ticketType = await ticketsRepository.findFirst(userId);
  return ticketType;
}

async function ticketsType() {
  const ticketType = await ticketsRepository.findMany('ticketType');
  return ticketType;
}
export type CreateTicket = Omit<Ticket, 'id' | 'status' | 'createdAt' | 'updatedAt'>;
async function postTicket(dataTicket: CreateTicket, userId: number): Promise<TicketResponse> {
  const ticketById = await ticketsRepository.create(dataTicket, userId);
  return ticketById;
}

export const ticketsService = {
  ticketsType,
  postTicket,
  getTickets,
};
