import sgMail from "@sendgrid/mail";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "../constants";
import type { PrismaClient } from "@prisma/client";

export async function sendConfirmationEmail(email: string, token: string) {
  try {
    const message = {
      to: email,
      from: {
        email: "magnussithnilsen@gmail.com",
        name: "The Inn",
      },
      templateId: "d-7065a428853042ca90d2abfbf85d2c3d",
      dynamicTemplateData: {
        url: `${process.env
          .NEXT_PUBLIC_FRONTEND!}/confirm-user-callback?token=${token}&email=${email}`,
      },
      hideWarnings: true,
    };
    sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

    await sgMail.send(message);
  } catch (error: any) {
    console.error(error);
    throw new Error("An unknown error occurred");
  }
}

export async function issueToken(userId: string, prisma: PrismaClient) {
  const token = jwt.sign({ id: userId }, COOKIE_NAME, {
    expiresIn: 60 * 5, // 5 minutes
  });

  /**
   * Make token single-use by saving the token value to the user
   */
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      emailVerifyToken: token,
    },
  });

  return token;
}
