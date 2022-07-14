import { IStep2, step2 } from "@features/createCampaign/createCampaignSlice";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Typography } from "ui";
import React from "react";
import { useAppDispatch, useAppSelector } from "@store/store";
import { Button, Checkbox, Chips, createStyles } from "@mantine/core";

import InputGroup from "@components/ui/InputGroup";
import router from "next/router";
import { Chip } from "@components/ui/Chips/Chip/Chip";

const useStyles = createStyles((theme, _params, getRef) => ({
  root: {
    border: "1px solid #FFD166",
    backgroundColor: "#fff",
  },
  outline: {
    border: "none",
  },
  label: {
    paddingLeft: "32px !important",
    paddingRight: "32px !important",
  },
  checked: {
    border: "none !important",
    [`& .${getRef("iconWrapper")}`]: {
      display: "none",
    },
    [`& .${getRef("root")}`]: {
      backgroundColor: "#FFD166 !important",
    },
  },
}));

export const Extra = () => {
  const { classes } = useStyles();
  const createCampaignData = useAppSelector((state) => state.createCampaign);
  const dispatch = useAppDispatch();

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

  const campaignIsOnline = watch("isOnline");

  return (
    <div className="relative mx-auto" style={{ width: "1024px" }}>
      <div className="mt-8">
        <Typography.Title level={1} className="font-serif text-white">
          Location
        </Typography.Title>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup className="my-8" label="*Times?">
          <Controller
            control={control}
            name="times"
            render={({ field }) => (
              <Chips
                classNames={classes}
                value={field.value}
                onChange={(e) => field.onChange(e)}
                multiple
                size="xl"
                radius="xs"
              >
                <Chip id="low" value="Low">
                  Low
                </Chip>
                <Chip id="medium" value="Medium">
                  Medium
                </Chip>
                <Chip id="high" value="High">
                  High
                </Chip>
              </Chips>
            )}
          />
        </InputGroup>

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
    </div>
  );
};
