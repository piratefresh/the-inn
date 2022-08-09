import { IStep3, step3 } from "@features/createCampaign/createCampaignSlice";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Typography } from "ui";
import React from "react";
import { useAppDispatch, useAppSelector } from "@store/store";
import { Button, Chips } from "@mantine/core";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { blackA } from "@radix-ui/colors";
import InputGroup from "@components/ui/InputGroup";
import router from "next/router";
import { Chip } from "@components/ui/Chips/Chip/Chip";
import { styled } from "@components/Theme/Theme";
import { Input } from "@components/ui/Input";

const StyledToggleGroup = styled(ToggleGroupPrimitive.Root, {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  borderRadius: 5,
});

const StyledItem = styled(ToggleGroupPrimitive.Item, {
  all: "unset",
  backgroundColor: "white",
  border: "1px solid $yellowBrand",
  color: blackA.blackA11,
  height: 100,
  width: 250,
  display: "flex",
  fontSize: 26,
  lineHeight: 1,
  alignItems: "center",
  justifyContent: "center",
  marginLeft: 1,
  "&:first-child": {
    marginLeft: 0,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  "&:last-child": { borderTopRightRadius: 4, borderBottomRightRadius: 4 },
  "&:hover": { backgroundColor: "$yellowBrand" },
  "&[data-state=on]": {
    backgroundColor: "$yellowBrand",
    color: "Black",
  },
  "&:focus": { position: "relative", boxShadow: `0 0 0 2px black` },
});

const StyledTextArea = styled("textarea", {
  border: "1px solid $yellowBrand",
});

export const ToggleGroup = StyledToggleGroup;
export const ToggleGroupItem = StyledItem;

export const Extra = () => {
  const createCampaignData = useAppSelector((state) => state.createCampaign);
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<IStep3>({
    defaultValues: createCampaignData,
  });

  const [action, roleplay, puzzles] = watch(["action", "roleplay", "puzzles"]);

  const onSubmit: SubmitHandler<IStep3> = async (data) => {
    dispatch(step3(data));
    console.log("createCampaignData: ", createCampaignData);
    router.push("./general");
  };

  return (
    <div className="relative mx-auto" style={{ width: "1024px" }}>
      <div className="mt-8">
        <Typography.Title level={1} className="font-serif text-white">
          Location
        </Typography.Title>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup className="my-8" label="*Action?">
          <Controller
            control={control}
            name="action"
            render={({ field }) => (
              <ToggleGroup
                type="single"
                value={action}
                onValueChange={(value) => {
                  if (value) field.onChange(value);
                }}
              >
                <ToggleGroupItem value="Low">Low</ToggleGroupItem>
                <ToggleGroupItem value="Medium">Medium</ToggleGroupItem>
                <ToggleGroupItem value="High">High</ToggleGroupItem>
              </ToggleGroup>
            )}
          />
        </InputGroup>

        <InputGroup className="my-8" label="*Roleplay?">
          <Controller
            control={control}
            name="roleplay"
            render={({ field }) => (
              <ToggleGroup
                type="single"
                value={roleplay}
                onValueChange={(value) => {
                  if (value) field.onChange(value);
                }}
              >
                <ToggleGroupItem value="Low">Low</ToggleGroupItem>
                <ToggleGroupItem value="Medium">Medium</ToggleGroupItem>
                <ToggleGroupItem value="High">High</ToggleGroupItem>
              </ToggleGroup>
            )}
          />
        </InputGroup>

        <InputGroup className="my-8" label="*Puzzles?">
          <Controller
            control={control}
            name="puzzles"
            render={({ field }) => (
              <ToggleGroup
                type="single"
                value={puzzles}
                onValueChange={(value) => {
                  if (value) field.onChange(value);
                }}
              >
                <ToggleGroupItem value="Low">Low</ToggleGroupItem>
                <ToggleGroupItem value="Medium">Medium</ToggleGroupItem>
                <ToggleGroupItem value="High">High</ToggleGroupItem>
              </ToggleGroup>
            )}
          />
        </InputGroup>

        <div className="mt-8">
          <InputGroup
            className="my-8"
            label="*Additional Information"
            error={errors?.extraNote}
          >
            <Controller
              control={control}
              name="extraNote"
              render={({ field }) => (
                <Input.TextArea
                  value={field.value}
                  onChange={(e) => field.onChange(e)}
                />
              )}
            />
          </InputGroup>
        </div>

        <Button className="text-white" type="submit">
          Next
        </Button>
      </form>
    </div>
  );
};
