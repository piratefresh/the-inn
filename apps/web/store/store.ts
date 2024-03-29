import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import createCampaignReducer from "@features/createCampaign/createCampaignSlice";
import richTextEditorReducer from "@features/richTextEditorSlice/richTextEditorSlice";
import {
  createReduxMiddleware,
  deserify,
} from "@karmaniverous/serify-deserify";

class Custom {
  constructor(p) {
    // @ts-ignore
    this.p = p;
  }
}

export const serifyOptions = {
  types: {
    Custom: {
      serifier: (u) => u.p,
      deserifier: (s) => new Custom(s),
    },
  },
};

const serifyMiddleware = createReduxMiddleware(serifyOptions);

export const store = configureStore({
  reducer: {
    createCampaign: createCampaignReducer,
    richTextEditor: richTextEditorReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    serifyMiddleware,
  ],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
