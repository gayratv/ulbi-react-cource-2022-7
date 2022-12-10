import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { store, StoreState } from "../services/reduxStore";
import { Dictionary, EntityId } from "@reduxjs/toolkit/src/entities/models";

type Book = { id: string; title: string; descr?: string };
// Since we don't provide `selectId`, it defaults to assuming `entity.id` is the right field
const booksAdapter = createEntityAdapter<Book>({
  selectId: (book) => book.id,
  // Keep the "all IDs" array sorted based on book titles
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const booksSlice = createSlice({
  name: "books",
  initialState: booksAdapter.getInitialState({
    loading: "idle",
  }),
  reducers: {
    // Can pass adapter functions directly as case reducers.  Because we're passing this
    // as a value, `createSlice` will auto-generate the `bookAdded` action type / creator
    bookAdded: booksAdapter.addOne,
    booksLoading(state) {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    booksReceived(state, action: PayloadAction<Book[]>) {
      if (state.loading === "pending") {
        // Or, call them as "mutating" helpers in a case reducer
        booksAdapter.setAll(state, action.payload);
        state.loading = "idle";
      }
    },
    bookUpdated: booksAdapter.updateOne,
  },
});

export const { actions: booksActions, reducer: booksReducer } = booksSlice;

export const booksSelectors = booksAdapter.getSelectors<StoreState>(
  (state) => state.books
);
// booksSelectors.selectTotal2 = () =>
//   booksSelectors.selectTotal(store.getState());

// booksSelectors.selectTotal3 = booksSelectors.selectTotal.bind(
//   null,
//   store.getState()
// );
