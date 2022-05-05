import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@store/store";
import { JSONContent } from "@tiptap/react";

interface IOption {
  label: string;
  value: string;
  id: number;
}

// Define a type for the slice state
export interface RichTextEditorState {
  activeEffect: string[];
  fontSize: IOption;
}

// Define the initial state using that type
const initialState: RichTextEditorState = {
  activeEffect: [],
  fontSize: { label: "12px", value: "12", id: 2 },
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
  },
});

export const { addActive, removeActive, setFontSize } =
  richTextEditorSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectRichTextEditorState = (state: RootState) =>
  state.createCampaign;

export default richTextEditorSlice.reducer;
