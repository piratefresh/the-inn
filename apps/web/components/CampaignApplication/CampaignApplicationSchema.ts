import { TipTapJsonContent } from "@components/Campaings/CreateCampaigns/General/schema";
import { z } from "zod";

const ApplicationDefaultSchema = {
  message: z.string().min(1, { message: "Message is required" }),
  jsonMessage: TipTapJsonContent,
  campaignId: z.string(),
};

const FitsScheduleSchema = z.object({
  ...ApplicationDefaultSchema,
  fitsSchedule: z.literal(true),
  experience: z.string().min(1, { message: "Not an Valid Experience Level" }),
});

const NotFitsScheduleSchema = z.object({
  ...ApplicationDefaultSchema,
  fitsSchedule: z.literal(false),
  timePeriods: z
    .string()
    .array()
    .min(1, { message: "Not an Valid Time Period" }),
  days: z.string().array().min(1, { message: "Not an Valid Day" }),
  experience: z.string().min(1, { message: "Not an Valid Experience Level" }),
});

export const ApplicationSchema = z.discriminatedUnion("fitsSchedule", [
  FitsScheduleSchema,
  NotFitsScheduleSchema,
]);
