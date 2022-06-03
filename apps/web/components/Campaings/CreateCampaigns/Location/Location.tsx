import { IStep2, step2 } from "@features/createCampaign/createCampaignSlice";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Typography } from "ui";
import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@store/store";
import { Button, Checkbox, createStyles } from "@mantine/core";
import { Input } from "@components/ui/Input";
import InputGroup from "@components/ui/InputGroup";
import router from "next/router";
import { FormDivider } from "@components/ui/FormDivider";
import { CheckBoxes } from "@components/Checkboxes/Days";

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
  });

  const onSubmit: SubmitHandler<IStep2> = async (data) => {
    dispatch(step2(data));
    router.push("./general");
  };

  useEffect(() => setValue("isOnline", isOnline), [setValue, isOnline]);

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
          <Checkbox
            styles={{
              label: { color: "white" },
            }}
            label="Is Online?"
            color="yellow"
            size="lg"
            onChange={(event) => setIsOnline(event.currentTarget.checked)}
          />
        </InputGroup>

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

        <FormDivider label="Detailed Information" />

        <div className="mt-8">
          <CheckBoxes
            options={[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ]}
            control={control}
            name="days"
            size="xlarge"
          />
        </div>

        <div className="mt-8">
          <CheckBoxes
            options={["Morning", "Afternoon", "Evening", "Night"]}
            control={control}
            name="times"
            size="medium"
            type="secondary"
            direction="row"
            color="black"
          />
        </div>

        <Button className="text-white" type="submit">
          Next
        </Button>
      </form>
    </div>
  );
};
