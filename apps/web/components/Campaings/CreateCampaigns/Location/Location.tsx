import { IStep2, step2 } from "@features/createCampaign/createCampaignSlice";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Typography } from "ui";
import React from "react";
import { useAppDispatch, useAppSelector } from "@store/store";
import { Button, Checkbox, Chip, Chips } from "@mantine/core";
import { Input } from "@components/ui/Input";
import InputGroup from "@components/ui/InputGroup";
import router from "next/router";
import { FormDivider } from "@components/ui/FormDivider";
import { MultiSelectDays } from "@components/ui/Days/Days";

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
            placeholder="city"
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
            placeholder="state"
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
  const [isOnline, setIsOnline] = React.useState(false);

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IStep2>({
    defaultValues: createCampaignData,
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IStep2> = async (data) => {
    dispatch(step2(data));
    router.push("./extra");
  };

  const campaignIsOnline = watch("isOnline");

  const locationOptions = campaignIsOnline ? (
    <OnlineOptions control={control} errors={errors} />
  ) : (
    <InPersonOptions control={control} errors={errors} />
  );

  return (
    <div className="relative mx-auto" style={{ width: "1024px" }}>
      <div className="mt-8">
        <Typography.Title level={1} className="font-serif text-white">
          Location
        </Typography.Title>
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
              />
            )}
          />
        </InputGroup>
        {locationOptions}
        <FormDivider label="Detailed Information" />
        <div className="mt-8">
          <InputGroup
            className="my-8"
            label="*Playing Days?"
            // error={errors?.days}
          >
            <Controller
              control={control}
              name="days"
              render={({ field }) => (
                <MultiSelectDays
                  value={field.value}
                  onChange={(e) => field.onChange(e)}
                />
              )}
            />
          </InputGroup>
        </div>
        <InputGroup className="my-8" label="*Times?">
          <Controller
            control={control}
            name="times"
            render={({ field }) => (
              <Chips
                value={field.value}
                onChange={(e) => field.onChange(e)}
                multiple
              >
                <Chip value="Morning">Morning</Chip>
                <Chip value="Afternoon">Afternoon</Chip>
                <Chip value="Evening">Evening</Chip>
                <Chip value="Night">Night</Chip>
              </Chips>
            )}
          />
        </InputGroup>
        <Button className="text-white" type="submit">
          Next
        </Button>
      </form>

      <DevTool control={control} />
    </div>
  );
};
