import React from "react";
import { CustomEditorProps } from "@components/Campaings/CreateCampaigns/General/General";
import { RichTextEditor } from "@components/RichTextEditor/RichTextEditor";
import InputGroup from "@components/ui/InputGroup";
import {
  useCreateImageSignatureMutation,
  useGetUserQuery,
  useUpdateUserProfileMutation,
} from "@generated/graphql";
import { UserPageLayout } from "@layouts/UserPageLayout";
import { useSession } from "next-auth/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, Input, MultiSelect, styled, Text } from "ui";
import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import Image from "next/image";
import { nextAuthOptions } from "pages/api/auth/[...nextauth]";
import { AvatarUpload } from "@components/AvatarUpload";
import { uploadImage } from "@utils/uploadImage";

interface AccountSettingsProps {
  firstName?: string;
  lastName?: string;
  image?: File;
  email?: string;
  aboutMe?: string;
  htmlAboutMe?: string;
  twitch?: string;
  youtube?: string;
  discord?: string;
  facebook?: string;
  instagram?: string;
  tags?: string[];
}

const Section = styled("section", {
  padding: "$8",
  margin: "$16 0px",
  backgroundColor: "hsl(0, 0%, 9%)",
  border: "1px solid $yellowBrand",
  borderRadius: "$md",
});

const StyledImage = styled(Image, {
  borderRadius: "$full",
  border: "10px solid $yellowBrand",
});

export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    req,
    res,
    nextAuthOptions(req, res)
  );
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}

