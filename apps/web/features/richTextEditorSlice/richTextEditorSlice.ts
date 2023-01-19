import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@store/store";

export interface IOption {
  name: string;
  value: string;
  id?: number | string;
}

// Define a type for the slice state
export interface RichTextEditorState {
  activeEffect: string[];
  fontSize: IOption;
  fontFamily: IOption;
  textType: IOption;
}

// Define the initial state using that type
const initialState: RichTextEditorState = {
  activeEffect: [],
  fontSize: { value: "14px", name: "14px" },
  fontFamily: { value: "Roboto", name: "Roboto" },
  textType: { value: "paragraph", name: "Paragraph" },
};

export const richTextEditorSlice = createSlice({
  name: "richTextEditor",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addActive: (state, action: PayloadAction<{ effect: string }>) => {
      const newActiveEffect = [...state.activeEffect, action.payload.effect];
      state.activeEffect = newActiveEffect;
    },
    removeActive: (state, action: PayloadAction<{ effect: string }>) => {
      const filteredActiveEffect = state.activeEffect.filter(
        (effect) => effect === action.payload.effect
      );

      state.activeEffect = filteredActiveEffect;
    },
    setFontSize: (state, action: PayloadAction<{ font: IOption }>) => {
      state.fontSize = action.payload.font;
    },
    setFontFamily: (state, action: PayloadAction<{ font: IOption }>) => {
      state.fontFamily = action.payload.font;
    },
    setTextType: (state, action: PayloadAction<{ textType: IOption }>) => {
      state.textType = action.payload.textType;
    },
  },
});

export const {
  addActive,
  removeActive,
  setFontSize,
  setFontFamily,
  setTextType,
} = richTextEditorSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectRichTextEditorState = (state: RootState) =>
  state.createCampaign;

export default richTextEditorSlice.reducer;
