import geocodingService from "@mapbox/mapbox-sdk/services/geocoding";
import mbxClient from "@mapbox/mapbox-sdk";
import { AsyncSelector } from "ui";

interface FormatDataResponse {
  lat: number;
  lng: number;
  city: string;
  region: string;
  value: string;
}

interface GeocoderProps {
  onChange: (area: FormatDataResponse) => void;
  value?: any;
  placeholder?: string;
  defaultValue?: string;
}

export const Geocoder = ({
  onChange,
  placeholder,
  defaultValue,
}: GeocoderProps) => {
  const baseClient = mbxClient({
    accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
  });
  const geocoder = geocodingService(baseClient);

  const formatData = (value) => {
    // field.onChange(value?.label || "");
    if (value?.item) {
      const lat = value?.item?.geometry?.coordinates[0];
      const lng = value?.item?.geometry?.coordinates[1];

      const cityAttr = value?.item.id.startsWith("place")
        ? value?.item
        : value?.item.context.find(({ id }) => id.startsWith("place"));

      const regionAttr = value?.item.id.startsWith("region")
        ? value?.item
        : value?.item.context.find(({ id }) => id.startsWith("region"));

      const countryAttr = value?.item.context.find(({ id }) =>
        id.startsWith("country")
      );

      const city = cityAttr.text;
      const region = regionAttr.short_code.split("-")[1];

      console.log("Formatted: ", value);

      return onChange({
        lat,
        lng,
        city,
        region,
        value: value.value,
      });
    }
  };

  const loadOptions = async (inputValue) => {
    console.log("inputValue: ", inputValue);
    const res = await geocoder
      .forwardGeocode({
        query: inputValue,
        types: ["place", "neighborhood"],
      })
      .send();
    if (!res.body.features || res.body.features.length === 0) return null;
    return res.body.features.map((item) => ({
      value: item.place_name,
      label: item.place_name,
      item,
    }));
  };

  return (
    <AsyncSelector
      loadOptions={loadOptions}
      onChange={(value) => {
        formatData(value);
      }}
      defaultInputValue={defaultValue}
      placeholder={placeholder}
    />
  );
};
