import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: ["query"],
});

// MODELS;
export { Account } from "./models/Account";
export { Campaign } from "./models/Campaign";
export { Review } from "./models/Review";
export { Session } from "./models/Session";
export { User } from "./models/User";
export { VerificationToken } from "./models/VerificationToken";

// RESOLVERS
export { UserResolver } from "./resolvers/user";

// TYPES;
export { MyContext } from "./types/MyContext";
export { Difficulty } from "./types/Difficulty";
export { Experiance } from "./types/Experiance";
export { StatusType } from "./types/StatusType";
