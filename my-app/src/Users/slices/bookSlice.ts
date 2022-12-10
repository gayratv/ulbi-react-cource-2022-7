import {
  createEntityAdapter,
  createSlice,
  configureStore,
  PayloadAction
  // ,EntityState
} from '@reduxjs/toolkit';


type Book = { id: string; title: string,descr? : string }
// Since we don't provide `selectId`, it defaults to assuming `entity.id` is the right field
const booksAdapter = createEntityAdapter<Book>({
  selectId: (book) => book.id,
  // Keep the "all IDs" array sorted based on book titles
  sortComparer: (a, b) => a.title.localeCompare(b.title),

  // BooksortComparer: (a, b) => a.title.localeCompare(b.title),
});

const booksSlice = createSlice({
  name: 'books',
  initialState: booksAdapter.getInitialState({
    loading: 'idle',
  }),
  reducers: {
    // Can pass adapter functions directly as case reducers.  Because we're passing this
    // as a value, `createSlice` will auto-generate the `bookAdded` action type / creator
    bookAdded: booksAdapter.addOne,
    booksLoading(state) {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    },
    booksReceived(state, action:PayloadAction<Book[]>) {
      if (state.loading === 'pending') {
        // Or, call them as "mutating" helpers in a case reducer
        booksAdapter.setAll(state, action.payload);
        state.loading = 'idle';
      }
    },
    bookUpdated: booksAdapter.updateOne,
  },
});

const {
  bookAdded,
  booksLoading,
  booksReceived,
  bookUpdated,
} = booksSlice.actions;

export const store = configureStore({
  reducer: {
    books: booksSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>; // books : EntityState<Book> & {loading: string}

// type BookSlice = ReturnType<typeof booksSlice.getInitialState>;


console.log('Check the initial state:');
console.log(store.getState().books);
// {ids: [], entities: {}, loading: 'idle' }

const booksSelectors = booksAdapter.getSelectors<RootState>((state) => state.books);
console.log('booksSelectors : ', booksSelectors);
console.log('booksSelectors.selectTotal ', booksSelectors.selectTotal(store.getState()));

store.dispatch(bookAdded({id: 'a', title: 'First'}));
store.dispatch(bookAdded({id: 'a1', title: 'First1',descr:'decr2'}));
console.log('store.dispatch(bookAdded');
console.log(store.getState().books);
// {ids: ["a"], entities: {a: {id: "a", title: "First"}}, loading: 'idle' }

console.log('bookUpdated');
store.dispatch(bookUpdated({id: 'a', changes: {title: 'First (altered)'}}));
store.dispatch(booksLoading());
console.log('store.dispatch(booksLoading());');
console.log(store.getState().books);
// {ids: ["a"], entities: {a: {id: "a", title: "First (altered)"}}, loading: 'pending' }

store.dispatch(
  booksReceived([
    {id: 'b', title: 'Book 3'},
    {id: 'c', title: 'Book 2',descr:'descr'},
  ])
);

console.log('booksSelectors.selectIds');
console.log(booksSelectors.selectIds(store.getState()));
// "a" was removed due to the `setAll()` call
// Since they're sorted by title, "Book 2" comes before "Book 3"
// ["c", "b"]

console.log(booksSelectors.selectAll(store.getState()));
// All book entries in sorted order
// [{id: "c", title: "Book 2"}, {id: "b", title: "Book 3"}]