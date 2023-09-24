import { Router } from 'express';
import { getTickets, getTicketsTypes, postCreateTickets } from '@/controllers/tickets-controller';
import { authenticateToken } from '@/middlewares';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken);
ticketsRouter.get('/types', getTicketsTypes);
ticketsRouter.get('/', getTickets);
ticketsRouter.post('/', postCreateTickets);

export { ticketsRouter };
