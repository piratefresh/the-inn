import { IStep2, step2 } from "@features/createCampaign/createCampaignSlice";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { RadioGroup } from "ui/src/RadioGroup";
import { Header } from "ui/src/Typography";
import React from "react";
import { useAppDispatch, useAppSelector } from "@store/store";
import { Checkbox } from "@mantine/core";
import { Input } from "@components/ui/Input";
import InputGroup from "@components/ui/InputGroup";
import router from "next/router";
import { FormDivider } from "@components/ui/FormDivider";
import { Box, Button, MultiSelect } from "ui";
import { DevTool } from "@hookform/devtools";

const OnlineOptions = ({ control, errors }) => (
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
            placeholder="voipSystem"
            value={field.value}
            onChange={(e) => field.onChange(e)}
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
            onChange={(e) => field.onChange(e)}
          />
        )}
      />
    </InputGroup>
  </div>
);

const InPersonOptions = ({ control, errors }) => (
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
    <InputGroup className="my-8" label="*State" error={errors?.state}>
      <Controller
        control={control}
        name="state"
        render={({ field }) => (
          <Input
            gold
            placeholder="State"
            value={field.value}
            onChange={(e) => field.onChange(e)}
          />
        )}
      />
    </InputGroup>
  </div>
);

export const Location = () => {
  const createCampaignData = useAppSelector((state) => state.createCampaign);
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<IStep2>({
    defaultValues: {
      combat: createCampaignData.combat,
      puzzles: createCampaignData.puzzles,
      roleplay: createCampaignData.roleplay,
      voipSystem: createCampaignData.voipSystem ?? "Discord",
      isOnline: true,
    },
  });

  const onSubmit: SubmitHandler<IStep2> = async (data) => {
    dispatch(step2(data));
    reset();
    await router.push("./preview");
  };

  const onBack = React.useCallback((e) => {
    e.preventDefault();

    router.push("./general");
  }, []);

  const campaignIsOnline = watch("isOnline");

  const locationOptions = campaignIsOnline ? (
    <OnlineOptions control={control} errors={errors} />
  ) : (
    <InPersonOptions control={control} errors={errors} />
  );

  return (
    <div className="relative mx-auto" style={{ width: "1024px" }}>
      <div className="mt-8">
        <Header as="h1" size="4xl" color="loContrast">
          Location
        </Header>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              />
            )}
          />
        </InputGroup>
        {locationOptions}

        <FormDivider label="Extras" />

        <InputGroup className="my-8" label="*Roleplay?">
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
        <InputGroup className="my-8" label="*Combat?">
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
        <InputGroup className="my-8" label="*Puzzles?">
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

        <div className="mt-8">
          <InputGroup
            className="my-8"
            label="*Additional Information"
            error={errors?.additionalDetails}
          >
            <Controller
              control={control}
              name="additionalDetails"
              render={({ field }) => (
                <Input.TextArea
                  value={field.value}
                  onChange={(e) => field.onChange(e)}
                />
              )}
            />
          </InputGroup>
        </div>

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
      <DevTool control={control} /> {/* set up the dev tool */}
    </div>
  );
};
