import {
  IStep1,
  setImageUrl,
  step1,
} from "@features/createCampaign/createCampaignSlice";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Typography } from "ui";
import React from "react";
import { Editor } from "@tiptap/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@store/store";
import { Button, Select } from "@mantine/core";
import { Input } from "@components/ui/Input";
import { Dropzone } from "@components/Dropzone/Dropzone";
import InputGroup from "@components/ui/InputGroup";
import { RichTextEditor } from "@components/RichTextEditor/RichTextEditor";
import { useItemFinishListener, useUploady } from "@rpldy/uploady";
import router from "next/router";
import { FormDivider } from "@components/ui/FormDivider";
import GeneralStyles from "./General.module.css";

// const schema = yup
//   .object({
//     title: yup
//       .string()
//       .required("Title is required")
//       .min(1, "Title cannot be empty"),
//     description: yup
//       .string()
//       .required("Description is required")
//       .min(1, "Description cannot be empty"),
//     image: yup
//       .string()
//       .required("Header image is required")
//       .min(1, "Header cant be empty"),
//     gameSystem: yup.string().required("Please choose a game system"),
//     maxPartySize: yup.mixed().required("Party size needs be choosen"),
//     recommendedSkillLevel: yup
//       .string()
//       .required("Recommended skill level cant be empty"),
//   })
//   .required();

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

export const General = () => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const richTextEditorRef = React.useRef<Editor>();
  const { processPending } = useUploady();
  const createCampaignData = useAppSelector((state) => state.createCampaign);
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IStep1>({
    defaultValues: createCampaignData,
  });

  useItemFinishListener((item) => {
    console.log("item: ", item);
    const secureUrl = item.uploadResponse?.data.secure_url;
    setValue("imageUrl", secureUrl);

    dispatch(
      setImageUrl({
        imageUrl: secureUrl,
      })
    );
  });

  const onSubmit: SubmitHandler<IStep1> = async (data) => {
    const res = processPending();

    dispatch(step1(data));
    router.push("./location");
  };

  return (
    <div className="relative mx-auto" style={{ width: "1024px" }}>
      <div className="mt-8">
        <Typography.Title level={1} className="font-serif text-white">
          Welcome to the inn, fellow adventurer
        </Typography.Title>
      </div>

      {/* <InputWrapper className="my-8" label="" error={errors?.image}> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="image"
          control={control}
          render={({ field: { onChange } }) => (
            <Dropzone
              onChange={(file: File) => {
                onChange(file);
              }}
            />
          )}
        />

        <InputGroup
          className="my-8"
          label="*Campaign Name"
          error={errors?.title}
        >
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <Input
                placeholder="title"
                value={field.value}
                onChange={(e) => field.onChange(e)}
              />
            )}
          />
        </InputGroup>

        <InputGroup
          className="my-8"
          label="*What kinda quest do you have for our adventurers?"
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

        <div className="grid grid-cols-3 gap-4 my-8">
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
