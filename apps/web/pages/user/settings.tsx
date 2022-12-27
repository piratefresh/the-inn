import React from "react";
import { CustomEditorProps } from "@components/Campaings/CreateCampaigns/General/General";
import { RichTextEditor } from "@components/RichTextEditor/RichTextEditor";
import InputGroup from "@components/ui/InputGroup";
import { useGetUserQuery } from "@generated/graphql";
import { UserPageLayout } from "@layouts/UserPageLayout";
import { useSession } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";
import { Button, Input, styled, Text } from "ui";
import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { nextAuthOptions } from "pages/api/auth/[...nextauth]";

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
        <Section
          className="grid gap-8"
          style={{ gridTemplateColumns: "1fr 2fr" }}
        >
          <div>
            <Text size="xl" weight="bold" color="lightContrast">
              Basic Information
            </Text>
            <Text color="loContrast">
              This will be displayed on your profile
            </Text>
          </div>
          <div>
            <InputGroup label="First Name">
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
          </div>
        </Section>
        <Section
          className="grid gap-8"
          style={{ gridTemplateColumns: "1fr 2fr" }}
        >
          <div>
            <Text size="xl" weight="bold" color="lightContrast">
              Contact Information
            </Text>
            <Text color="loContrast">Ways for people to connect to you</Text>
          </div>
          <div>
            <InputGroup label="Email">
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
                name="aboutMe"
                control={control}
                rules={{ required: true }}
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
          </div>
        </Section>

        <Section className="flex justify-end">
          <Button size="large">Save</Button>
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
