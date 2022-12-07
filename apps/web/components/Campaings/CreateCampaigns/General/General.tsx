import {
  IStep1,
  setImageUrl,
  step1,
} from "@features/createCampaign/createCampaignSlice";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Header } from "ui/src/Typography";
import React from "react";
import { Editor } from "@tiptap/react";
import { useAppDispatch, useAppSelector } from "@store/store";
import { Select } from "ui/src/Select";
import { Input, InputAddon } from "ui/src/Input";
import { Chip } from "ui/src/Chip";
import { ChipGroup } from "ui/src/Chip/ChipGroup";
import { asUploadButton } from "@rpldy/upload-button";
import { useItemFinishListener, useUploady } from "@rpldy/uploady";
import InputGroup from "@components/ui/InputGroup";
import { RichTextEditor } from "@components/RichTextEditor/RichTextEditor";
import router from "next/router";
import { FormDivider } from "@components/ui/FormDivider";
import GeneralStyles from "./General.module.css";
import { ClickableDropZone } from "@components/Dropzone/ClickableDropZone";
import { Button, RadioGroup, RangeSlider, TimeZonePicker } from "ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import { generalSchema } from "./schema";
import {
  CreatableGameSelector,
  CreatableGameSelectorOption,
} from "@components/CreatableGameSelector/CreatableGameSelector";
import { MAX_PARTY } from "consts/maxSeats";
import { SKILL_LEVELS } from "consts/skillLevels";
import { SelectOption } from "ui/src/Select/Select";

export interface CustomEditorProps extends Editor {
  insertContent: (string) => void;
}

const DropZoneButton = asUploadButton(ClickableDropZone);

export type Handle<T> = T extends React.ForwardRefExoticComponent<
  React.RefAttributes<infer T2>
>
  ? T2
  : never;

