import { Ticket } from '@/protocols';
import { ticketsRepository } from '@/repositories';

async function getTickets() {
  const ticketType = await ticketsRepository.findMany('ticket');
  return ticketType;
}

async function ticketsType() {
  const ticketType = await ticketsRepository.findMany('ticketType');
  return ticketType;
}
export type CreateTicket = Omit<Ticket, 'id' | 'status' | 'createdAt' | 'updatedAt'>;
async function postTicket(dataTicket: CreateTicket): Promise<Ticket> {
  const ticketById = await ticketsRepository.upsert(dataTicket);
  return ticketById;
}

export const ticketsService = {
  ticketsType,
  postTicket,
  getTickets,
};
