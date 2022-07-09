import { PrismaClient, Prisma } from "@prisma/client";
import { Difficulty } from "@typedefs/Difficulty";
import { Experience } from "@typedefs/Experience";
import argon2 from "argon2";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    firstName: "Magnus",
    lastName: "Nilsen",
    email: "magnussithnilsen@gmail.com",
    password: "test",
    experience: Experience.Beginner,
  },
  {
    id: "peter-test-1",
    firstName: "Peter",
    lastName: "Test",
    email: "peter@test.com",
    password: "test",
    experience: Experience.Beginner,
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
  const hashedPassword = await argon2.hash("test");

  // const user = await prisma.user.create({
  //   data: {
  //     firstName: "Magnus",
  //     lastName: "Nilsen",
  //     email: "magnussithnilsen@gmail.com",
  //     password: hashedPassword,
  //     experience: Experience.Beginner,
  //     Hosted: {
  //       create: {
  //         title: "test",
  //         image:
  //           "https://cdnb.artstation.com/p/assets/images/images/050/482/035/4k/ben-keeling-squareshota01.jpg?1654954786",
  //         summary: "test",
  //         city: "Philadelphia",
  //         state: "PA",
  //         isOnline: true,
  //         startDate: new Date(),
  //         endDate: new Date(),
  //         lat: 39.9526,
  //         lng: -75.134109,
  //         tags: ["Action", "Fantasy"],
  //         puzzles: Difficulty.Medium,
  //         combat: Difficulty.Medium,
  //         createdAt: new Date(),
  //         updatedAt: new Date(),
  //         additional_details: "test",
  //         max_seats: 4,
  //       },
  //     },
  //   },
  // });

  const user = await prisma.user.findUnique({
    where: {
      email: "magnussithnilsen@gmail",
    },
  });
  if (user) {
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
  }
}