export const General = () => {
  const richTextEditorRef = React.useRef<CustomEditorProps>();
  const { processPending } = useUploady();
  const createCampaignData = useAppSelector((state) => state.createCampaign);
  const dispatch = useAppDispatch();
  const [selectedGameSystem, setSelectedGameSystem] =
    React.useState<CreatableGameSelectorOption | null>(null);
  const [selectedGameSize, setSelectedGameSize] = React.useState<SelectOption>(
    MAX_PARTY[3]
  );
  const [selectedGameLevel, setSelectedGameLevel] =
    React.useState<SelectOption>(SKILL_LEVELS[0]);

  const {
    handleSubmit,
    control,
    setValue,
    clearErrors,
    reset,
    register,
    formState: { errors },
  } = useForm<IStep1>({
    defaultValues: {
      ...createCampaignData,
      // The selector only takes string
      maxSeats: createCampaignData.maxSeats.toString(),
    },
    resolver: zodResolver(generalSchema),
  });

  useItemFinishListener((item) => {
    console.log("uploading: ", item);
    const secureUrl = item.uploadResponse?.data.secure_url;
    setValue("imageUrl", secureUrl);

    dispatch(
      setImageUrl({
        imageUrl: secureUrl,
      })
    );

    // // Route switch happening in here
    // // Make sure that we set the image url before next step
    router.push("./location");
  });

  const onInvalid = (errors) => {
    console.log("errors: ", errors);
  };

  const onSubmit: SubmitHandler<IStep1> = async (data) => {
    processPending();
    dispatch(step1(data));

    if (createCampaignData.imageUrl) {
      reset();
      router.push("./location");
    }
  };

  return (
    <div className="relative mx-auto" style={{ width: "1024px" }}>
      <div className="mt-8">
        <Header
          as="h1"
          size="4xl"
          className="text-white uppercase font-oldFenris"
        >
          Create a Campaign
        </Header>
      </div>
      <FormDivider label="General" />
      {/* <InputWrapper className="my-12" label="" error={errors?.image}> */}
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <InputGroup label="" error={errors?.image || errors?.imageUrl}>
          <Controller
            name="image"
            control={control}
            rules={{ required: "Header Image is Required" }}
            render={({ field: { onChange } }) => (
              <DropZoneButton
                extraProps={{
                  previewImage: createCampaignData.imageUrl,
                  error: errors.image?.message || errors.imageUrl?.message,
                  onChange: (v) => {
                    onChange(v);
                    setValue("imageUrl", v);
                  },
                }}
              />
            )}
          />
        </InputGroup>

        <input
          type="text"
          className="hidden"
          {...register("imageUrl", { required: true })}
        />

        <InputGroup
          className="my-12"
          label="*Campaign Name"
          error={errors?.title}
        >
          <Controller
            control={control}
            name="title"
            rules={{ required: "Campaign Title is Required" }}
            render={({ field }) => (
              <Input
                gold
                size="medium"
                placeholder="Campaign Name"
                value={field.value}
                onChange={(e) => field.onChange(e)}
                error={errors.title?.message}
              />
            )}
          />
        </InputGroup>

        <InputGroup
          className="my-12"
          label="*Campaign Description"
          error={errors?.summary}
        >
          <Controller
            control={control}
            name="jsonSummary"
            rules={{
              required: "Campaign Description is Required",
              minLength: 10,
            }}
            render={({ field }) => (
              <RichTextEditor
                ref={richTextEditorRef}
                onChange={(e) => {
                  field.onChange(e);
                  if (richTextEditorRef?.current) {
                    const currentText = richTextEditorRef?.current.getText();
                    if (currentText) {
                      // Reset error if text is valid
                      clearErrors("summary");
                      setValue("summary", currentText);
                    }
                  }
                }}
                value={field.value}
                onBlur={field.onBlur}
                name="jsonSummary"
                error={errors.summary?.message}
              />
            )}
          />
        </InputGroup>

        <FormDivider label="Detailed Information" />

        <InputGroup
          className="my-8"
          label="*Campaign Type"
          error={errors?.campaignType}
        >
          <Controller
            control={control}
            name="campaignType"
            render={({ field: { onChange, value } }) => (
              <RadioGroup
                direction="row"
                height="100px"
                onChange={onChange}
                options={[
                  {
                    label: "Campaign",
                    value: "Campaign",
                  },
                  {
                    label: "One Shot",
                    value: "One Shot",
                  },
                ]}
                value={value}
                width="250px"
              />
            )}
          />
        </InputGroup>

        <div className="grid grid-cols-2 gap-12 my-12">
          <InputGroup label="*Game System" error={errors?.gameSystem}>
            <Controller
              control={control}
              name="gameSystem"
              defaultValue={createCampaignData.gameSystem}
              rules={{ required: true }}
              render={({ field }) => (
                <CreatableGameSelector
                  key="gameSystem"
                  className={
                    !errors.gameSystem
                      ? GeneralStyles.selectInput
                      : GeneralStyles.selectInputError
                  }
                  value={selectedGameSystem}
                  onChange={(e) => {
                    setSelectedGameSystem(e);
                    field.onChange(e?.value);
                  }}
                />
              )}
            />
            <span className="text-red-800">
              {errors.gameSystem && errors.gameSystem.message}
            </span>
          </InputGroup>
          <InputGroup label="*Maximum Party Size" error={errors?.maxSeats}>
            <Controller
              control={control}
              name="maxSeats"
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  key="maxSeats"
                  className={GeneralStyles.selectInput}
                  options={MAX_PARTY}
                  selected={selectedGameSize}
                  onChange={(e) => {
                    setSelectedGameSize(e);
                    field.onChange(e.value);
                  }}
                />
              )}
            />
            <span className="text-red-800">
              {errors.maxSeats && errors.maxSeats.message}
            </span>
          </InputGroup>
          <InputGroup
            label="*Recommended Skill Level"
            error={errors?.experience}
          >
            <Controller
              control={control}
              name="experience"
              rules={{ required: true }}
              defaultValue={createCampaignData.experience}
              render={({ field }) => (
                <Select
                  key="experience"
                  className={GeneralStyles.selectInput}
                  options={SKILL_LEVELS}
                  selected={selectedGameLevel}
                  onChange={(e) => {
                    setSelectedGameLevel(e);
                    field.onChange(e.value);
                  }}
                />
              )}
            />
            <span className="text-red-800">
              {errors.experience && errors.experience.message}
            </span>
          </InputGroup>
          <InputGroup label="*Price" error={errors?.price}>
            <Controller
              control={control}
              name="price"
              render={({ field }) => {
                return (
                  <>
                    <RangeSlider
                      // Value should be array
                      value={[field.value]}
                      min={0}
                      max={999}
                      onValueChange={(price) => field.onChange(price[0])}
                    />
                    <div className="flex bg-white goldenBorder rounded-md">
                      <InputAddon>$</InputAddon>
                      <Input
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(parseInt(e.currentTarget.value), 10);
                        }}
                        style={{
                          paddingLeft: 0,
                        }}
                        size="small"
                        pattern="\d*"
                        maxLength={3}
                      />
                    </div>
                  </>
                );
              }}
            />
          </InputGroup>
        </div>

        <div className="grid grid-cols-2 gap-12 my-12">
          <InputGroup label="*Time" error={errors?.timePeriods}>
            <Controller
              name="timePeriods"
              control={control}
              render={({ field: { onChange, value } }) => (
                <ChipGroup value={value} onChange={onChange} multiple>
                  <Chip value="Morning">Morning</Chip>
                  <Chip value="Afternoon">Afternoon</Chip>
                  <Chip value="Evening">Evening</Chip>
                  <Chip value="Night">Night</Chip>
                  <Chip value="Flexible">Flexible</Chip>
                </ChipGroup>
              )}
            />
          </InputGroup>
        </div>
        <div className="grid grid-cols-2 gap-12 my-12">
          <InputGroup label="*Days" error={errors?.days}>
            <Controller
              name="days"
              control={control}
              render={({ field: { onChange, value } }) => (
                <ChipGroup value={value} onChange={onChange} multiple>
                  <Chip value="Monday">Monday</Chip>
                  <Chip value="Tuesday">Tuesday</Chip>
                  <Chip value="Wednesday">Wednesday</Chip>
                  <Chip value="Thursday">Thursday</Chip>
                  <Chip value="Friday">Friday</Chip>
                  <Chip value="Saturday">Saturday</Chip>
                  <Chip value="Sunday">Sunday</Chip>
                  <Chip value="Flexible">Flexible</Chip>
                </ChipGroup>
              )}
            />
          </InputGroup>
        </div>

        <InputGroup
          className="my-12 flex-wrap"
          label="Time Zone"
          error={errors.timezone}
        >
          <Controller
            name="timezone"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TimeZonePicker
                onChange={onChange}
                value={value}
                menuPosition="absolute"
                menuPlacement="auto"
              />
            )}
          />
        </InputGroup>

        <Button size="large" type="submit">
          Next
        </Button>
      </form>

      <DevTool control={control} />
    </div>
  );
};
