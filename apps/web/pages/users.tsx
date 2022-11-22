import { usePresenceChannel } from "@harelpls/use-pusher";
import { RootLayout } from "@layouts/RootLayout";
import { useSession } from "next-auth/react";
import { Text } from "ui";

const Users = () => {
  const {
    channel: presenceChannel,
    members,
    myID,
    ...rest
  } = usePresenceChannel("presence-awesome");
  const { data: session } = useSession();

  console.log("members: ", members);

  return (
    <div>
      <h2>Members</h2>
      <ul>
        {Object.entries(members)
          // filter self from members
          .filter(([id]) => id !== myID)
          // map them to a list
          .map(([id, info]) => {
            console.log("info: ", info, "id: ", id);
            return (
              <li key={id}>
                <Text color="loContrast">{info.name}</Text>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

Users.layoutProps = {
  meta: {
    title: "Users",
  },
  Layout: RootLayout,
};

export default Users;
