import { Button, Input, Text, Section } from "ui";
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
      facebook: prepandHttps(user.facebook),
      instagram: prepandHttps(user.instagram),
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
    console.log("data: ", data);
    await updateUserProfile({
      updateProfileArgs: { ...data },
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
            Contact Information. Don&apos;t worry we won&apos;t spam you
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
