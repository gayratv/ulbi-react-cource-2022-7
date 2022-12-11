import {
  createEntityAdapter,
  createSlice,
  EntitySelectors,
} from "@reduxjs/toolkit";

import { Article } from "../types/Articles";
import { StoreState, store } from "../services/reduxStore";
export const articlesAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});

const articlesSlice = createSlice({
  name: "articles",
  initialState: articlesAdapter.getInitialState({
    loading: "idle",
  }),
  reducers: {
    // Can pass adapter functions directly as case reducers.  Because we're passing this
    // as a value, `createSlice` will auto-generate the `bookAdded` action type / creator
    articlesAddOne: articlesAdapter.addOne,
    articlesUpdateOne: articlesAdapter.updateOne,
    articlesUpsertOne: articlesAdapter.upsertOne,
    articlesRemoveOne: articlesAdapter.removeOne,
    usersLoading(state) {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
  },
});

// const { usersAdded, usersLoading } = usersSlice.actions;

export const { actions: articlesActions, reducer: articlesReducer } =
  articlesSlice;

export const articlesSelectors = articlesAdapter.getSelectors<StoreState>(
  (state) => state.articles
);
