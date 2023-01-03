import { AvatarUpload } from "@components/AvatarUpload";
import {
  useCreateImageSignatureMutation,
  useUpdateUserProfileMutation,
} from "@generated/graphql";
import { uploadImage } from "@utils/uploadImage";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SettingsProps } from "Types/Settings";
import { Text } from "ui";

interface HeaderFormProps {
  image: File;
  imageUrl?: string;
}

export const HeaderSettings = ({ session, user }: SettingsProps) => {
  const [_, updateUserProfile] = useUpdateUserProfileMutation();

  const [, createImageSignature] = useCreateImageSignatureMutation();

  const refSubmitButtom = React.useRef<HTMLButtonElement>(null);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<HeaderFormProps>({});

  const image = watch("image");

  const onInvalid = (errors) => {
    console.log("errors: ", errors);
  };

  const onSubmit: SubmitHandler<HeaderFormProps> = async (data) => {
    console.log("onSubmit data: ", data);
    let imageUrl = null;
    if (data.image) {
      const { data: signatureData } = await createImageSignature({});
      const { signature, timestamp } = signatureData.createImageSignature;
      imageUrl = await uploadImage(data.image, signature, timestamp);

      console.log("image: ", imageUrl);

      await updateUserProfile({
        updateProfileArgs: { imageUrl: imageUrl.secure_url },
      });
    }
  };

  const handleOnChange = (file: File) => {
    setValue("image", file);
    refSubmitButtom?.current?.click();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className="flex flex-row items-center gap-16"
    >
      <div className="flex flex-col">
        <Controller
          name="imageUrl"
          control={control}
          render={({ field }) => (
            <AvatarUpload
              defaultSrc={user.imageUrl}
              onChange={handleOnChange}
              image={image}
            />
          )}
        />
      </div>

      <div className="flex flex-col">
        <Text
          size="6xl"
          color="lightContrast"
        >{`${user.firstName} ${user.lastName}`}</Text>
      </div>

      <button hidden={true} ref={refSubmitButtom} type={"submit"} />
    </form>
  );
};
