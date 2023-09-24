import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { ticketsService } from '@/services';

export async function postCreateTickets(req: AuthenticatedRequest, res: Response) {
  type Ticket = {
    ticketTypeId: number;
  };
  const { userId } = req;
  const { ticketTypeId } = req.body as Ticket;
  const tickets = await ticketsService.postTicket(userId, ticketTypeId);
  return res.status(httpStatus.OK).send(tickets);
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  return res.status(httpStatus.OK).send('ok');
}

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
  const allTicketsTypes = await ticketsService.ticketsType();
  return res.status(httpStatus.OK).send(allTicketsTypes);
}
