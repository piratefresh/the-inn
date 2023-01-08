import { styled, Text, Tag } from "ui";
import { ITimezoneOption } from "ui";

const StyledTag = styled(Tag, {
  marginLeft: "$4",
});

interface CampaignDetailsProps {
  days: string[];
  timePeriods: string[];
  timezone: ITimezoneOption;
  experience: string;
  isOnline?: boolean;
  city: string;
  state: string;
}

export const CampaignDetails = ({
  days,
  timePeriods,
  timezone,
  experience,
  isOnline,
  city,
  state,
}: CampaignDetailsProps) => {
  return (
    <>
      <Text size="xl" color="lightContrast" className="font-trejanSans">
        Game Details
      </Text>

      <Text
        size="xl"
        color="loContrast"
        className="flex items-center font-alegreyaSans"
      >
        Every{" "}
        <div className="flex items-center">
          {days.map((day) => (
            <StyledTag>
              <Text color="hiContrast" weight="bold" size="xl">
                {day}
              </Text>
            </StyledTag>
          ))}
        </div>
        in the{" "}
        {timePeriods.map((time) => (
          <StyledTag>
            <Text color="hiContrast" weight="bold" size="xl">
              {time}
            </Text>
          </StyledTag>
        ))}{" "}
        {timezone.label}
      </Text>

      <div className="flex items-center">
        <Text size="xl" color="loContrast" className="font-alegreyaSans">
          This game is recommended for
        </Text>
        <StyledTag>
          <Text color="hiContrast" size="xl" className="font-alegreyaSans">
            {experience}
          </Text>
        </StyledTag>
      </div>

      {!isOnline && (
        <div className="flex items-center">
          <Text size="xl" color="loContrast" className="font-alegreyaSans">
            Will be played near{" "}
            <StyledTag>
              <Text color="hiContrast" weight="bold" size="xl">
                {city}
              </Text>
            </StyledTag>
            ,
            <StyledTag>
              <Text color="hiContrast" weight="bold" size="xl">
                {state}
              </Text>
            </StyledTag>{" "}
          </Text>
        </div>
      )}
    </>
  );
};
