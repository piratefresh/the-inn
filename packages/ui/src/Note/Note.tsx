import { styled } from "../theme";
import { Text } from "../Typography";

const Container = styled("div", {
  position: "relative",
  width: "auto",
});

const StyledNote = styled("div", {
  background: "#EDE8CD",
  borderRadius: "$md",
  display: "flex",
  alignItems: "center",
});

const StyledOverlay = styled("div", {
  position: "absolute",
  top: "0px",
  bottom: "0px",
  right: "0px",
  left: "0px",
  backgroundImage:
    'url("https://res.cloudinary.com/film-it/image/upload/v1648261306/The%20inn/concrete-stylized.png")',
  backgroundRepeat: "no-repeat",
  mixBlendMode: "darken",
  opacity: 0.12,
  borderRadius: "6px",
});

const TextContainer = styled("div", {
  padding: "$12",
});

interface NoteProps {
  children: React.ReactNode;
}

export const Note = ({ children }: NoteProps) => {
  return (
    <Container>
      <StyledOverlay />
      <StyledNote>
        <TextContainer>
          <Text
            style={{ lineHeight: "125%", textTransform: "uppercase" }}
            size="2xl"
            font="cinzel"
            weight="bold"
          >
            {children}
          </Text>
        </TextContainer>
      </StyledNote>
    </Container>
  );
};
