import { useGetCampaignQuery } from "@generated/graphql";
import { CustomEditorProps } from "@components/Campaings/CreateCampaigns/General/General";
import { RichTextEditor } from "@components/RichTextEditor/RichTextEditor";
import { Experience } from "@features/createCampaign/createCampaignSlice";
import { useRouter } from "next/router";
import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { styled, Text, css, Select, Chip, ChipGroup } from "ui";
import { Checkbox } from "@mantine/core";
import { SKILL_LEVELS } from "consts/skillLevels";
import { SelectOption } from "ui/src/Select/Select";

interface CampaignApplicationForm {
  message: string;
  jsonMessage: string;
  fitsSchedule: boolean;
  days: string[];
  timePeriods: string[];
  experience: Experience;
}

const itemsCenter = css({
  itemsAlign: "center",
});

const Flex = styled("div", {
  display: "flex",

  variants: {
    flexDirection: {
      row: {
        flexDirection: "row",
      },
      column: {
        flexDirection: "column",
      },
    },
  },
});

export const CampaignApplication = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedGameLevel, setSelectedGameLevel] =
    React.useState<SelectOption>(SKILL_LEVELS[0]);

  const [{ data: campaign, fetching }] = useGetCampaignQuery({
    variables: {
      id: id as string,
    },
  });
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
      fitsSchedule: true,
    },
  });

  const mastchesSchedule = watch("fitsSchedule");

  const onInvalid = (errors) => {
    console.log("errors: ", errors);
  };

  const onSubmit: SubmitHandler<CampaignApplicationForm> = async (data) => {
    console.log("submit");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
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
      <Flex className="items-center">
        <Text>The assigned days fits your schedule?</Text>
        <Controller
          control={control}
          name="fitsSchedule"
          render={({ field }) => (
            <Checkbox
              styles={{
                label: { color: "white" },
              }}
              label="Is Online?"
              color="yellow"
              size="lg"
              onChange={(e) => field.onChange(e)}
              defaultChecked={field.value}
              checked={field.value}
            />
          )}
        />
      </Flex>

      {!mastchesSchedule && (
        <div>
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
        </div>
      )}

      <div>
        <Text>What&apos;s your experience level?</Text>
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
      </div>

      <Text>
        George is a fantastic GM. He really knows the rules and helps beginners.
        He always makes sure everyone I comfortable and having fun. I love that
        he uses different voices for different NPCs.
      </Text>
    </form>
  );
};
