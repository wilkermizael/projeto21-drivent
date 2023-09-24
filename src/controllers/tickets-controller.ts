import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { CreateTicket, ticketsService } from '@/services';

export async function postCreateTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const ticketTypeId = req.body.ticketTypeId as number;
  const dataTicket = { enrollmentId: userId, ticketTypeId } as unknown as CreateTicket;
  const tickets = await ticketsService.postTicket(dataTicket);
  return res.status(httpStatus.OK).send(tickets);
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const tickets = await ticketsService.getTickets();
  return res.status(httpStatus.OK).send(tickets);
}

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
  const allTicketsTypes = await ticketsService.ticketsType();
  return res.status(httpStatus.OK).send(allTicketsTypes);
}
