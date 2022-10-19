import {
  IStep1,
  setImageUrl,
  step1,
} from "@features/createCampaign/createCampaignSlice";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Header } from "ui/src/Typography";
import React from "react";
import { Editor } from "@tiptap/react";
import { useAppDispatch, useAppSelector } from "@store/store";

import { Select } from "ui/src/Select";
import { Input } from "ui/src/Input";
import { Chip } from "ui/src/Chip";
import { TimeField } from "ui/src/TimeField";
import { ChipGroup } from "ui/src/Chip/ChipGroup";
import { asUploadButton } from "@rpldy/upload-button";
import { useItemFinishListener, useUploady } from "@rpldy/uploady";
import InputGroup from "@components/ui/InputGroup";
import { RichTextEditor } from "@components/RichTextEditor/RichTextEditor";
import router from "next/router";
import { FormDivider } from "@components/ui/FormDivider";
import GeneralStyles from "./General.module.css";
import { ClickableDropZone } from "@components/Dropzone/ClickableDropZone";
import { Button } from "ui";

const OPTIONS = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

export interface CustomEditorProps extends Editor {
  insertContent: (string) => void;
}

export const GAMES = [
  {
    value: "Dungeon and Dragons",
    name: "Dungeon and Dragons",
    unavailable: false,
  },
  { value: "Pathfinder", name: "Pathfinder", unavailable: false },
  { value: "Star Wars FFG", name: "Star Wars FFG", unavailable: false },
  { value: "Hero System", name: "Hero System", unavailable: true },
  { value: "Shadowrun", name: "Shadowrun", unavailable: false },
];
export const MAX_PARTY = [
  { name: "1 Player", value: "1" },
  { name: "2 Player", value: "2" },
  { name: "3 Player", value: "3" },
  { name: "4 Player", value: "4" },
  { name: "5 Player", value: "5" },
  { name: "6 Player", value: "7" },
];
export const SKILL_LEVELS = [
  { name: "All", value: "All" },
  { name: "Beginner", value: "Beginner" },
  { name: "Advanced", value: "Advanced" },
];

const DropZoneButton = asUploadButton(ClickableDropZone);

interface Option {
  value: any;
  name: string;
  unavailable?: boolean;
}

