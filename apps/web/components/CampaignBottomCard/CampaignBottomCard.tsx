import { CreateCampaignState } from "@features/createCampaign/createCampaignSlice";
import { Campaign, GetCampaignQuery } from "@generated/graphql";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { styled, Text, Button, Spoiler } from "ui";

interface CampaignBottomCardProps {
  campaign: CreateCampaignState | GetCampaignQuery["getCampaign"];
  isOwner?: boolean;
  isMember?: boolean;
  onSubmit?: () => void;
  onBack?: (event: React.MouseEvent<HTMLElement>) => void;
  submitText?: string;
}

const SideCard = styled("div", {
  display: "flex",
  position: "sticky",
  top: "auto",
  bottom: 0,
  right: 0,
  width: "100%",
  height: "100%",
  flexDirection: "column",
  padding: "$4",
  fontSize: "$7xl",
  borderRadius: "$radii$md",
  textTransform: "uppercase",
  zIndex: "$banner",
  border: "3px solid transparent",
  backgroundOrigin: "border-box",
  backgroundClip: "padding-box, border-box",
  backgroundImage:
    "linear-gradient(rgba(36, 37, 38, 1), rgba(36, 37, 38, 1)),linear-gradient($yellowBrand, $orangeBrand)",
});

export const CampaignBottomCard = ({
  isOwner = false,
  isMember = false,
  campaign,
  onBack,
  onSubmit,
  submitText,
}: CampaignBottomCardProps) => {
  return (
    <SideCard>
      <Text size="lg" color="lightContrast" className="font-trejanSans">
        {campaign.title}
      </Text>
      <Spoiler
        maxHeight={0}
        hideLabel={
          <Text size="xs" color="loContrast" className="my-2">
            Show less
          </Text>
        }
        showLabel={
          <Text size="xs" color="loContrast" className="my-2">
            Show more
          </Text>
        }
      >
        <div className="my-8">
          <Text size="sm" color="loContrast" className="font-trejanSans">
            Game System:{" "}
            <Text color="lightContrast">{campaign.gameSystem}</Text>
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
      </Spoiler>

      {!isOwner && !isMember && onSubmit && (
        <div className="flex flex-col gap-2 my-4">
          {(campaign as GetCampaignQuery["getCampaign"]).gmId && (
            <Button outlined="primary" size="large">
              <Link
                href={`/user/messages/thread?id=${
                  (campaign as GetCampaignQuery["getCampaign"]).gmId
                }`}
              >
                <Text>Message GM</Text>
              </Link>
            </Button>
          )}

          <Button size="large" fullWidth onClick={onSubmit}>
            {submitText ? submitText : "Join Campaign"}
          </Button>
          {onBack && (
            <Button size="large" fullWidth onClick={onBack}>
              Previous
            </Button>
          )}
        </div>
      )}
      {isOwner && (
        <Button size="large" fullWidth type="button">
          <Link
            href={`/user/editcampaign/general?id=${
              (campaign as GetCampaignQuery["getCampaign"]).id
            }`}
          >
            Edit
          </Link>
        </Button>
      )}
      {isMember && (
        <div className="my-2 w-full">
          <Text>Already Joined or Applied</Text>
        </div>
      )}
    </SideCard>
  );
};
