import {
  GetCampaignQuery,
  useAddPlayerApplicationMutation,
  useGetCampaignQuery,
} from "@generated/graphql";
import { CustomEditorProps } from "@components/Campaings/CreateCampaigns/General/General";
import { RichTextEditor } from "@components/RichTextEditor/RichTextEditor";
import { Experience } from "@features/createCampaign/createCampaignSlice";
import { useRouter } from "next/router";
import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  Text,
  mediaString,
  Select,
  Chip,
  ChipGroup,
  Button,
  FormDivider,
  SelectOption,
} from "ui";
import { Checkbox } from "@mantine/core";
import { SKILL_LEVELS } from "consts/skillLevels";
import InputGroup from "@components/ui/InputGroup";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApplicationSchema } from "./CampaignApplicationSchema";
import { useMediaQuery } from "@hooks/useMediaQueries";
import { CampaignBottomCard } from "@components/CampaignBottomCard";
import { CampaignSideCard } from "@components/CampaignSideCard";
import Link from "next/link";

interface CampaignApplicationProps {
  campaign: GetCampaignQuery["getCampaign"];
}
interface CampaignApplicationForm {
  campaignId: string;
  message: string;
  jsonMessage: string;
  fitsSchedule: boolean;
  days: string[];
  timePeriods: string[];
  experience: Experience;
}

export const CampaignApplication = ({ campaign }: CampaignApplicationProps) => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedGameLevel, setSelectedGameLevel] =
    React.useState<SelectOption>(SKILL_LEVELS[0]);

  const isDesktop = useMediaQuery(mediaString.lg);

  const [
    { fetching: fetchingPlayerApplcation, data: playerApplcation },
    addPlayerApplication,
  ] = useAddPlayerApplicationMutation();
  // Used to retrieve json object from text editor
  const richTextEditorRef = React.useRef<CustomEditorProps>();

  const {
    clearErrors,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<CampaignApplicationForm>({
    defaultValues: {
      campaignId: id as string,
      fitsSchedule: true,
      experience: Experience.All,
      days: [],
      timePeriods: [],
    },
    resolver: zodResolver(ApplicationSchema),
  });

  const mastchesSchedule = watch("fitsSchedule");

  const onInvalid = (errors) => {
    console.log("errors: ", errors);
  };

  const onSubmit: SubmitHandler<CampaignApplicationForm> = async (data) => {
    const res = await addPlayerApplication({
      campaignApplicationInput: {
        campaignId: id as string,
        message: data.message,
        jsonMessage: data.jsonMessage,
        fitsSchedule: data.fitsSchedule,
        experience: data.experience,
        days: data.days ?? [],
        timePeriods: data.timePeriods ?? [],
      },
    });

    if (res.error) {
      console.error("Oh no!", res.error);
    }

    if (res.data) {
      router.push("/");
    }
  };

  return (
    <>
      {!isDesktop ? (
        <CampaignBottomCard campaign={campaign} />
      ) : (
        <CampaignSideCard campaign={campaign} />
      )}
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className="max-w-7xl mx-auto h-screen relative px-4 mb-40"
      >
        <div className="my-16">
          <Text size="4xl" color="loContrast" className="mb-4">
            Request to join &quot;{campaign.title}&quot;
          </Text>
          <FormDivider label="" />
        </div>

        <InputGroup label="Message">
          <Controller
            control={control}
            name="jsonMessage"
            render={({ field }) => (
              <RichTextEditor
                ref={richTextEditorRef}
                onChange={(e) => {
                  field.onChange(e);
                  if (richTextEditorRef?.current) {
                    const currentText = richTextEditorRef?.current.getText();
                    if (currentText) {
                      // Reset error if text is valid
                      clearErrors("message");
                      setValue("message", currentText);
                    }
                  }
                }}
                value={field.value}
                onBlur={field.onBlur}
                name="jsonAdditionalDetails"
                error={errors.message?.message}
              />
            )}
          />
        </InputGroup>
        <InputGroup
          label="The assigned days fits your schedule?"
          className="flex flex-row my-16"
        >
          <Controller
            control={control}
            name="fitsSchedule"
            render={({ field }) => (
              <Checkbox
                styles={{
                  label: { color: "white" },
                }}
                color="yellow"
                size="lg"
                onChange={(e) => field.onChange(e)}
                defaultChecked={field.value}
                checked={field.value}
              />
            )}
          />
        </InputGroup>

        {!mastchesSchedule && (
          <div className="flex flex-col gap-8 my-16">
            <InputGroup
              label="Preferred days"
              direction="row"
              className="flex flex-row my-8"
            >
              <Controller
                name="timePeriods"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <ChipGroup value={value} onChange={onChange} multiple>
                    <Chip value="Morning">Morning</Chip>
                    <Chip value="Afternoon">Afternoon</Chip>
                    <Chip value="Evening">Evening</Chip>
                    <Chip value="Night">Night</Chip>
                    <Chip value="Flexible">Flexible</Chip>
                  </ChipGroup>
                )}
              />
            </InputGroup>
            <InputGroup label="Preferred times" className="flex flex-row my-8">
              <Controller
                name="days"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <ChipGroup value={value} onChange={onChange} multiple>
                    <Chip value="Monday">Monday</Chip>
                    <Chip value="Tuesday">Tuesday</Chip>
                    <Chip value="Wednesday">Wednesday</Chip>
                    <Chip value="Thursday">Thursday</Chip>
                    <Chip value="Friday">Friday</Chip>
                    <Chip value="Saturday">Saturday</Chip>
                    <Chip value="Sunday">Sunday</Chip>
                    <Chip value="Flexible">Flexible</Chip>
                  </ChipGroup>
                )}
              />
            </InputGroup>
          </div>
        )}

        <div className="my-16">
          <InputGroup label="You're experience level?">
            <Controller
              control={control}
              name="experience"
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  key="experience"
                  options={SKILL_LEVELS}
                  selected={selectedGameLevel}
                  onChange={(e) => {
                    setSelectedGameLevel(e);
                    field.onChange(e.value);
                  }}
                />
              )}
            />
          </InputGroup>
        </div>

        <FormDivider label="" />
        <div className="flex gap-4 mt-4">
          <Button size="large" type="button">
            <Link href={`/campaign/${campaign.id}`}>
              <a>Back</a>
            </Link>
          </Button>
          <Button size="large" type="submit">
            Confirm
          </Button>
        </div>
      </form>
    </>
  );
};