export const General = () => {
  const richTextEditorRef = React.useRef<CustomEditorProps>();
  const { processPending } = useUploady();
  const createCampaignData = useAppSelector((state) => state.createCampaign);
  const dispatch = useAppDispatch();
  const [selectedGameSystem, setSelectedGameSystem] = React.useState<Option>(
    GAMES[0]
  );
  const [selectedGameSize, setSelectedGameSize] = React.useState<Option>(
    MAX_PARTY[3]
  );
  const [selectedGameLevel, setSelectedGameLevel] = React.useState<Option>(
    SKILL_LEVELS[0]
  );

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IStep1>({
    defaultValues: createCampaignData,
  });

  useItemFinishListener((item) => {
    const secureUrl = item.uploadResponse?.data.secure_url;
    setValue("imageUrl", secureUrl);

    dispatch(
      setImageUrl({
        imageUrl: secureUrl,
      })
    );

    // Route switch happening in here
    // Make sure that we set the image url before next step
    router.push("./location");
  });

  const onSubmit: SubmitHandler<IStep1> = async (data) => {
    const res = processPending();

    dispatch(step1(data));
    if (createCampaignData.imageUrl) {
      reset();
      router.push("./location");
    }
  };

  return (
    <div className="relative mx-auto" style={{ width: "1024px" }}>
      <div className="mt-8">
        <Header
          as="h1"
          size="4xl"
          className="text-white uppercase font-oldFenris"
        >
          Create a Campaign
        </Header>
      </div>

      <FormDivider label="General" />

      {/* <InputWrapper className="my-12" label="" error={errors?.image}> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="image"
          control={control}
          render={({ field: { onChange } }) => (
            <DropZoneButton
              extraProps={{ previewImage: createCampaignData.imageUrl }}
            />
          )}
        />

        <InputGroup
          className="my-12"
          label="*Campaign Name"
          error={errors?.title}
        >
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <Input
                gold
                size="medium"
                placeholder="Campaign Name"
                value={field.value}
                onChange={(e) => field.onChange(e)}
              />
            )}
          />
        </InputGroup>

        <InputGroup
          className="my-12"
          label="*Campaign Description"
          error={errors.summary}
        >
          <Controller
            control={control}
            name="jsonSummary"
            render={({ field }) => (
              <RichTextEditor
                ref={richTextEditorRef}
                onChange={(e) => {
                  field.onChange(e);
                  if (richTextEditorRef?.current) {
                    setValue("summary", richTextEditorRef?.current.getText());
                  }
                }}
                value={field.value}
                onBlur={field.onBlur}
                name="jsonSummary"
              />
            )}
          />
          <span className="text-red-800">
            {errors.summary && errors.summary.message}
          </span>
        </InputGroup>

        <FormDivider label="Detailed Information" />

        <div className="grid grid-cols-2 gap-12 my-12">
          <InputGroup label="*Game System" error={errors?.gameSystem}>
            <Controller
              control={control}
              name="gameSystem"
              defaultValue={createCampaignData.gameSystem}
              render={({ field }) => (
                <Select
                  key="gameSystem"
                  className={
                    !errors.gameSystem
                      ? GeneralStyles.selectInput
                      : GeneralStyles.selectInputError
                  }
                  options={GAMES}
                  selected={selectedGameSystem}
                  onChange={(e) => {
                    setSelectedGameSystem(e);
                    field.onChange(e.value);
                  }}
                />
              )}
            />
            <span className="text-red-800">
              {errors.gameSystem && errors.gameSystem.message}
            </span>
          </InputGroup>
          <InputGroup label="*Maximum Party Size" error={errors?.maxSeats}>
            <Controller
              control={control}
              name="maxSeats"
              // defaultValue={createCampaignData.maxSeats}
              render={({ field }) => (
                <Select
                  key="maxSeats"
                  className={GeneralStyles.selectInput}
                  options={MAX_PARTY}
                  selected={selectedGameSize}
                  onChange={(e) => {
                    setSelectedGameSize(e);
                    field.onChange(e.value);
                  }}
                />
              )}
            />
            <span className="text-red-800">
              {errors.maxSeats && errors.maxSeats.message}
            </span>
          </InputGroup>
          <InputGroup
            label="*Recommended Skill Level"
            error={errors?.experience}
          >
            <Controller
              control={control}
              name="experience"
              defaultValue={createCampaignData.experience}
              render={({ field }) => (
                <Select
                  key="experience"
                  className={GeneralStyles.selectInput}
                  options={SKILL_LEVELS}
                  selected={selectedGameLevel}
                  onChange={(e) => {
                    setSelectedGameLevel(e);
                    field.onChange(e.value);
                  }}
                />
              )}
            />
            <span className="text-red-800">
              {errors.experience && errors.experience.message}
            </span>
          </InputGroup>
        </div>

        <div className="grid grid-cols-2 gap-12 my-12">
          <InputGroup label="*Time" error={errors?.maxSeats}>
            <Controller
              name="timePeriods"
              control={control}
              render={({ field: { onChange, value } }) => (
                <ChipGroup value={value} onChange={onChange} multiple>
                  <Chip value="Morning">Morning</Chip>
                  <Chip value="Afternoon">Afternoon</Chip>
                  <Chip value="Evening">Evening</Chip>
                  <Chip value="Night">Night</Chip>
                </ChipGroup>
              )}
            />
          </InputGroup>
        </div>
        <div className="grid grid-cols-2 gap-12 my-12">
          <InputGroup label="*Days" error={errors?.maxSeats}>
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
                </ChipGroup>
              )}
            />
          </InputGroup>
        </div>

        <Button size="large" type="submit">
          Next
        </Button>
      </form>
    </div>
  );
};
