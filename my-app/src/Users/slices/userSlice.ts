import {
  createEntityAdapter,
  createSlice,
  configureStore,
  EntityState
} from '@reduxjs/toolkit';


type Book = { bookId: string; title: string }
// Since we don't provide `selectId`, it defaults to assuming `entity.id` is the right field
const booksAdapter = createEntityAdapter<Book>({
  selectId: (book) => book.bookId,
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
    booksLoading(state, action) {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    },
    booksReceived(state, action) {
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

const store = configureStore({
  reducer: {
    books: booksSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>

// books : EntityState<Book> & {loading: string}


// Check the initial state:
console.log(store.getState().books);
// {ids: [], entities: {}, loading: 'idle' }

const booksSelectors = booksAdapter.getSelectors((state) => state.books);

store.dispatch(bookAdded({id: 'a', title: 'First'}));
console.log(store.getState().books);
// {ids: ["a"], entities: {a: {id: "a", title: "First"}}, loading: 'idle' }

store.dispatch(bookUpdated({id: 'a', changes: {title: 'First (altered)'}}));
store.dispatch(booksLoading());
console.log(store.getState().books);
// {ids: ["a"], entities: {a: {id: "a", title: "First (altered)"}}, loading: 'pending' }

store.dispatch(
  booksReceived([
    {id: 'b', title: 'Book 3'},
    {id: 'c', title: 'Book 2'},
  ])
);

console.log(booksSelectors.selectIds(store.getState()));
// "a" was removed due to the `setAll()` call
// Since they're sorted by title, "Book 2" comes before "Book 3"
// ["c", "b"]

console.log(booksSelectors.selectAll(store.getState()));
// All book entries in sorted order
// [{id: "c", title: "Book 2"}, {id: "b", title: "Book 3"}]