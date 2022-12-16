import { PrismaClient, Prisma } from "@prisma/client";
import { Difficulty } from "@typedefs/Difficulty";
import { Experience } from "@typedefs/Experience";
import argon2 from "argon2";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const prisma = new PrismaClient();

const usersData: Prisma.UserCreateInput[] = [
  {
    firstName: "Magnus",
    lastName: "Nilsen",
    email: "magnussithnilsen@gmail.com",
    password: "test",
    experience: Experience.Beginner,
    aboutMe: "",
  },
  {
    firstName: "Peter",
    lastName: "Test",
    email: "magnussithnilsen+ps1@gmail.com",
    password: "test",
    experience: Experience.Beginner,
    aboutMe: "",
  },
  {
    firstName: "Zach",
    lastName: "Sharkey",
    email: "magnussithnilsen+ps2@gmail.com",
    password: "test",
    experience: Experience.Beginner,
    aboutMe: "",
  },
  {
    firstName: "Roberto",
    lastName: "Test",
    email: "magnussithnilsen+ps3@gmail.com",
    password: "test",
    experience: Experience.Beginner,
    aboutMe: "",
  },
  {
    firstName: "Matt",
    lastName: "Test",
    email: "magnussithnilsen+ps4@gmail.com",
    password: "test",
    experience: Experience.Beginner,
    aboutMe: "",
  },
  {
    firstName: "John",
    lastName: "Doe",
    email: "magnussithnilsen+ps5@gmail.com",
    password: "test",
    experience: Experience.Beginner,
    aboutMe: "",
  },
];

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
  const createdUsers = usersData.map(async (user) => {
    const hashedPassword = await argon2.hash("test");
    prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        email: user.email,
        password: hashedPassword,
        firstName: user.firstName,
        lastName: user.lastName,
        experience: user.experience,
      },
    });
  });

  console.log("createdUsers: ", createdUsers);

  // const user = await prisma.user.create({
  //   data: {
  //     firstName: "Magnus",
  //     lastName: "Nilsen",
  //     email: "magnussithnilsen@gmail.com",
  //     password: hashedPassword,
  //     experience: Experience.Beginner,
  //   },
  // });

  // const account = await prisma.account.create({
  //   data: {
  //     userId: user.id,
  //     type: "credentials",
  //     provider: "Credentials",
  //     providerAccountId: user.id,
  //   },
  // });

  // const user = await prisma.user.findUnique({
  //   where: {
  //     email: "magnussithnilsen@gmail",
  //   },
  // });
  // if (user) {
  // const campaign = await prisma.campaign.findMany({
  //   where: {
  //     gmId: user.id,
  //   },
  // });
  // const gameSystem = await prisma.gameSystem.create({
  //   data: {
  //     campaignId: campaign[0].id,
  //     assignedBy: user.id,
  //   },
  // });
  // }
}
