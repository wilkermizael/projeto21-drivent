import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { CreateTicket, ticketsService } from '@/services';
import { NotEnrollment, enrollmentNotFoundError } from '@/errors';

export async function postCreateTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  if (!req.body.ticketTypeId) {
    throw enrollmentNotFoundError();
  }
  const ticketTypeId = req.body.ticketTypeId as number;
  const dataTicket = { userId, ticketTypeId } as unknown as CreateTicket;
  const tickets = await ticketsService.postTicket(dataTicket, userId);
  return res.status(httpStatus.CREATED).send(tickets);
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const tickets = await ticketsService.getTickets(req.userId);
  if (!tickets) {
    throw NotEnrollment();
  }
  return res.status(httpStatus.OK).send(tickets);
}

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
  const allTicketsTypes = await ticketsService.ticketsType();
  return res.status(httpStatus.OK).send(allTicketsTypes);
}
