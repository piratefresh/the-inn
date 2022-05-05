import { IStep1 } from "@features/createCampaign/createCampaignSlice";
import { Controller, useForm } from "react-hook-form";
import { Typography } from "ui";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";
import { Editor } from "@tiptap/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateImageSignatureMutation } from "generated/graphql";
import { useAppDispatch, useAppSelector } from "@store/store";
import { InputWrapper } from "@mantine/core";
import { Input } from "@components/ui/Input";
import createCampaignStyles from "./CreateCampaign.module.css";

const schema = yup
  .object({
    title: yup
      .string()
      .required("Title is required")
      .min(1, "Title cannot be empty"),
    description: yup
      .string()
      .required("Description is required")
      .min(1, "Description cannot be empty"),
    image: yup
      .string()
      .required("Header image is required")
      .min(1, "Header cant be empty"),
    gameSystem: yup.string().required("Please choose a game system"),
    maxPartySize: yup.mixed().required("Party size needs be choosen"),
    recommendedSkillLevel: yup
      .string()
      .required("Recommended skill level cant be empty"),
  })
  .required();

export const CreateCampaigns = () => {
  const router = useRouter();
  const richTextEditorRef = React.useRef<Editor>();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [, createImageSignature] = useCreateImageSignatureMutation();
  const dispatch = useAppDispatch();
  const createCampaignData = useAppSelector((state) => state.createCampaign);
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IStep1>({
    defaultValues: createCampaignData,
    resolver: yupResolver(schema),
  });

  const imageFile = watch("image");

  const handleOpenFile = React.useCallback(() => {
    if (fileInputRef?.current) {
      fileInputRef.current.click();
    }
  }, []);

  const previewComponent =
    (imageFile && imageFile.length > 0) || createCampaignData?.imageUrl ? (
      <div
        className={createCampaignStyles.previewComponent}
        onClick={handleOpenFile}
      >
        <Image
          src={
            imageFile && imageFile.length > 0
              ? URL.createObjectURL(imageFile[0])
              : createCampaignData.imageUrl
          }
          alt="Header Image"
          layout="fill"
          objectFit="cover"
        />
      </div>
    ) : null;

  return (
    <div className="relative mx-auto" style={{ width: "700px" }}>
      <div className="mt-8">
        <Typography.Title level={1} className="font-serif text-white">
          Welcome to the inn, fellow adventurer
        </Typography.Title>
      </div>

      <InputWrapper className="my-8" label="" error={errors?.image}>
        <Controller
          control={control}
          name="image"
          render={({ field }) => (
            <Input.File
              ref={fileInputRef}
              type="file"
              onChange={(e) => {
                const { files } = e.currentTarget;
                if (files) {
                  field.onChange(e.currentTarget.files);
                }
              }}
            />
          )}
        />
        <span className="text-red-800">
          {errors.image && errors.image.message}
        </span>
      </InputWrapper>
    </div>
  );
};
