import { JSONContent } from "@tiptap/react";
import { z } from "zod";

const DEGREES = ["Low", "Medium", "High"] as const;
const CAMPAIGNTYPE = ["Campaign", "One Shot"] as const;

export const TagsContent = z
  .array(
    z.record(z.any()).and(
      z.object({
        value: z.string(),
        id: z.string(),
        label: z.string(),
      })
    )
  )
  .optional();
export const Timezone = z.object({
  value: z.string(),
  offset: z.number(),
  label: z.string(),
  abbrev: z.string(),
});

export const dateSchema = z.preprocess((arg) => {
  if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
}, z.date());
type DateSchema = z.infer<typeof dateSchema>;

export const TipTapJsonContent: z.ZodSchema<JSONContent> = z.lazy(() =>
  z.record(z.any()).and(
    z.object({
      type: z.string().optional(),
      attrs: z.record(z.any()).optional(),
      content: z.array(TipTapJsonContent).optional(),
      marks: z
        .array(
          z.record(z.any()).and(
            z.object({
              type: z.string(),
              attrs: z.record(z.any()).optional(),
            })
          )
        )
        .optional(),
      text: z.string().optional(),
    })
  )
);

const LocationdefaultSchema = {
  roleplay: z.enum(DEGREES),
  combat: z.enum(DEGREES),
  puzzles: z.enum(DEGREES),
  tags: TagsContent,
  additionalDetails: z.string().optional(),
  jsonAdditionalDetails: z.string().optional(),
};

const OfflineSchema = z.object({
  ...LocationdefaultSchema,
  isOnline: z.literal(false),
  area: z.string().min(1, {
    message: "An Local Area is Required for Offline Campaigns",
  }),
  city: z
    .string()
    .min(1, { message: "A City is Required for Offline Campaigns" }),
  state: z
    .string({
      invalid_type_error: "A State is Required for offline Campaigns",
      required_error: "A State is Required for offline Campaigns",
    })
    .min(1, {
      message: "A State is Required for offline Campaigns",
    }),
  lat: z.number(),
  lng: z.number(),
});

const OnlineSchema = z.object({
  ...LocationdefaultSchema,
  isOnline: z.literal(true),
  voipSystem: z.string().min(1, {
    message: "A Voice System is Required for Online Campaigns",
  }),

  virtualTable: z
    .string({
      invalid_type_error:
        "A Virtual Table Top is Required for Online Campaigns",
      required_error: "A Virtual Table Top is Required for Online Campaigns",
    })
    .min(1, {
      message: "A Virtual Table Top is Required for Online Campaigns",
    }),
});

export const generalSchema = z.object({
  title: z.string().min(1, { message: "Campaign Title is Required" }),
  summary: z.string().min(1, { message: "Campaign Description is required" }),
  jsonSummary: z
    .string()
    .min(1, { message: "Campaign Description is required" }),
  imageUrl: z.string().min(1, { message: "Header Image is required" }),
  campaignType: z.enum(CAMPAIGNTYPE),
  gameSystem: z.string().min(1, { message: "Invalid RPG System was Choicen" }),
  maxSeats: z
    .number()
    .min(1, { message: "Invalid Number Chosen for Max Seats" }),
  experience: z.string().min(1, { message: "Not an Valid Experience Level" }),
  price: z
    .number({
      invalid_type_error: "Price has to be from 0 to 999",
      required_error: "Price has to be from 0 to 999",
    })
    .nonnegative()
    .lte(999),
  timePeriods: z
    .string()
    .array()
    .min(1, { message: "Not an Valid Time Period" }),
  days: z.string().array().min(1, { message: "Not an Valid Day" }),
  startDate: dateSchema,
  timezone: Timezone,
});

export const LocationSchema = z.discriminatedUnion("isOnline", [
  OnlineSchema,
  OfflineSchema,
]);
