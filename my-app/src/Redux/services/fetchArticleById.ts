import { createAsyncThunk } from "@reduxjs/toolkit";
import { Article } from "../types/Articles";
import { Dispatch } from "redux";
import { ThunkConfig } from "./Thunk";

/*
типы для
 createAsyncThunk:

  typePrefix: string,
  payloadCreator: AsyncThunkPayloadCreator<
      Returned,
      ThunkArg,
      ThunkApiConfig
    >,

    options?: AsyncThunkOptions<ThunkArg, ThunkApiConfig>


Типы - аргументы
    Returned,
    ThunkArg,
    ThunkApiConfig extends AsyncThunkConfig



type AsyncThunkConfig = {
  state?: unknown
  dispatch?: Dispatch
  extra?: unknown
  rejectValue?: unknown
  serializedErrorType?: unknown
  pendingMeta?: unknown
  fulfilledMeta?: unknown
  rejectedMeta?: unknown
}
*/

export const fetchArticleById = createAsyncThunk<
  Article,
  string,
  ThunkConfig<string>
>("articleDetails/fetchArticleById", async (articleId, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.get<Article>(`/articles/${articleId}`);

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue("error");
  }
});
