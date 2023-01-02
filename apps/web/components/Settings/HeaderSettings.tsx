import { AvatarUpload } from "@components/AvatarUpload";
import { AvatarUploadDialog } from "@components/AvatarUpload/AvatarUploadDialog";
import {
  useCreateImageSignatureMutation,
  useUpdateUserProfileMutation,
} from "@generated/graphql";
import { uploadImage } from "@utils/uploadImage";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SettingsProps } from "Types/Settings";
import { Button, Dialog, Text } from "ui";

interface HeaderFormProps {
  image: File;
  imageUrl?: string;
}

export const HeaderSettings = ({ session, user }: SettingsProps) => {
  const [open, setOpen] = React.useState(false);
  const [_, updateUserProfile] = useUpdateUserProfileMutation();

  const [, createImageSignature] = useCreateImageSignatureMutation();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<HeaderFormProps>({});

  const onInvalid = (errors) => {
    console.log("errors: ", errors);
  };

  const onSubmit: SubmitHandler<HeaderFormProps> = async (data) => {
    let imageUrl = null;
    if (data.image) {
      const { data: signatureData } = await createImageSignature({});
      const { signature, timestamp } = signatureData.createImageSignature;
      imageUrl = await uploadImage(data.image, signature, timestamp);

      console.log("image: ", imageUrl);

      await updateUserProfile({
        updateProfileArgs: { imageUrl: imageUrl.secure_url },
        updatePasswordArgs: null,
      });
    }
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
              onChange={(file) => setValue("image", file)}
            />
          )}
        />
        <Button
          size="large"
          type="submit"
          className="my-4"
          onClick={() => setOpen(true)}
        >
          Save New Profile Picture
        </Button>
      </div>

      <div className="flex flex-col">
        <Text
          size="6xl"
          color="lightContrast"
        >{`${user.firstName} ${user.lastName}`}</Text>
      </div>
      <Dialog onOpen={setOpen} open={open} title="Avatar Upload" description="">
        <AvatarUploadDialog />
      </Dialog>
    </form>
  );
};
