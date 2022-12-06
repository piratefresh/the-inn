import { MessageInput } from "@components/MessageInput";
import { MessageList } from "@components/MessageList";
import { usePresenceChannel } from "@harelpls/use-pusher";
import { RootLayout } from "@layouts/RootLayout";
import { useSession } from "next-auth/react";
import { styled, Text } from "ui";

const StyledContainer = styled("div", {
  display: "grid",
  gridTemplateColumns: "minmax(auto, 400px) 1fr",
  height: "100vh",
});

const StyledSidebar = styled("div", {
  width: "400px",
  backgroundColor: "#334445",
  background: "#334445",

  "&::before": {
    content: "",
    backgroundImage: 'url("./images/textureleather2.png")',
    backgroundSize: "cover",
    position: "absolute",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
    opacity: 0.05,
    mixBlendMode: "lighten",
  },
});

const StyledInnerBar = styled("div", {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  margin: "10px",
  boxShadow:
    "0 0 0 2px hsla(42, 100%, 70%, 1), 0 0 0 6px hsla(183, 15%, 24%), 0 0 0 8px hsla(42, 100%, 70%, 1)",
});

const StyledMessageContainer = styled("div", {
  position: "relative",
  backgroundColor: "#0F2124",
  padding: "$16",
});

const StyledMessageHeader = styled("div", {
  display: "flex",
  justifyContent: "center",
  padding: "$8",
  color: "$loContrast",
  backgroundColor: "$yellowBrand",
  maskImage: "url(./images/rippedflag.png)",
  maskSize: "450px",
  maskRepeat: "no-repeat",
  marginTop: "$1",
  height: "100px",
  width: "450px",
  zIndex: "$banner",
});

const StyledUl = styled("ul", {
  padding: "$8",
});
const StyledMessageTitle = styled("li", {
  position: "relative",
  "&::after": {
    content: "",
    display: "block",
    height: "1px",
    width: "100%",
    position: "absolute",
    bottom: "0",
    background: "linear-gradient(90deg, rgba(255,200,61,1), rgba(0,0,0,0))",
  },
});

const Users = () => {
  const {
    channel: presenceChannel,
    members,
    myID,
    ...rest
  } = usePresenceChannel("presence-awesome");
  const { data: session } = useSession();

  if (!session) return <div>Please Login</div>;

  return (
    <StyledContainer>
      <StyledSidebar>
        <StyledInnerBar>
          <StyledMessageHeader>
            <Text as="h2" style={{ fontFamily: "oldFenris" }} size="4xl">
              Messages
            </Text>
          </StyledMessageHeader>
          <StyledUl>
            {Object.entries(members)
              // filter self from members
              .filter(([id]) => id !== myID)
              // map them to a list
              .map(([id, info]) => {
                console.log("info: ", info, "id: ", id);
                return (
                  <StyledMessageTitle key={id}>
                    <Text
                      size="2xl"
                      style={{ fontFamily: "oldFenris" }}
                      color="yellowBrand"
                    >
                      {info.name}
                    </Text>
                  </StyledMessageTitle>
                );
              })}
          </StyledUl>
        </StyledInnerBar>
      </StyledSidebar>
      <StyledMessageContainer>
        <Text
          size="4xl"
          style={{ fontFamily: "oldFenris" }}
          color="yellowBrand"
        >
          Ron Test
        </Text>
        <MessageList userId={session.id as string} />
        <MessageInput />
      </StyledMessageContainer>
    </StyledContainer>
  );
};

Users.layoutProps = {
  meta: {
    title: "Users",
  },
  Layout: RootLayout,
};

export default Users;
