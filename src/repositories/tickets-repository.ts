import { CreateTicket } from '@/services';
import { prisma } from '@/config';
import { TicketResponse } from '@/protocols';
import { NotEnrollment } from '@/errors';

async function enrollmentOffUserId(userId: number) {
  return await prisma.enrollment.findFirst({
    where: { userId },
  });
}

async function findMany(data: string) {
  if (data === 'ticket') {
    return prisma.ticket.findMany();
  }
  if (data === 'ticketType') {
    return prisma.ticketType.findMany();
  }
}
async function findFirst(userId: number) {
  const ticket = await prisma.ticket.findFirst({
    where: { Enrollment: { userId: userId } },
    include: { TicketType: true },
  });
  return ticket as TicketResponse;
}

async function create(datainfo: CreateTicket, userId: number): Promise<TicketResponse> {
  const enrollment = await enrollmentOffUserId(userId);
  if (!enrollment) {
    throw NotEnrollment();
  }
  const ticket = await prisma.ticket.create({
    data: {
      enrollmentId: enrollment.id,
      ticketTypeId: datainfo.ticketTypeId,
      status: 'RESERVED',
    },
  });

  const ticketType = await prisma.ticketType.findFirst({
    where: { id: datainfo.ticketTypeId },
  });

  const result: TicketResponse = {
    id: ticket.id,
    status: ticket.status,
    ticketTypeId: ticket.ticketTypeId,
    enrollmentId: ticket.enrollmentId,
    createdAt: ticket.createdAt,
    updatedAt: ticket.updatedAt,
    TicketType: ticketType,
  };
  return result;
}

export const ticketsRepository = {
  findFirst,
  findMany,
  create,
};
