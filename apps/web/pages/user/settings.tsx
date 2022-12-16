import React from "react";
import { CustomEditorProps } from "@components/Campaings/CreateCampaigns/General/General";
import { RichTextEditor } from "@components/RichTextEditor/RichTextEditor";
import InputGroup from "@components/ui/InputGroup";
import { useGetUserQuery } from "@generated/graphql";
import { UserPageLayout } from "@layouts/UserPageLayout";
import { useSession } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";
import { Input, styled, Text } from "ui";

interface AccountSettingsProps {
  firstName: string;
  lastName: string;
  email: string;
  aboutMe?: string;
}

const Section = styled("section", {
  padding: "$8",
  margin: "$16 0px",
  backgroundColor: "hsl(0, 0%, 9%)",
  border: "1px solid $yellowBrand",
  borderRadius: "$md",
});

const SettingsPage = () => {
  const { data: session, status } = useSession();
  const [{ data, fetching }] = useGetUserQuery({
    variables: {
      id: session?.id,
    },
  });

  const defaultValues = React.useMemo(() => {
    return {
      ...data?.getUser,
    };
  }, [data]);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AccountSettingsProps>({
    defaultValues,
  });

  const richTextEditorRef = React.useRef<CustomEditorProps>();
  const onSubmit = (data) => console.log(data);

  return (
    <form
      className="max-w-7xl mx-auto my-16 grid"
      style={{ gridTemplateColumns: "auto", gridAutoRows: "max-content" }}
    >
      <div>
        <Text size="6xl" color="lightContrast">
          Settings
        </Text>
      </div>
      <div>
        <Section>
          <InputGroup className="my-12" label="First Name">
            <Controller
              name="firstName"
              control={control}
              rules={{ required: true }}
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
              rules={{ required: true }}
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
        </Section>
        <Section>
          <InputGroup className="my-12" label="Email">
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
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
        </Section>
        <Section>
          <InputGroup className="my-12" label="About Me">
            <Controller
              name="aboutMe"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <RichTextEditor
                  ref={richTextEditorRef}
                  onChange={(e) => {
                    field.onChange(e);
                    if (richTextEditorRef?.current) {
                      const currentText = richTextEditorRef?.current.getText();
                      if (currentText) {
                        // Reset error if text is valid
                        // clearErrors("summary");
                        // setValue("summary", currentText);
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
