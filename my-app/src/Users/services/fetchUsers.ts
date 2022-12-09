import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArticles = createAsyncThunk<
  Array<Article>,
  FetchArticlesArgs,
  ThunkConfig<string>
>(
  'articlePage/fetchArticles',
  async (_, thunkAPI) => {
    const { extra, rejectWithValue, getState } = thunkAPI;
    const _page = getArticlePagePage(getState());
    const _limit = getArticlePageLimit(getState());
    const _sort = getArticlePageSort(getState());
    const _order = getArticlePageOrder(getState());
    const search = getArticlePageSearch(getState());
    const type = getArticlePageType(getState());

    try {
      addQueryParams({
        _sort,
        _order,
        search,
        type,
      });

      const response = await extra.api.get<Array<Article>>(
        '/articles',
        {
          params: {
            _expand: 'user',
            _page,
            _limit,
            _sort,
            _order,
            _q: search,
            type: type === ArticleType.ALL ? undefined : type,
          },
        },
      );

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return rejectWithValue(ArticleError.LOADING_ERROR);
    }
  },
);