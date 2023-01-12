import { IStep2, step2 } from "@features/createCampaign/createCampaignSlice";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup } from "ui/src/RadioGroup";
import { Header } from "ui/src/Typography";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/store";
import { Checkbox } from "@mantine/core";
import InputGroup from "@components/ui/InputGroup";
import router from "next/router";
import { FormDivider } from "@components/ui/FormDivider";
import { Box, Button, MultiSelect, mediaString } from "ui";
import { RichTextEditor } from "@components/RichTextEditor/RichTextEditor";
import { CustomEditorProps } from "../General/General";
import { LocationSchema } from "../General/schema";
import { createTagOptions } from "@utils/createTagOptions";
import { GetCampaignQuery } from "@generated/graphql";
import { OnlineOptions } from "./OnlineOptions";
import { InPersonOptions } from "./InPersonOptions";
import { useMediaQuery } from "@hooks/useMediaQueries";

interface LocationProps {
  campaign?: GetCampaignQuery["getCampaign"];
}

export const Location = ({ campaign }: LocationProps) => {
  const createCampaignData = useAppSelector((state) => state.createCampaign);
  const dispatch = useAppDispatch();
  let campaignIsOnline = false;

  const isDesktop = useMediaQuery(mediaString.lg);

  // Used to retrieve json object from text editor
  const richTextEditorRef = React.useRef<CustomEditorProps>();

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<IStep2>({
    defaultValues: campaign
      ? {
          combat: campaign.combat,
          puzzles: campaign.puzzles,
          roleplay: campaign.roleplay,
          voipSystem: campaign.voipSystem,
          virtualTable: campaign.virtualTable,
          city: campaign.city,
          state: campaign.state,
          area: campaign.area,
          additionalDetails: campaign.additionalDetails,
          jsonAdditionalDetails: campaign.jsonAdditionalDetails,
          isOnline: campaign.isOnline,
          tags: campaign.tags.map((tag) => createTagOptions(tag)),
        }
      : {
          combat: createCampaignData.combat,
          puzzles: createCampaignData.puzzles,
          roleplay: createCampaignData.roleplay,
          voipSystem: createCampaignData.voipSystem,
          city: createCampaignData.city,
          state: createCampaignData.state,
          area: createCampaignData.area,
          additionalDetails: createCampaignData.additionalDetails,
          jsonAdditionalDetails: createCampaignData.jsonAdditionalDetails,
          isOnline: true,
        },
    resolver: zodResolver(LocationSchema),
  });

  const onInvalid = (errors) => {
    console.log("errors: ", errors);
  };

  const onSubmit: SubmitHandler<IStep2> = async (data) => {
    dispatch(step2(data));
    reset();
    if (router.pathname.includes("editcampaign")) {
      return await router.push(`/user/editcampaign/preview?id=${campaign.id}`);
    }
    return await router.push("./preview");
  };

  const onBack = React.useCallback(
    (e) => {
      e.preventDefault();
      if (router.pathname.includes("editcampaign")) {
        return router.push(`/user/editcampaign/general?id=${campaign.id}`);
      }
      return router.push(`./general`);
    },
    [campaign?.id]
  );

  // Only do this if campaign tags does not exist
  useEffect(() => {
    if (!campaign?.tags) {
      const newGameSystemTag = createTagOptions(createCampaignData.gameSystem);
      const newCampaignTypeTag = createTagOptions(
        createCampaignData.campaignType
      );
      setValue("tags", [newGameSystemTag, newCampaignTypeTag]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  campaignIsOnline = watch("isOnline");
  const tags = watch("tags");

  const locationOptions = campaignIsOnline ? (
    <OnlineOptions
      control={control}
      errors={errors}
      setValue={setValue}
      tags={tags}
    />
  ) : (
    <InPersonOptions
      control={control}
      errors={errors}
      setValue={setValue}
      tags={tags}
    />
  );

  return (
    <>
      <div className="mt-8">
        <Header
          as="h1"
          size="4xl"
          color="loContrast"
          className="font-oldFenris"
        >
          Location
        </Header>
      </div>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <InputGroup
          className="my-8"
          label="*Domain of the campaign"
          error={errors?.isOnline}
        >
          <Controller
            control={control}
            name="isOnline"
            render={({ field }) => (
              <Checkbox
                styles={{
                  label: { color: "white" },
                }}
                label="Is Online?"
                color="yellow"
                size="lg"
                onChange={(e) => field.onChange(e)}
                defaultChecked={campaignIsOnline}
                checked={field.value}
              />
            )}
          />
        </InputGroup>
        {locationOptions}

        <FormDivider label="Extras" />

        <InputGroup
          className="my-8"
          label="*Roleplay?"
          error={errors?.roleplay}
        >
          <Controller
            control={control}
            name="roleplay"
            render={({ field: { onChange, value } }) => (
              <RadioGroup
                direction="row"
                height={!isDesktop ? "25px" : "100px"}
                onChange={onChange}
                options={[
                  {
                    label: "Low",
                    value: "Low",
                  },
                  {
                    label: "Medium",
                    value: "Medium",
                  },
                  {
                    label: "High",
                    value: "High",
                  },
                ]}
                value={value}
                width={!isDesktop ? "50px" : "250px"}
              />
            )}
          />
        </InputGroup>
        <InputGroup className="my-8" label="*Combat?" error={errors?.combat}>
          <Controller
            control={control}
            name="combat"
            render={({ field: { onChange, value } }) => (
              <RadioGroup
                direction="row"
                height={!isDesktop ? "25px" : "100px"}
                onChange={onChange}
                options={[
                  {
                    label: "Low",
                    value: "Low",
                  },
                  {
                    label: "Medium",
                    value: "Medium",
                  },
                  {
                    label: "High",
                    value: "High",
                  },
                ]}
                value={value}
                width={!isDesktop ? "50px" : "250px"}
              />
            )}
          />
        </InputGroup>
        <InputGroup className="my-8" label="*Puzzles?" error={errors?.puzzles}>
          <Controller
            control={control}
            name="puzzles"
            render={({ field: { onChange, value } }) => (
              <RadioGroup
                direction="row"
                height={!isDesktop ? "25px" : "100px"}
                onChange={onChange}
                options={[
                  {
                    label: "Low",
                    value: "Low",
                  },
                  {
                    label: "Medium",
                    value: "Medium",
                  },
                  {
                    label: "High",
                    value: "High",
                  },
                ]}
                value={value}
                width={!isDesktop ? "50px" : "250px"}
              />
            )}
          />
        </InputGroup>

        <InputGroup label="Tags">
          <Controller
            control={control}
            name="tags"
            render={({ field: { onChange, value, ref } }) => (
              <MultiSelect onChange={onChange} value={value} ref={ref} />
            )}
          />
        </InputGroup>

        <InputGroup
          className="my-12"
          label="Additional Details"
          error={errors.additionalDetails}
        >
          <Controller
            control={control}
            name="jsonAdditionalDetails"
            render={({ field }) => (
              <RichTextEditor
                ref={richTextEditorRef}
                onChange={(e) => {
                  field.onChange(e);
                  if (richTextEditorRef?.current) {
                    const currentText = richTextEditorRef?.current.getText();
                    if (currentText) {
                      // Reset error if text is valid
                      clearErrors("additionalDetails");
                      setValue("additionalDetails", currentText);
                    }
                  }
                }}
                value={field.value}
                onBlur={field.onBlur}
                name="jsonAdditionalDetails"
                error={errors.additionalDetails?.message}
              />
            )}
          />
          <span className="text-red-800">
            {errors.additionalDetails && errors.additionalDetails.message}
          </span>
        </InputGroup>

        <Box css={{ marginTop: "$8" }}>
          <Button
            css={{ marginRight: "$8" }}
            size="large"
            onClick={onBack}
            type="button"
          >
            Previous
          </Button>

          <Button size="large" type="submit">
            Preview
          </Button>
        </Box>
      </form>
    </>
  );
};
