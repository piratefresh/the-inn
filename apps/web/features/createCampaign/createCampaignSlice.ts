import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@store/store";
import { JSONContent } from "@tiptap/react";

// Define a type for the slice state
export interface CreateCampaignState {
  title: string;
  description: string;
  jsonDescription?: JSONContent[];
  imageUrl: string;
  gameSystem: string; // change to enum type
  city: string;
  state: string;
  maxPartySize: number;
  recommendedSkillLevel: "Beginner" | "Advanced" | "All";
  isOnline: boolean;
  voipSystem: string;
  virtualTable: string;
  days: string[];
  times: string[];
  timezone: string;
  requirements: string[];
  tags: string[];
  extraNote?: string;
  jsonExtraNote?: JSONContent[];
}

export interface IStep1 {
  title: string;
  description: string;
  imageUrl: string;
  image?: FileList;
  gameSystem: string; // change to enum type
  maxPartySize: number;
  recommendedSkillLevel: "Beginner" | "Advanced" | "All";
  jsonDescription: JSONContent[];
}
export interface IStep2 {
  isOnline: boolean;
  voipSystem: string;
  virtualTable: string;
  days: string[];
  times: string[];
  timezone: string;
  city: string;
  state: string;
}
export interface IStep3 {
  requirements: string[];
  tags: string[];
  extraNote: string;
  jsonExtraNote: JSONContent[];
}

// Define the initial state using that type
const initialState: CreateCampaignState = {
  title: "",
  description: "",
  jsonDescription: [{}],
  imageUrl: "",
  gameSystem: "",
  city: "",
  state: "",
  maxPartySize: 2,
  recommendedSkillLevel: "All",
  isOnline: false,
  voipSystem: "Discord",
  virtualTable: "",
  days: [""],
  times: [""],
  timezone: "GMT",
  requirements: [""],
  tags: [""],
  extraNote: "",
  jsonExtraNote: [{}],
};

export const createCampaignSlice = createSlice({
  name: "createCampaign",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    step1: (state, action: PayloadAction<IStep1>) => {
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.imageUrl = action.payload.imageUrl;
      state.gameSystem = action.payload.gameSystem;
      state.maxPartySize = action.payload.maxPartySize;
      state.recommendedSkillLevel = action.payload.recommendedSkillLevel;
      state.imageUrl = action.payload.imageUrl;
      state.jsonDescription = action.payload.jsonDescription;
    },
    step2: (state, action: PayloadAction<IStep2>) => {
      state.voipSystem = action.payload.voipSystem;
      state.isOnline = action.payload.isOnline;
      state.days = action.payload.days.filter((e) => e);
      state.times = action.payload.times.filter((e) => e);
      state.timezone = action.payload.timezone;
      state.city = action.payload.city;
      state.state = action.payload.state;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    step3: (state, action: PayloadAction<IStep3>) => {
      console.log("action: ", action);
      state.requirements = action.payload.requirements;
      state.tags = action.payload.tags;
      state.extraNote = action.payload.extraNote;
      state.jsonExtraNote = action.payload.jsonExtraNote;
    },
  },
});

export const { step1, step2, step3 } = createCampaignSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCreateCampaignState = (state: RootState) =>
  state.createCampaign;

export default createCampaignSlice.reducer;
