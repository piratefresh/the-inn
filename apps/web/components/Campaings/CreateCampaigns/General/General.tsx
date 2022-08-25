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
import { Button } from "@mantine/core";
import { Select } from "ui/src/Select";
import { Input } from "ui/src/Input";
import { Chip } from "ui/src/Chip";
import { ChipGroup } from "ui/src/Chip/ChipGroup";
import { asUploadButton } from "@rpldy/upload-button";
import { useItemFinishListener, useUploady } from "@rpldy/uploady";
import InputGroup from "@components/ui/InputGroup";
import { RichTextEditor } from "@components/RichTextEditor/RichTextEditor";
import router from "next/router";
import { FormDivider } from "@components/ui/FormDivider";
import GeneralStyles from "./General.module.css";
import { ClickableDropZone } from "@components/Dropzone/ClickableDropZone";

const OPTIONS = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

export interface CustomEditorProps extends Editor {
  insertContent: (string) => void;
}

const games = [
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
const maxParty = [
  { name: "1 Player", value: "1" },
  { name: "2 Player", value: "2" },
  { name: "3 Player", value: "3" },
  { name: "4 Player", value: "4" },
  { name: "5 Player", value: "5" },
  { name: "6 Player", value: "7" },
];
const skillLevels = [
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
    games[0]
  );
  const [selectedGameSize, setSelectedGameSize] = React.useState<Option>(
    maxParty[5]
  );
  const [selectedGameLevel, setSelectedGameLevel] = React.useState<Option>(
    skillLevels[0]
  );

  const {
    handleSubmit,
    control,
    setValue,
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
    console.log("res: ", res);
    dispatch(step1(data));
    if (createCampaignData.imageUrl) {
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
          error={errors.description}
        >
          <Controller
            control={control}
            name="jsonDescription"
            render={({ field }) => (
              <RichTextEditor
                ref={richTextEditorRef}
                onChange={(e) => {
                  field.onChange(e);
                  if (richTextEditorRef?.current) {
                    setValue(
                      "description",
                      richTextEditorRef?.current.getText()
                    );
                  }
                }}
                value={field.value}
                onBlur={field.onBlur}
                name="jsonDescription"
              />
            )}
          />
          <span className="text-red-800">
            {errors.description && errors.description.message}
          </span>
        </InputGroup>

        <FormDivider label="Detailed Information" />

        <InputGroup label="*Time" error={errors?.maxPartySize}>
          <Controller
            name="times"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ChipGroup
                position="center"
                value={value}
                onChange={onChange}
                multiple
              >
                <Chip value="Morning">Morning</Chip>
                <Chip value="Afternoon">Afternoon</Chip>
                <Chip value="Evening">Evening</Chip>
                <Chip value="Night">Night</Chip>
              </ChipGroup>
            )}
          />
        </InputGroup>

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
                  options={games}
                  selected={selectedGameSystem}
                  onChange={(e) => {
                    setSelectedGameSystem(e);
                    field.onChange(e);
                  }}
                />
              )}
            />
            <span className="text-red-800">
              {errors.gameSystem && errors.gameSystem.message}
            </span>
          </InputGroup>
          <InputGroup label="*Maximum Party Size" error={errors?.maxPartySize}>
            <Controller
              control={control}
              name="maxPartySize"
              defaultValue={createCampaignData.maxPartySize}
              render={({ field }) => (
                <Select
                  key="maxPartySize"
                  className={GeneralStyles.selectInput}
                  options={maxParty}
                  selected={selectedGameSize}
                  onChange={(e) => {
                    setSelectedGameSize(e);
                    field.onChange(e.value);
                  }}
                />
              )}
            />
            <span className="text-red-800">
              {errors.maxPartySize && errors.maxPartySize.message}
            </span>
          </InputGroup>
          <InputGroup
            label="*Recommended Skill Level"
            error={errors?.recommendedSkillLevel}
          >
            <Controller
              control={control}
              name="recommendedSkillLevel"
              defaultValue={createCampaignData.recommendedSkillLevel}
              render={({ field }) => (
                <Select
                  key="recommendedSkillLevel"
                  className={GeneralStyles.selectInput}
                  options={skillLevels}
                  selected={selectedGameLevel}
                  onChange={(e) => {
                    setSelectedGameLevel(e);
                    field.onChange(e.value);
                  }}
                />
              )}
            />
            <span className="text-red-800">
              {errors.recommendedSkillLevel &&
                errors.recommendedSkillLevel.message}
            </span>
          </InputGroup>
        </div>

        <Button className="text-white" type="submit">
          Next
        </Button>
      </form>
    </div>
  );
};
