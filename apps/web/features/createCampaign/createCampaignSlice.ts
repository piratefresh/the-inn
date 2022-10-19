import {
  GAMES,
  MAX_PARTY,
} from "@components/Campaings/CreateCampaigns/General/General";
import { PayloadAction, createSlice, createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@store/store";
import { JSONContent } from "@tiptap/react";

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

// Define a type for the slice state
export interface CreateCampaignState {
  title: string;
  summary: string;
  jsonSummary?: JSONContent;
  imageUrl: string;
  gameSystem: string; // change to enum type
  city: string;
  state: string;
  maxSeats: string;
  experience: Experience;
  isOnline: boolean;
  voipSystem: string;
  virtualTable: string;
  days: string[];
  timePeriods: string[];
  timezone: string;
  tags: string[];
  additionalDetails: string;
  jsonAdditionalDetails: JSONContent;
  combat: Difficulty;
  roleplay: Difficulty;
  puzzles: Difficulty;
}

export interface IStep1 {
  title: string;
  summary: string;
  imageUrl: string;
  image?: FileList;
  gameSystem: string; // change to enum type
  maxSeats: string;
  experience: Experience;
  jsonSummary: JSONContent;
  timePeriods: string[];
  days: string[];
}
export interface IStep2 {
  isOnline: boolean;
  voipSystem: string;
  virtualTable: string;
  timezone: string;
  city: string;
  state: string;
  combat: Difficulty;
  roleplay: Difficulty;
  puzzles: Difficulty;
  tags: [{ value: string; id: string; label: string }];
  additionalDetails: string;
  jsonAdditionalDetails: JSONContent;
}

// Define the initial state using that type
const initialState: CreateCampaignState = {
  title: "",
  summary: "",
  jsonSummary: [{}],
  imageUrl: "",
  gameSystem: "Dungeon & Dragons",
  city: "",
  state: "",
  maxSeats: "4",
  experience: Experience.All,
  isOnline: false,
  voipSystem: "Discord",
  virtualTable: "",
  days: [],
  timePeriods: [],
  timezone: "GMT",
  tags: [],
  additionalDetails: "",
  jsonAdditionalDetails: [{}],
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
      state.maxSeats = parseInt(action.payload.maxSeats, 10);
      state.experience = action.payload.experience;
      state.imageUrl = action.payload.imageUrl;
      state.jsonSummary = action.payload.jsonSummary;
      state.timePeriods = action.payload.timePeriods.filter((e) => e);
      state.days = action.payload.days.filter((e) => e);
    },
    step2: (state, action: PayloadAction<IStep2>) => {
      console.log("virtualTable: ", action.payload.virtualTable);
      const tags: string[] = action.payload.tags.map((option) => option.value);
      state.tags = tags;
      state.voipSystem = action.payload.voipSystem;
      state.virtualTable = action.payload.virtualTable;
      state.isOnline = action.payload.isOnline;
      state.timezone = action.payload.timezone;
      state.city = action.payload.city;
      state.state = action.payload.state;
      state.combat = action.payload.combat;
      state.roleplay = action.payload.roleplay;
      state.puzzles = action.payload.puzzles;
      state.additionalDetails = action.payload.additionalDetails;
      state.jsonAdditionalDetails = action.payload.jsonAdditionalDetails;
    },

    setImageUrl: (state, action: PayloadAction<{ imageUrl: string }>) => {
      state.imageUrl = action.payload.imageUrl;
    },
  },
});

export const { step1, step2, setImageUrl } = createCampaignSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCreateCampaignState = (state: RootState) =>
  state.createCampaign;

export const getCreateCampaignState = createSelector(
  selectCreateCampaignState,
  (createCampaign) => createCampaign
);

export default createCampaignSlice.reducer;
