import { Tag, Text } from "ui";

interface CampaignTagsProps {
  tags: string[];
}

export const CampaignTags = ({ tags }: CampaignTagsProps) => {
  return (
    <>
      {tags.map((tag) => (
        <Tag>
          <Text style={{ fontFamily: "Alegreya Sans" }} size="4xl">
            {tag}
          </Text>
        </Tag>
      ))}
    </>
  );
};