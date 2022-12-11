import { configureStore } from "@reduxjs/toolkit";
import { usersReducer, usersSelectors } from "../slices/usersSlice";
import { booksReducer, booksSelectors } from "../slices/bookSlice";
import { Dictionary, EntityId } from "@reduxjs/toolkit/src/entities/models";
import { articlesReducer, articlesSelectors } from "../slices/articlesSlice";
import { ThunkExtraArg } from "./Thunk";
import axios from "axios";

export const $api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    authorization:
      localStorage.getItem("USER_LOCALSTORAGE_KEY") || "authorization_value",
  },
});

const extraArg: ThunkExtraArg = {
  api: $api,
};
export const store = configureStore({
  reducer: {
    users: usersReducer,
    books: booksReducer,
    articles: articlesReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: extraArg,
      },
    }),
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

/*
export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
    navigate?: (to: To, options?: NavigateOptions) => void,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        counter: counterReducer,
        user: userReducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const extraArg: ThunkExtraArg = {
        api: $api,
        navigate,
    };

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: extraArg,
            },
        }),
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];

 */
