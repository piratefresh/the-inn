import { CustomEditorProps } from "@components/Campaings/CreateCampaigns/General/General";
import { RichTextEditor } from "@components/RichTextEditor/RichTextEditor";
import InputGroup from "@components/ui/InputGroup";
import { useUpdateUserProfileMutation } from "@generated/graphql";
import { createTagOptions, TagOptions } from "@utils/createTagOptions";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SettingsProps } from "Types/Settings";
import { MultiSelect, Text, Input, Button, Section } from "ui";

interface ProfileSettingsProps extends SettingsProps {}

interface ProfileFormProps {
  aboutMe: string;
  htmlAboutMe: string;
  playStyle: string;
  htmlPlayStyle: string;
  gmStyle: string;
  htmlGmStyle: string;
  tags: TagOptions[];
  twitch?: string;
  youtube?: string;
  discord?: string;
  facebook?: string;
  instagram?: string;
}

export const ProfileSettings = ({ session, user }: ProfileSettingsProps) => {
  const richTextEditorRef = React.useRef<CustomEditorProps>();

  const [_, updateUserProfile] = useUpdateUserProfileMutation();

  const defaultValues: ProfileFormProps = React.useMemo(() => {
    return {
      aboutMe: user.aboutMe,
      htmlAboutMe: user.htmlAboutMe,
      playStyle: user.playStyle,
      htmlPlayStyle: user.htmlPlayStyle,
      gmStyle: user.gmStyle,
      htmlGmStyle: user.htmlGmStyle,
      tags: user.tags?.map((tag) => createTagOptions(tag)),
    };
  }, [user]);

  const {
    clearErrors,
    control,
    handleSubmit,
    setValue,
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
      <Section className="flex flex-col gap-8">
        <div>
          <Text size="xl" weight="bold" color="lightContrast">
            Play Style
          </Text>
          <Text color="loContrast">
            A more in-depth description about yourself, the more detailed, the
            more others will get a better idea of you and how you fit with them.
            Will be shown in your user page.
          </Text>
        </div>
        <div>
          <InputGroup label="Play Style">
            <Controller
              name="htmlPlayStyle"
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
                        clearErrors("playStyle");
                        setValue("playStyle", currentText);
                      }
                    }
                  }}
                  value={field.value}
                  onBlur={field.onBlur}
                  name="playStyle"
                />
              )}
            />
          </InputGroup>
        </div>
      </Section>

      <Section className="flex flex-col gap-8">
        <div>
          <Text size="xl" weight="bold" color="lightContrast">
            Gamemaster Style
          </Text>
          <Text color="loContrast">
            A more in-depth description about yourself, the more detailed, the
            more others will get a better idea of you and how you fit with them.
            Will be shown in your user page.
          </Text>
        </div>
        <div>
          <InputGroup label="Game Master Style">
            <Controller
              name="htmlGmStyle"
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
                        clearErrors("gmStyle");
                        setValue("gmStyle", currentText);
                      }
                    }
                  }}
                  value={field.value}
                  onBlur={field.onBlur}
                  name="gmStyle"
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

      <Section
        className="grid gap-8"
        style={{ gridTemplateColumns: "1fr 2fr" }}
      >
        <div>
          <Text size="xl" weight="bold" color="lightContrast">
            Socials
          </Text>
          <Text color="loContrast">For user to find you on other pages</Text>
        </div>
        <section className="text-black">
          <InputGroup className="my-4" label="Twitch">
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
          <InputGroup className="my-4" label="Youtube">
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
          <InputGroup className="my-4" label="Facebook">
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
          <InputGroup className="my-4" label="Instagram">
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
        </section>
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