const SettingsPage = () => {
  const { data: session, status } = useSession();
  const [{ data, fetching }] = useGetUserQuery({
    variables: {
      id: session?.id,
    },
  });

  const [_, updateUserProfile] = useUpdateUserProfileMutation();

  const [, createImageSignature] = useCreateImageSignatureMutation();

  const defaultValues = React.useMemo(() => {
    return {
      ...data?.getUser,
    };
  }, [data]);

  const {
    clearErrors,
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AccountSettingsProps>({
    defaultValues,
  });

  const richTextEditorRef = React.useRef<CustomEditorProps>();

  const onInvalid = (errors) => {
    console.log("errors: ", errors);
  };

  const onSubmit: SubmitHandler<AccountSettingsProps> = async (data) => {
    let imageUrl = null;
    if (data.image) {
      const { data: signatureData } = await createImageSignature({});
      const { signature, timestamp } = signatureData.createImageSignature;
      imageUrl = await uploadImage(data.image, signature, timestamp);
    }

    await updateUserProfile({
      updateProfileArgs: { ...data, imageUrl },
      updatePasswordArgs: null,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className="max-w-7xl mx-auto my-16 grid"
      style={{ gridTemplateColumns: "auto", gridAutoRows: "max-content" }}
    >
      <div className="flex flex-row items-center gap-16">
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <AvatarUpload
              defaultSrc="https://res.cloudinary.com/film-it/image/upload/v1672260036/the-inn/user/3297.webp"
              onChange={field.onChange}
            />
          )}
        />

        <div className="flex flex-col">
          <Text
            size="6xl"
            color="lightContrast"
          >{`${data?.getUser.firstName} ${data?.getUser.lastName}`}</Text>
        </div>
      </div>

      <div>
        <Section
          className="grid gap-8"
          style={{ gridTemplateColumns: "1fr 2fr" }}
        >
          <div>
            <Text size="xl" weight="bold" color="lightContrast">
              Basic Information
            </Text>
            <Text color="loContrast">
              This will be displayed on your profile.
            </Text>
          </div>
          <div>
            <InputGroup label="First Name">
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <Input
                    gold
                    size="medium"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={data?.getUser.firstName}
                  />
                )}
              />
            </InputGroup>
            <InputGroup className="my-12" label="Last Name">
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <Input
                    gold
                    size="medium"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={data?.getUser.lastName}
                  />
                )}
              />
            </InputGroup>
          </div>
        </Section>

        <Section
          className="grid gap-8"
          style={{ gridTemplateColumns: "1fr 2fr" }}
        >
          <div>
            <Text size="xl" weight="bold" color="lightContrast">
              Password
            </Text>
            <Text color="loContrast">
              Please enter your current password to change your password
            </Text>
          </div>
          <div>
            <InputGroup label="Current Password">
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <Input
                    gold
                    size="medium"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={data?.getUser.firstName}
                  />
                )}
              />
            </InputGroup>
            <InputGroup className="my-12" label="New Password">
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <Input
                    gold
                    size="medium"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={data?.getUser.lastName}
                  />
                )}
              />
            </InputGroup>
            <InputGroup className="my-12" label="Confirm New Password">
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <Input
                    gold
                    size="medium"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={data?.getUser.lastName}
                  />
                )}
              />
            </InputGroup>
          </div>
        </Section>

        <Section
          className="grid gap-8"
          style={{ gridTemplateColumns: "1fr 2fr" }}
        >
          <div>
            <Text size="xl" weight="bold" color="lightContrast">
              Contact Information. Don't worry we won't spam you
            </Text>
            <Text color="loContrast">Ways for people to connect to you</Text>
          </div>
          <div>
            <InputGroup label="Email">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    gold
                    size="medium"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={data?.getUser.email}
                  />
                )}
              />
            </InputGroup>
            <InputGroup className="my-12" label="Twitch">
              <Controller
                name="twitch"
                control={control}
                render={({ field }) => (
                  <Input
                    gold
                    size="medium"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={data?.getUser.email}
                  />
                )}
              />
            </InputGroup>
            <InputGroup className="my-12" label="Youtube">
              <Controller
                name="youtube"
                control={control}
                render={({ field }) => (
                  <Input
                    gold
                    size="medium"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={data?.getUser.email}
                  />
                )}
              />
            </InputGroup>
            <InputGroup className="my-12" label="Facebook">
              <Controller
                name="facebook"
                control={control}
                render={({ field }) => (
                  <Input
                    gold
                    size="medium"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={data?.getUser.email}
                  />
                )}
              />
            </InputGroup>
            <InputGroup className="my-12" label="Instagram">
              <Controller
                name="instagram"
                control={control}
                render={({ field }) => (
                  <Input
                    gold
                    size="medium"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={data?.getUser.email}
                  />
                )}
              />
            </InputGroup>
          </div>
        </Section>
        <Section className="flex flex-col gap-8">
          <div>
            <Text size="xl" weight="bold" color="lightContrast">
              Descriptions
            </Text>
            <Text color="loContrast">
              A more in-depth description about yourself, the more detailed, the
              more others will get a better idea of you and how you fit with
              them. Will be shown in your user page.
            </Text>
          </div>
          <div>
            <InputGroup label="About Me">
              <Controller
                name="htmlAboutMe"
                control={control}
                render={({ field }) => (
                  <RichTextEditor
                    ref={richTextEditorRef}
                    onChange={(e) => {
                      field.onChange(e);
                      if (richTextEditorRef?.current) {
                        const currentText =
                          richTextEditorRef?.current.getText();
                        if (currentText) {
                          // Reset error if text is valid
                          clearErrors("aboutMe");
                          setValue("aboutMe", currentText);
                        }
                      }
                    }}
                    value={field.value}
                    onBlur={field.onBlur}
                    name="aboutMe"
                  />
                )}
              />
            </InputGroup>

            <InputGroup className="my-12" label="Tags">
              <Controller
                control={control}
                name="tags"
                render={({ field: { onChange, value, ref } }) => (
                  <MultiSelect onChange={onChange} value={value} ref={ref} />
                )}
              />
            </InputGroup>
          </div>
        </Section>

        <Section className="flex justify-end relative">
          <Button
            size="large"
            type="submit"
            onClick={() => console.log("clicked")}
          >
            Save
          </Button>
        </Section>
      </div>
    </form>
  );
};

SettingsPage.layoutProps = {
  meta: {
    title: "User Profile",
  },
  Layout: UserPageLayout,
};

export default SettingsPage;
