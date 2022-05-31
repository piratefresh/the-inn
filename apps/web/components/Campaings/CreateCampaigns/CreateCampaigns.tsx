import { IStep1 } from "@features/createCampaign/createCampaignSlice";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Typography } from "ui";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";
import { Editor, JSONContent } from "@tiptap/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateImageSignatureMutation } from "generated/graphql";
import { useAppDispatch, useAppSelector } from "@store/store";
import { Button, InputWrapper } from "@mantine/core";
import { Input } from "@components/ui/Input";
import createCampaignStyles from "./CreateCampaign.module.css";
import { Dropzone } from "@components/Dropzone/Dropzone";
import InputGroup from "@components/ui/InputGroup";
import { RichTextEditor } from "@components/RichTextEditor/RichTextEditor";

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

export const CreateCampaigns = () => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const richTextEditorRef = React.useRef<Editor>();
  const createCampaignData = useAppSelector((state) => state.createCampaign);

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IStep1>({
    defaultValues: createCampaignData,
  });

  const onSubmit: SubmitHandler<IStep1> = async (data) => {
    console.log("data: ", data);
  };

  return (
    <div className="relative mx-auto" style={{ width: "700px" }}>
      <div className="mt-8">
        <Typography.Title level={1} className="font-serif text-white">
          Welcome to the inn, fellow adventurer
        </Typography.Title>
      </div>

      {/* <InputWrapper className="my-8" label="" error={errors?.image}> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup className="my-8" label="*Title" error={errors?.title}>
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

        <InputGroup
          className="my-8"
          label="*Header Image"
          error={errors?.image}
        ></InputGroup>
        <Controller
          name="image"
          control={control}
          render={({ field: { onChange } }) => (
            <Dropzone
              onChange={(file: File) => {
                console.log("file: ", file);
                onChange(file);
              }}
            />
          )}
        />

        <Button className="text-white" type="submit">
          Next
        </Button>
      </form>
    </div>
  );
};
