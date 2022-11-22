import { pusher } from "@utils/pusherConfig";
import { NextApiRequest, NextApiResponse } from "next";

export default function pusherAuthEndpoint(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { channel_name, socket_id } = req.body;
  const { user_id } = req.headers;

  if (!user_id || typeof user_id !== "string") {
    res.status(404).send("lol");
    return;
  }
  const auth = pusher.authorizeChannel(socket_id, channel_name, {
    user_id,
    user_info: {
      name: "oaiwmeroauwhero;aijhwer",
    },
  });
  res.send(auth);
}
