import dayjs from 'dayjs';
import { CreateTicket } from '@/services';
import { prisma } from '@/config';

async function findMany(data: string) {
  if (data === 'ticket') {
    return prisma.ticket.findMany();
  }
  if (data === 'ticketType') {
    return prisma.ticketType.findMany();
  }
}
async function upsert(datainfo: CreateTicket) {
  console.log(datainfo);
  return prisma.ticket.upsert({
    where: { enrollmentId: datainfo.enrollmentId },
    update: { status: 'PAID' },
    create: {
      status: 'RESERVED',
      enrollmentId: datainfo.enrollmentId,
      ticketTypeId: datainfo.ticketTypeId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
}

export const ticketsRepository = {
  findMany,
  upsert,
};
