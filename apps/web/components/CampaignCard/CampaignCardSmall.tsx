import {
  GetCampaignsQuery,
  useDeactivateCampaignMutation,
  useDeleteCampaignMutation,
} from "@generated/graphql";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Avatar, Button, Card, CardImage, HeroImage, styled, Text } from "ui";

const StyledCard = styled(Card, {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "rgba(24, 24, 24, 1)",
  borderRadius: "$base",
  width: "350px",
  height: "100%",
});

const ImageContainer = styled("div", {
  position: "relative",
  display: "flex",
  height: "160px",
  width: "100%",
});
const MemberCircle = styled("div", {
  position: "relative",
  borderRadius: "9999px",
  height: "30px",
  width: "30px",
  backgroundColor: "$yellowBrand",
  marginLeft: "-10px",
  zIndex: 1,
});

const StyledCardImage = styled(CardImage, {
  maxHeight: "180px",
  minHeight: "180px",
});

interface CampaignCardSmallProps {
  campaign: GetCampaignsQuery["getCampaigns"][0];
}

const MAX_SHOW_APPLICANTS = 5;

export const CampaignCardSmall = ({ campaign }: CampaignCardSmallProps) => {
  const [_, deleteCampaign] = useDeleteCampaignMutation();
  const [__, deactivateCampaign] = useDeactivateCampaignMutation();

  const handleDeleteCampaign = () => {
    deleteCampaign({
      campaignId: campaign.id,
    });
  };
  const handleDeactivateCampaign = () => {
    deactivateCampaign({
      campaignId: campaign.id,
    });
  };

  if (!campaign) return <div>...loading</div>;

  return (
    <StyledCard background="dark">
      <StyledCardImage
        src={campaign.imageUrl}
        height="175px"
        width="100%"
        alt="Campaign Image"
        gold
      />
      <div className="flex flex-col h-full p-4">
        <div className="my-4">
          <Link passHref href={`/campaign/${campaign.id}`} legacyBehavior>
            <Text size="lg" style={{ fontFamily: "oldFenris" }}>
              {campaign.title}
            </Text>
          </Link>
        </div>

        <div className="flex flex-col grow my-4">
          <Text>
            Last Updated{" "}
            {format(new Date(campaign.updatedAt), "EEE',' MMM dd 'at' h bbb")}
          </Text>
          <Text className="whitespace-nowrap" size="sm">
            {campaign.days.map((day, index) => (
              <span>{(index ? ", " : "") + day}</span>
            ))}{" "}
            at{" "}
            {campaign.timePeriods.map((period, index2) => (
              <span>{(index2 ? ", " : "") + period}</span>
            ))}
          </Text>
        </div>

        <div className="flex flex-row items-center ml-2">
          {campaign.memberships
            .slice(1)
            .slice(-MAX_SHOW_APPLICANTS)
            .map((member) => {
              return member.user.imageUrl ? (
                <Avatar
                  imageUrl={member.user.imageUrl}
                  name={`${member.user.firstName} ${member.user.lastName}`}
                />
              ) : (
                <MemberCircle />
              );
            })}
          {campaign.memberships.length > MAX_SHOW_APPLICANTS && (
            <Text>
              +{campaign.memberships.length - MAX_SHOW_APPLICANTS} More
            </Text>
          )}
          {campaign.memberships.length > 1 && <Text> Applicants</Text>}
        </div>

        <div className="border-yellow-500 border-b my-4" />

        <div className="flex flex-row flex-wrap items-center justify-between gap-4 ml-2">
          <Button outlined="primary">
            <Link href={`/user/editcampaign/general?id=${campaign.id}`} legacyBehavior>
              <Text className="whitespace-nowrap">Edit</Text>
            </Link>
          </Button>
          <Button outlined="primary" onClick={handleDeactivateCampaign}>
            <Text as="a" className="whitespace-nowrap">
              Deactivate
            </Text>
          </Button>
          <Button outlined="primary" onClick={handleDeleteCampaign}>
            <Text as="a" className="whitespace-nowrap" color="red">
              Delete
            </Text>
          </Button>
          <Button outlined="primary">
            <Link href={`/applications/${campaign.id}`}>

              <Text className="whitespace-nowrap">View Applications</Text>

            </Link>
          </Button>
        </div>
      </div>
    </StyledCard>
  );
};
