import { prisma } from '@/config';

async function findMany() {
  return prisma.ticketType.findMany();
}
async function create(userId: number, ticketTypeId: number) {
  return prisma.ticket.create({
    data: {
      ticketTypeId: ticketTypeId,
      enrollmentId: userId,
    },
  });
}

export const ticketsRepository = {
  findMany,
  create,
};
