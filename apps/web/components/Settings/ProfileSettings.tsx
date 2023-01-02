import { CustomEditorProps } from "@components/Campaings/CreateCampaigns/General/General";
import { RichTextEditor } from "@components/RichTextEditor/RichTextEditor";
import InputGroup from "@components/ui/InputGroup";
import { useUpdateUserProfileMutation } from "@generated/graphql";
import { createTagOptions, TagOptions } from "@utils/createTagOptions";
import { Section } from "pages/user/settings";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SettingsProps } from "Types/Settings";
import { MultiSelect, Button, Text } from "ui";

interface ProfileSettingsProps extends SettingsProps {}

interface ProfileFormProps {
  aboutMe: string;
  htmlAboutMe: string;
  tags: TagOptions[];
}

export const ProfileSettings = ({ session, user }: ProfileSettingsProps) => {
  const richTextEditorRef = React.useRef<CustomEditorProps>();

  const [_, updateUserProfile] = useUpdateUserProfileMutation();

  const defaultValues: ProfileFormProps = React.useMemo(() => {
    return {
      aboutMe: user.aboutMe,
      htmlAboutMe: user.htmlAboutMe,
      tags: user.tags?.map((tag) => createTagOptions(tag)),
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
  } = useForm<ProfileFormProps>({
    defaultValues,
  });

  const onInvalid = (errors) => {
    console.log("errors: ", errors);
  };

  const onSubmit: SubmitHandler<ProfileFormProps> = async (data) => {
    await updateUserProfile({
      updateProfileArgs: {
        ...data,
        tags:
          data.tags?.length > 0 ? data.tags.map((option) => option.value) : [],
      },
      updatePasswordArgs: null,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <Section className="flex flex-col gap-8">
        <div>
          <Text size="xl" weight="bold" color="lightContrast">
            Descriptions
          </Text>
          <Text color="loContrast">
            A more in-depth description about yourself, the more detailed, the
            more others will get a better idea of you and how you fit with them.
            Will be shown in your user page.
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
                      const currentText = richTextEditorRef?.current.getText();
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
        </div>
      </Section>

      <Section className="flex flex-col my-16 gap-8">
        <div>
          <Text size="xl" weight="bold" color="lightContrast">
            Tags
          </Text>
          <Text color="loContrast">
            Tags are used for searching, the better descriptive tags, the easier
            user will find you
          </Text>
        </div>
        <InputGroup label="Tags">
          <Controller
            control={control}
            name="tags"
            render={({ field: { onChange, value, ref } }) => (
              <MultiSelect onChange={onChange} value={value} ref={ref} />
            )}
          />
        </InputGroup>
      </Section>
    </form>
  );
};
