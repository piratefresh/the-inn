import { styled, Text, Tag } from "ui";
import { ITimezoneOption } from "ui/src/TimeZonePicker/TimeZonePicker";

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
      <Text size="4xl" color="lightContrast" className="font-trejanSans">
        Game Details
      </Text>

      <Text
        size="4xl"
        color="loContrast"
        className="flex items-center font-alegreyaSans"
      >
        Every{" "}
        <div className="flex items-center">
          {days.map((day) => (
            <StyledTag>
              <Text color="hiContrast" weight="bold" size="4xl">
                {day}
              </Text>
            </StyledTag>
          ))}
        </div>
        in the{" "}
        {timePeriods.map((time) => (
          <StyledTag>
            <Text color="hiContrast" weight="bold" size="4xl">
              {time}
            </Text>
          </StyledTag>
        ))}{" "}
        {timezone.label}
      </Text>

      <div className="flex items-center">
        <Text size="4xl" color="loContrast" className="font-alegreyaSans">
          This game is recommended for
        </Text>
        <StyledTag>
          <Text color="hiContrast" size="4xl" className="font-alegreyaSans">
            {experience}
          </Text>
        </StyledTag>
      </div>

      {!isOnline && (
        <div className="flex items-center">
          <Text size="4xl" color="loContrast" className="font-alegreyaSans">
            Will be played near{" "}
            <StyledTag>
              <Text color="hiContrast" weight="bold" size="4xl">
                {city}
              </Text>
            </StyledTag>
            ,
            <StyledTag>
              <Text color="hiContrast" weight="bold" size="4xl">
                {state}
              </Text>
            </StyledTag>{" "}
          </Text>
        </div>
      )}
    </>
  );
};
