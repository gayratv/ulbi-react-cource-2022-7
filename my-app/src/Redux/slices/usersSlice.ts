import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { User } from "../types/RandomUser";
import { StoreState } from "../services/reduxStore";
export const usersAdapter = createEntityAdapter<User>({
  selectId: (user) => user.login.uuid,
  // Keep the "all IDs" array sorted based on book titles
  sortComparer: (a, b) =>
    (a.name.first + a.name.last).localeCompare(a.name.first + a.name.last),
});

const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState({
    loading: "idle",
  }),
  reducers: {
    // Can pass adapter functions directly as case reducers.  Because we're passing this
    // as a value, `createSlice` will auto-generate the `bookAdded` action type / creator
    usersAddOne: usersAdapter.addOne,
    usersUpdateOne: usersAdapter.updateOne,
    usersUpsertOne: usersAdapter.upsertOne,
    usersRemoveOne: usersAdapter.removeOne,
    usersLoading(state) {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    usersUpdated: usersAdapter.updateOne,
  },
});

// const { usersAdded, usersLoading } = usersSlice.actions;

export const { actions: usersActions, reducer: usersReducer } = usersSlice;

export const usersSelectors = usersAdapter.getSelectors<StoreState>(
  (state) => state.users
);
