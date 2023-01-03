import { Button, Input, Text, Section } from "ui";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import InputGroup from "@components/ui/InputGroup";
import { useUpdateUserPasswordMutation } from "@generated/graphql";
import React from "react";
import z from "zod";
import { SettingsProps } from "Types/Settings";
import { zodResolver } from "@hookform/resolvers/zod";

interface PasswordFormProps {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

interface PasswordSettingsProps extends SettingsProps {}

export const UpdatePasswordSchema = z
  .object({
    oldPassword: z.string(),
    newPassword: z.string().min(4),
    confirmPassword: z.string().min(4),
  })
  .superRefine(({ confirmPassword, oldPassword }, ctx) => {
    if (confirmPassword !== oldPassword) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
      });
    }
  });

export const PasswordSettings = ({ session, user }: PasswordSettingsProps) => {
  const [_, updateUserPassword] = useUpdateUserPasswordMutation();

  const defaultValues: PasswordFormProps = React.useMemo(() => {
    return {
      oldPassword: "randompassword",
    };
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormProps>({
    defaultValues,
    resolver: zodResolver(UpdatePasswordSchema),
  });

  const onInvalid = (errors) => {
    console.log("errors: ", errors);
  };

  const onSubmit: SubmitHandler<PasswordFormProps> = async (data) => {
    await updateUserPassword({
      updatePasswordArgs: { ...data },
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
            Password
          </Text>
          <Text color="loContrast">
            Please enter your current password to change your password
          </Text>
        </div>
        <div>
          <InputGroup label="Current Password">
            <Controller
              name="oldPassword"
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
              name="confirmPassword"
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
