import Ably from "ably/promises";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { nextAuthOptions } from "./auth/[...nextauth]";

function generateRandomId() {
  return Math.random().toString(36).substr(2, 9);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = new Ably.Realtime(process.env.ABLY_CLIENT_API_KEY);

  const authOptions = nextAuthOptions(req, res);
  const session = await unstable_getServerSession(req, res, authOptions);

  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: session ? session.id : generateRandomId(),
  });

  res.status(200).json(tokenRequestData);
}
