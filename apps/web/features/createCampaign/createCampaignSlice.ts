import { PayloadAction, createSlice, createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@store/store";
import { ITimezone } from "ui/src/TimeZonePicker/TimeZonePicker";
import immer from "immer";
import reselect from "reselect";

export enum Experience {
  Beginner = "Beginner",
  Advanced = "Advanced",
  All = "All",
}

export enum Difficulty {
  Low = "Low",
  Medium = "Medium",
  High = "High",
  Any = "Any",
}

interface ITag {
  value: string;
  id: string;
  label: string;
}
// Define a type for the slice state
export interface CreateCampaignState {
  title: string;
  summary: string;
  jsonSummary?: string;
  imageUrl: string;
  gameSystem: string; // change to enum type
  campaignType: string;
  city: string | null;
  state: string | null;
  area: string | null;
  lng: number;
  lat: number;
  maxSeats: number;
  experience: Experience;
  price: number;
  isOnline: boolean;
  voipSystem: string | null;
  virtualTable: string | null;
  days: string[];
  timePeriods: string[];
  timezone: ITimezone;
  startDate: string;
  tags: string[];
  additionalDetails: string;
  jsonAdditionalDetails: string;
  combat: Difficulty;
  roleplay: Difficulty;
  puzzles: Difficulty;
}

export interface IStep1 {
  title: string;
  summary: string;
  imageUrl: string;
  image?: FileList | string;
  campaignType: string;
  gameSystem: string; // change to enum type
  maxSeats: number;
  experience: Experience;
  jsonSummary: string;
  timePeriods: string[];
  timezone: ITimezone;
  startDate: string;
  days: string[];
  price: number;
}
export interface IStep2 {
  isOnline: boolean;
  voipSystem: string | null;
  virtualTable: string | null;
  city: string | null;
  state: string | null;
  area: string | null;
  lng: number;
  lat: number;
  combat: Difficulty;
  roleplay: Difficulty;
  puzzles: Difficulty;
  tags: ITag[];
  additionalDetails: string;
  jsonAdditionalDetails: string;
}

// Define the initial state using that type
const initialState: CreateCampaignState = {
  title: "",
  summary: "",
  jsonSummary: "",
  imageUrl: null,
  gameSystem: "Dungeon & Dragons",
  campaignType: "Campaign",
  city: null,
  state: null,
  area: null,
  lat: 0,
  lng: 0,
  maxSeats: 4,
  experience: Experience.All,
  price: 0,
  isOnline: false,
  voipSystem: null,
  virtualTable: null,
  days: [],
  timePeriods: [],
  timezone: {
    value: "",
    label: "",
    offset: 0,
    abbrev: "",
    altName: "",
  },
  startDate: "",
  tags: [],
  additionalDetails: "",
  jsonAdditionalDetails: "",
  combat: Difficulty.Low,
  roleplay: Difficulty.Low,
  puzzles: Difficulty.Low,
};

export const createCampaignSlice = createSlice({
  name: "createCampaign",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    step1: (state, action: PayloadAction<IStep1>) => {
      state.title = action.payload.title;
      state.summary = action.payload.summary;
      state.imageUrl = action.payload.imageUrl;
      state.gameSystem = action.payload.gameSystem;
      state.maxSeats = action.payload.maxSeats;
      state.timezone = action.payload.timezone;
      state.startDate = action.payload.startDate;
      state.experience = action.payload.experience;
      state.campaignType = action.payload.campaignType;
      state.price = action.payload.price;
      state.imageUrl = action.payload.imageUrl;
      state.jsonSummary = action.payload.jsonSummary;
      state.timePeriods = action.payload.timePeriods.filter((e) => e);
      state.days = action.payload.days.filter((e) => e);
    },
    step2: (state, action: PayloadAction<IStep2>) => {
      const tags: string[] =
        action.payload.tags?.length > 0
          ? action.payload.tags.map((option) => option.value)
          : [];
      state.tags = tags.filter((tag) => tag);
      state.voipSystem = action.payload.voipSystem;
      state.virtualTable = action.payload.virtualTable;
      state.isOnline = action.payload.isOnline;
      state.city = action.payload.city;
      state.state = action.payload.state;
      state.combat = action.payload.combat;
      state.roleplay = action.payload.roleplay;
      state.puzzles = action.payload.puzzles;
      state.additionalDetails = action.payload.additionalDetails;
      state.jsonAdditionalDetails = action.payload.jsonAdditionalDetails;
      state.lng = action.payload.lng;
      state.lat = action.payload.lat;
      state.area = action.payload.area;
    },

    setImageUrl: (state, action: PayloadAction<{ imageUrl: string }>) => {
      state.imageUrl = action.payload.imageUrl;
    },

    reset() {
      return {
        ...initialState,
      };
    },
  },
});

export const { step1, step2, setImageUrl, reset } = createCampaignSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCreateCampaignState = (state: RootState) =>
  state.createCampaign;

export const getCreateCampaignState = createSelector(
  selectCreateCampaignState,
  (createCampaign) => createCampaign
);

export default createCampaignSlice.reducer;
