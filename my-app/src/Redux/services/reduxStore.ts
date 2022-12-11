import { configureStore } from "@reduxjs/toolkit";
import { usersReducer, usersSelectors } from "../slices/usersSlice";
import { booksReducer, booksSelectors } from "../slices/bookSlice";
import { Dictionary, EntityId } from "@reduxjs/toolkit/src/entities/models";
import { articlesReducer, articlesSelectors } from "../slices/articlesSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    books: booksReducer,
    articles: articlesReducer,
  },
});

export type StoreState = ReturnType<typeof store.getState>;

declare module "@reduxjs/toolkit" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface EntitySelectors<T, V> {
    selectTotal2: () => number;

    selectIds2: () => EntityId[];
    selectEntities2: () => Dictionary<T>;
    selectAll2: () => T[];
    selectById2: (id: EntityId) => T | undefined;
  }
}

const adapterSelectorsList = [
  usersSelectors,
  booksSelectors,
  articlesSelectors,
];
console.log("adapterSelectorsList.forEach");
adapterSelectorsList.forEach((selector) => {
  selector.selectTotal2 = () => selector.selectTotal(store.getState());
  // selector.selectIds2 = () => selector.selectIds(store.getState());
  // selector.selectEntities2 = () => selector.selectEntities(store.getState());
  // @ts-ignore
  selector.selectById2 = (id: EntityId) =>
    selector.selectById(store.getState(), id);
});
