import CampaignCardStyles from "./CampaignCard.module.css";
import { Card, CardMedia } from "@components/ui/Card";
import { Badge, Box } from "@mantine/core";
import Image from "next/image";

interface CampaignCardProps {
  image: string;
  tags: string[];
  joinedPlayers: number;
  maxPlayers: number;
  name: string;
  date: string;
  time: string;
  gameSystem: string;
}

export const CampaignCard = ({
  image,
  tags,
  joinedPlayers,
  maxPlayers,
  name,
  date,
  time,
  gameSystem,
}: CampaignCardProps) => {
  const tagsComponent = tags.map((tag) => <Badge>{tag}</Badge>);
  return (
    <Card>
      <CardMedia>
        <Image
          layout="fill"
          objectFit="cover"
          className={CampaignCardStyles.image}
          src={image}
          alt={`${name} header`}
        />
      </CardMedia>
      <div className="px-3 py-3">
        <Box className="flex justify-between mb-2">
          <h2>{gameSystem}</h2>
          <h2>
            {joinedPlayers} out of {maxPlayers} Players
          </h2>
        </Box>

        <h1
          style={{ fontSize: "24px" }}
          className="font-oldFenris leading-7 mb-2"
        >
          {name}
        </h1>
        <Box className="mb-2">
          <h3 className="text-sm">
            {date} at {time}
          </h3>
        </Box>
        <Box className="mb-2">{tagsComponent}</Box>
      </div>
    </Card>
  );
};
