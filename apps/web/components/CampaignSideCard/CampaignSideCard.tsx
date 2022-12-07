import { GetCampaignQuery } from "@generated/graphql";
import { styled, Text, Button } from "ui";

interface CampaignSideCardProps {
  campaign: GetCampaignQuery["getCampaign"];
  onSubmit: () => void;
  submitText?: string;
}

const SideCard = styled("div", {
  display: "flex",
  flexDirection: "column",
  padding: "$4",
  position: "sticky",
  marginTop: "64px",
  top: "64px",
  right: "10%",

  fontSize: "$7xl",
  width: 275,
  float: "right",

  borderRadius: "$radii$md",
  textTransform: "uppercase",
  zIndex: "$banner",
  border: "3px solid transparent",
  backgroundOrigin: "border-box",
  backgroundClip: "padding-box, border-box",
  backgroundImage:
    "linear-gradient(rgba(36, 37, 38, 1), rgba(36, 37, 38, 1)),linear-gradient($yellowBrand, $orangeBrand)",
});

export const CampaignSideCard = ({
  campaign,
  onSubmit,
  submitText,
}: CampaignSideCardProps) => {
  return (
    <SideCard>
      <Text size="lg" color="lightContrast" className="font-trejanSans">
        {campaign.title}
      </Text>

      <div className="my-8">
        <Text size="sm" color="loContrast" className="font-trejanSans">
          Game System: <Text color="lightContrast">{campaign.gameSystem}</Text>
        </Text>
        <Text size="sm" color="loContrast" className="font-trejanSans">
          Schedule:{" "}
          <Text color="lightContrast">{campaign.days.map((day) => day)}</Text>
        </Text>
        <Text size="sm" color="loContrast" className="font-trejanSans">
          Party Size:{" "}
          <Text color="lightContrast">{campaign.maxSeats} members</Text>
        </Text>

        <Text size="sm" color="loContrast" className="font-trejanSans">
          Recommended Experience:{" "}
          <Text color="lightContrast">{campaign.experience}</Text>
        </Text>
      </div>
      <div>
        {campaign.isOnline ? (
          <>
            <Text size="sm" color="loContrast" className="font-trejanSans">
              Played: <Text color="lightContrast">Online</Text>
            </Text>
            <Text size="sm" color="loContrast" className="font-trejanSans">
              Virtual Table Top:
              <Text color="lightContrast">{campaign.virtualTable}</Text>
            </Text>
            <Text size="sm" color="loContrast" className="font-trejanSans">
              Voice Chat:
              <Text color="lightContrast">{campaign.voipSystem}</Text>
            </Text>
          </>
        ) : (
          <>
            <Text size="sm" color="loContrast" className="font-trejanSans">
              Played: <Text color="lightContrast">Offline</Text>
            </Text>
            <Text size="sm" color="loContrast" className="font-trejanSans">
              Area:
              <Text color="lightContrast">{campaign.area}</Text>
            </Text>
          </>
        )}
      </div>

      <div className="my-2 w-full">
        <Button size="large" fullWidth onClick={onSubmit}>
          {submitText ? submitText : "Join Campaign"}
        </Button>
      </div>
    </SideCard>
  );
};