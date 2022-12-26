import InputGroup from "@components/ui/InputGroup";
import { IStep2 } from "@features/createCampaign/createCampaignSlice";
import {
  Control,
  Controller,
  FormState,
  UseFormSetValue,
} from "react-hook-form";
import { Input } from "ui";
import { Geocoder } from "@components/ui/Geocoder";
import { createTagOptions, TagOptions } from "@utils/createTagOptions";
import { getUniqueListBy } from "@utils/getUniqueListBy";

interface InPersonOptionsProps {
  control: Control<IStep2, any>;
  errors: FormState<IStep2>["errors"];
  setValue?: UseFormSetValue<IStep2>;
  tags: TagOptions[];
}

export const InPersonOptions = ({
  control,
  errors,
  setValue,
  tags,
}: InPersonOptionsProps) => (
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
              onBlur={(e) => {
                const newTags = [
                  ...tags,
                  createTagOptions(e.currentTarget.value),
                ];
                setValue("tags", getUniqueListBy(newTags, "value"));
              }}
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
              onBlur={(e) => {
                const newTags = [
                  ...tags,
                  createTagOptions(e.currentTarget.value),
                ];
                setValue("tags", getUniqueListBy(newTags, "value"));
              }}
            />
          )}
        />
      </InputGroup>
    </div>
  </>
);
