import { TicketType } from '@/protocols';
import { ticketsRepository } from '@/repositories';

async function ticketsType(): Promise<TicketType[]> {
  const ticketType = await ticketsRepository.findMany();
  return ticketType;
}

async function postTicket(userId: number, ticketTypeId: number) {
  const ticketById = await ticketsRepository.create(userId, ticketTypeId);
  return ticketById;
}

export const ticketsService = {
  ticketsType,
  postTicket,
};
