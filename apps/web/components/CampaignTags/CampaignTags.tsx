import { Tag, Text } from "ui";

interface CampaignTagsProps {
  tags: string[];
}

export const CampaignTags = ({ tags }: CampaignTagsProps) => {
  return (
    <>
      {tags.map((tag) => (
        <Tag>
          <Text
            color="hiContrast"
            style={{ fontFamily: "Alegreya Sans" }}
            size="4xl"
            className="whitespace-pre-wrap"
          >
            {tag}
          </Text>
        </Tag>
      ))}
    </>
  );
};
