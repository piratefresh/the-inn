import InputGroup from "@components/ui/InputGroup";
import { IStep2 } from "@features/createCampaign/createCampaignSlice";
import { createTagOptions, TagOptions } from "@utils/createTagOptions";
import { getUniqueListBy } from "@utils/getUniqueListBy";
import {
  Control,
  Controller,
  FormState,
  UseFormSetValue,
} from "react-hook-form";
import { Input } from "ui";
interface OnlineOptions {
  control: Control<IStep2, any>;
  errors: FormState<IStep2>["errors"];
  setValue?: UseFormSetValue<IStep2>;
  tags: TagOptions[];
}

export const OnlineOptions = ({
  control,
  errors,
  setValue,
  tags,
}: OnlineOptions) => {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
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
              onBlur={(e) => {
                const newTags = [
                  ...tags,
                  createTagOptions(e.currentTarget.value),
                ];
                // Fix this later
                // @ts-ignore
                setValue("tags", getUniqueListBy(newTags, "value"));
              }}
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
              onBlur={(e) => {
                const newTags = [
                  ...tags,
                  createTagOptions(e.currentTarget.value),
                ];
                // Fix this later
                // @ts-ignore
                setValue("tags", getUniqueListBy(newTags, "value"));
              }}
              onChange={(e) => {
                field.onChange(e);
              }}
            />
          )}
        />
      </InputGroup>
    </div>
  );
};
