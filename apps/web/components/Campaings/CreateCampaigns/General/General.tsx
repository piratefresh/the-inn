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
import { Button, Select } from "@mantine/core";
import { Input } from "@components/ui/Input";
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
  { label: "Dungeons and Dragons", value: "Dungeons and Dragons" },
  { label: "Pathfinder", value: "Pathfinder" },
  { label: "Star Wars FFG", value: "Star Wars FFG" },
];
const maxParty = [
  { label: "1 Player", value: "1" },
  { label: "2 Player", value: "2" },
  { label: "3 Player", value: "3" },
  { label: "4 Player", value: "4" },
  { label: "5 Player", value: "5" },
  { label: "6 Player", value: "7" },
];
const skillLevels = [
  { label: "All", value: "All" },
  { label: "Beginner", value: "Beginner" },
  { label: "Advanced", value: "Advanced" },
];

const DropZoneButton = asUploadButton(ClickableDropZone);

export const General = () => {
  const richTextEditorRef = React.useRef<CustomEditorProps>();
  const { processPending } = useUploady();
  const createCampaignData = useAppSelector((state) => state.createCampaign);
  const dispatch = useAppDispatch();

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
        <Header size="4xl" className="text-white uppercase font-oldFenris">
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

        <div className="grid grid-cols-2 gap-12 my-12">
          <InputGroup label="*Game System" error={errors?.gameSystem}>
            <Controller
              control={control}
              name="gameSystem"
              defaultValue={createCampaignData.gameSystem}
              render={({ field }) => (
                <Select
                  className={
                    !errors.gameSystem
                      ? GeneralStyles.selectInput
                      : GeneralStyles.selectInputError
                  }
                  name="gameSystem"
                  data={games}
                  value={field.value}
                  onChange={(e) => field.onChange(e)}
                  defaultValue=""
                  placeholder="Game Systems"
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
                  className={GeneralStyles.selectInput}
                  name="maxPartySize"
                  data={maxParty}
                  value={field.value.toString()}
                  onChange={(e) => field.onChange(e)}
                  placeholder="Max party size"
                  defaultValue="All"
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
                  className={GeneralStyles.selectInput}
                  name="recommendedSkillLevel"
                  data={skillLevels}
                  value={field.value}
                  onChange={(e) => field.onChange(e)}
                  defaultValue="All"
                  placeholder="Skill level"
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
