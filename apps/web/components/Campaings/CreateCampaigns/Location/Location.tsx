import { IStep2, step2 } from "@features/createCampaign/createCampaignSlice";
import {
  Control,
  Controller,
  FormState,
  SubmitHandler,
  useForm,
  UseFormSetValue,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup } from "ui/src/RadioGroup";
import { Header } from "ui/src/Typography";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/store";
import { Checkbox } from "@mantine/core";
import InputGroup from "@components/ui/InputGroup";
import router from "next/router";
import { FormDivider } from "@components/ui/FormDivider";
import { Box, Button, Input, MultiSelect } from "ui";
import { DevTool } from "@hookform/devtools";
import { RichTextEditor } from "@components/RichTextEditor/RichTextEditor";
import { CustomEditorProps } from "../General/General";
import { LocationSchema } from "../General/schema";
import { Geocoder } from "@components/ui/Geocoder";
import { createTagOptions, TagOptions } from "@utils/createTagOptions";

interface OnlineOptions {
  control: Control<IStep2, any>;
  errors: FormState<IStep2>["errors"];
  setValue?: UseFormSetValue<IStep2>;
}

const OnlineOptions = ({ control, errors }: OnlineOptions) => (
  <div className="grid grid-cols-2 gap-8">
    <InputGroup
      className="my-8"
      label="*Voice System"
      error={errors?.voipSystem}
    >
      <Controller
        control={control}
        name="voipSystem"
        render={({ field }) => (
          <Input
            gold
            placeholder="Voice Chat System (Discord)"
            value={field.value}
            onChange={(e) => {
              field.onChange(e);
            }}
          />
        )}
      />
    </InputGroup>
    <InputGroup
      className="my-8"
      label="*Virutal Table Top (VTT)"
      error={errors?.virtualTable}
    >
      <Controller
        control={control}
        name="virtualTable"
        render={({ field }) => (
          <Input
            gold
            placeholder="Virtual Table Top"
            value={field.value}
            onChange={(e) => {
              field.onChange(e);
            }}
          />
        )}
      />
    </InputGroup>
  </div>
);

const InPersonOptions = ({ control, errors, setValue }: OnlineOptions) => (
  <>
    <div className="my-8">
      <InputGroup className="my-8" label="*Area" error={errors?.state}>
        <Controller
          control={control}
          name="area"
          render={({ field }) => (
            <Geocoder
              placeholder="City Area"
              value={field.value}
              onChange={(e) => {
                field.onChange(e.value);
                setValue("city", e.city);
                setValue("state", e.region);
                setValue("lat", e.lat);
                setValue("lng", e.lng);
              }}
            />
          )}
        />
      </InputGroup>
    </div>
    <div className="grid grid-cols-2 gap-8">
      <InputGroup className="my-8" label="*City" error={errors?.city}>
        <Controller
          control={control}
          name="city"
          render={({ field }) => (
            <Input
              gold
              placeholder="City"
              value={field.value}
              onChange={(e) => field.onChange(e)}
            />
          )}
        />
      </InputGroup>
      <InputGroup
        className="my-8"
        label="*State / Providance"
        error={errors?.state}
      >
        <Controller
          control={control}
          name="state"
          render={({ field }) => (
            <Input
              gold
              placeholder="State / Providance"
              value={field.value}
              onChange={(e) => field.onChange(e)}
            />
          )}
        />
      </InputGroup>
    </div>
  </>
);

export const Location = () => {
  const createCampaignData = useAppSelector((state) => state.createCampaign);
  const dispatch = useAppDispatch();
  let campaignIsOnline = false;

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
    defaultValues: {
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
    await router.push("./preview");
  };

  const onBack = React.useCallback((e) => {
    e.preventDefault();

    router.push("./general");
  }, []);

  useEffect(() => {
    const newGameSystemTag = createTagOptions(createCampaignData.gameSystem);
    const newCampaignTypeTag = createTagOptions(
      createCampaignData.campaignType
    );
    setValue("tags", [newGameSystemTag, newCampaignTypeTag]);
  }, []);

  campaignIsOnline = watch("isOnline");

  console.log(" campaignIsOnline: ", campaignIsOnline);

  const locationOptions = campaignIsOnline ? (
    <OnlineOptions control={control} errors={errors} />
  ) : (
    <InPersonOptions control={control} errors={errors} setValue={setValue} />
  );

  return (
    <div className="relative mx-auto" style={{ width: "1024px" }}>
      <div className="mt-8">
        <Header as="h1" size="4xl" color="loContrast">
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
                height="100px"
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
                width="250px"
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
                height="100px"
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
                width="250px"
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
                height="100px"
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
                width="250px"
              />
            )}
          />
        </InputGroup>

        <InputGroup label="Tags">
          <Controller
            control={control}
            name="tags"
            render={({ field: { onChange, value, ref } }) => {
              return (
                <MultiSelect onChange={onChange} value={value} ref={ref} />
              );
            }}
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
            Submit
          </Button>
        </Box>
      </form>
      <DevTool control={control} />
    </div>
  );
};
