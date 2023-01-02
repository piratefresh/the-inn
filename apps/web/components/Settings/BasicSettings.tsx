import { Section } from "pages/user/settings";
import { Button, Input, Text } from "ui";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import InputGroup from "@components/ui/InputGroup";
import {
  useGetUserQuery,
  useUpdateUserProfileMutation,
} from "@generated/graphql";
import React from "react";
import { SettingsProps } from "Types/Settings";

interface AccountSettingsProps {
  firstName?: string;
  lastName?: string;
  image?: File;
  email?: string;
  twitch?: string;
  youtube?: string;
  discord?: string;
  facebook?: string;
  instagram?: string;
  password?: string;
  newPassword?: string;
}

interface BasicSettingsProps extends SettingsProps {}

function prepandHttps(link: string) {
  return link?.indexOf("://") === -1 ? "http://" + link : link;
}

export const BasicSettings = ({ session, user }: BasicSettingsProps) => {
  const [_, updateUserProfile] = useUpdateUserProfileMutation();

  const defaultValues: AccountSettingsProps = React.useMemo(() => {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      twitch: prepandHttps(user.twitch),
      youtube: prepandHttps(user.youtube),
      discord: prepandHttps(user.discord),
      faebook: prepandHttps(user.facebook),
      instagram: prepandHttps(user.instagram),
      password: "randompassword",
    };
  }, [user]);

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

  const onInvalid = (errors) => {
    console.log("errors: ", errors);
  };

  const onSubmit: SubmitHandler<AccountSettingsProps> = async (data) => {
    await updateUserProfile({
      updateProfileArgs: { ...data },
      updatePasswordArgs: null,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="text-black">
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
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  gold
                  size="medium"
                  value={field.value}
                  onChange={field.onChange}
                  type="password"
                />
              )}
            />
          </InputGroup>
          <InputGroup className="my-12" label="New Password">
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <Input
                  gold
                  size="medium"
                  value={field.value}
                  onChange={field.onChange}
                  type="password"
                />
              )}
            />
          </InputGroup>
          <InputGroup className="my-12" label="Confirm New Password">
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <Input
                  gold
                  size="medium"
                  value={field.value}
                  onChange={field.onChange}
                  type="password"
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
                />
              )}
            />
          </InputGroup>
        </div>
      </Section>
      <Section>
        <Button
          size="large"
          type="submit"
          onClick={() => console.log("clicked")}
        >
          Save
        </Button>
      </Section>
    </form>
  );
};
