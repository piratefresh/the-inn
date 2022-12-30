import { PrismaClient, Prisma } from "@prisma/client";
import { Difficulty } from "@typedefs/Difficulty";
import { Experience } from "@typedefs/Experience";
import argon2 from "argon2";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { User } from "@models/User";
import { faker } from "@faker-js/faker";
import { CampaignApplicationInput } from "@resolvers/CampaignApplicationInput";
import { MembershipRole } from "@typedefs/MembershipRole";

const prisma = new PrismaClient();

export function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// const campaignData: Prisma.CampaignCreateInput[] = [
//   {
//     title: "test",
//     image:
//       "https://cdnb.artstation.com/p/assets/images/images/050/482/035/4k/ben-keeling-squareshota01.jpg?1654954786",
//     summary: "test",
//     city: "Philadelphia",
//     state: "PA",
//     isOnline: true,
//     startDate: new Date(),
//     endDate: new Date(),
//     lat: 39.9526,
//     lng: -75.134109,
//     game_system: "Pathfinder",
//     max_seats: 4,
//   },
// ];

export async function seedDB() {
  const amountOfUsers = 50;

  const users: Prisma.UserCreateInput[] = [];

  for (let i = 0; i < amountOfUsers; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const hashedPassword = await argon2.hash("test");

    const user: Prisma.UserCreateInput = {
      email: faker.internet.email(firstName, lastName),
      firstName,
      lastName,
      password: hashedPassword,
    };

    users.push(user);
  }

  const addUsers = async () =>
    await prisma.user.createMany({ data: users, skipDuplicates: true });
  addUsers();
}

export async function seedDBApplication() {
  const applications = CampaignApplicationInput;

  const users = await prisma.user.findMany({
    where: {
      memberships: {
        none: {
          campaignId: "6c82306c-a699-4067-b10b-52d4aba580cc",
        },
      },
    },
  });

  console.log("users: ", users);

  users.map(async (user) => {
    const message = faker.lorem.paragraphs(randomIntFromInterval(1, 3));
    const fitsSchedule = faker.datatype.boolean();
    const randomDate = faker.date.recent(10);

    const userMembership = await prisma.membership.create({
      data: {
        role: MembershipRole.PENDING,
        campaignId: "6c82306c-a699-4067-b10b-52d4aba580cc",
        userId: user.id,
        application: {
          create: {
            firstName: user.firstName,
            lastName: user.lastName,
            gamesPlayed: faker.datatype.number({ max: 20 }),
            campaignId: "6c82306c-a699-4067-b10b-52d4aba580cc",
            fitsSchedule,
            message,
            jsonMessage: message,
            experience: faker.helpers.shuffle<
              CampaignApplicationInput["experience"]
            >([Experience.Beginner, Experience.Advanced, Experience.All])[0]!,
            days: !fitsSchedule
              ? [...new Array(randomIntFromInterval(1, 4))].map(() =>
                  faker.date.weekday()
                )
              : "",
            timePeriods: !fitsSchedule ? ["Evening"] : "",
            createdAt: randomDate,
            updatedAt: randomDate,
          },
        },
      },
      include: {
        campaign: true,
        user: true,
        application: true,
      },
    });

    console.log("userMembership: ", userMembership);
  });
}
