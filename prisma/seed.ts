import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });
  }

  console.log({ event });

  let ticket = await prisma.ticketType.findFirst();
  if(!ticket){
    await prisma.ticketType.createMany({
      data: [
        {
          name: 'Presencial',
          price: 500,
          isRemote: false,
          includesHotel: true,
        },
        {
          name: 'Online',
          price: 200,
          isRemote: true,
          includesHotel: false,
        },
    
      ],
    });
  }
}


main()
  
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
