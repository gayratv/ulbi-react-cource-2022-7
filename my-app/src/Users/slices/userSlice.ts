import {createEntityAdapter, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from "../types/RandomUser";

const articlesAdapter = createEntityAdapter<User>({
  selectId: (user) => user.id.name + user.id.value,
});


const articlePageSlice = createSlice({
  name: 'userSlice',
  initialState: articlesAdapter.getInitialState<User>({}),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload;
      localStorage.setItem(ARTICLES_VIEW_LOCAL_STORAGE_KEY, action.payload);
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setOrder: (state, action: PayloadAction<SortOrder>) => {
      state.order = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setSort: (state, action: PayloadAction<ArticleSortFieldType>) => {
      state.sort = action.payload;
    },
    setType: (state, action: PayloadAction<ArticleType>) => {
      state.type = action.payload;
    },
    initState: (state) => {
      const view = localStorage.getItem(ARTICLES_VIEW_LOCAL_STORAGE_KEY) as ArticleView;
      state.view = view;
      state.limit = view === ArticleView.LIST ? 4 : 9;
      state._inited = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;

        if (action.meta.arg.replace) {
          articlesAdapter.removeAll(state);
        }
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.limit) {
          state.hasMore = state.limit <= action.payload.length;
        }

        if (action.meta.arg.replace) {
          articlesAdapter.setAll(state, action.payload);
        } else {
          articlesAdapter.addMany(state, action.payload);
        }
      })
      .addCase(
        fetchArticles.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      );
  },

});

export const {reducer: articlePageReducer} = articlePageSlice;
export const {actions: articlePageActions} = articlePageSlice;

/*
import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import {
  Article, ArticleSortField, ArticleSortFieldType, ArticleType, ArticleView,
} from 'entities/Article/model/types/Article';
import { ARTICLES_VIEW_LOCAL_STORAGE_KEY } from 'shared/const/localStorage';
import { SortOrder } from 'shared/types/Order';
import { ArticlePageSchema } from '../../types/ArticlePageSchema';
import { fetchArticles } from '../../services/fetchArticles/fetchArticles';

const articlesAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
  (state) => state.articlePage
    || articlesAdapter.getInitialState(),
);

const articlePageSlice = createSlice({
  name: 'articlePageSlice',
  initialState: articlesAdapter.getInitialState<ArticlePageSchema>({
    isLoading: false,
    error: undefined,
    view: ArticleView.TILE,
    ids: [],
    entities: {},
    page: 1,
    hasMore: true,
    order: 'asc',
    sort: ArticleSortField.CREATED,
    search: '',
    type: ArticleType.ALL,
    _inited: false,
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload;
      localStorage.setItem(ARTICLES_VIEW_LOCAL_STORAGE_KEY, action.payload);
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setOrder: (state, action: PayloadAction<SortOrder>) => {
      state.order = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setSort: (state, action: PayloadAction<ArticleSortFieldType>) => {
      state.sort = action.payload;
    },
    setType: (state, action: PayloadAction<ArticleType>) => {
      state.type = action.payload;
    },
    initState: (state) => {
      const view = localStorage.getItem(ARTICLES_VIEW_LOCAL_STORAGE_KEY) as ArticleView;
      state.view = view;
      state.limit = view === ArticleView.LIST ? 4 : 9;
      state._inited = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;

        if (action.meta.arg.replace) {
          articlesAdapter.removeAll(state);
        }
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.limit) {
          state.hasMore = state.limit <= action.payload.length;
        }

        if (action.meta.arg.replace) {
          articlesAdapter.setAll(state, action.payload);
        } else {
          articlesAdapter.addMany(state, action.payload);
        }
      })
      .addCase(
        fetchArticles.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      );
  },

});

export const { reducer: articlePageReducer } = articlePageSlice;
export const { actions: articlePageActions } = articlePageSlice;


 */