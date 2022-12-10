// type BookSlice = ReturnType<typeof booksSlice.getInitialState>;

import { store } from "../services/reduxStore";
import { booksActions, booksSelectors } from "./bookSlice";

console.log("BOOKS");
console.log("booksSelectors.selectTotal ", booksSelectors.selectTotal2());

store.dispatch(booksActions.bookAdded({ id: "a", title: "First" }));
store.dispatch(
  booksActions.bookAdded({ id: "a1", title: "First1", descr: "decr2" })
);
console.log("store.dispatch(bookAdded");
console.log(store.getState().books);
// {ids: ["a"], entities: {a: {id: "a", title: "First"}}, loading: 'idle' }

console.log("bookUpdated");
store.dispatch(
  booksActions.bookUpdated({ id: "a", changes: { title: "First (altered)" } })
);
store.dispatch(booksActions.booksLoading());
console.log("store.dispatch(booksLoading());");
console.log(store.getState().books);
// {ids: ["a"], entities: {a: {id: "a", title: "First (altered)"}}, loading: 'pending' }

store.dispatch(
  booksActions.booksReceived([
    { id: "b", title: "Book 3" },
    { id: "c", title: "Book 2", descr: "descr" },
  ])
);

console.log("booksSelectors.selectIds");
console.log(booksSelectors.selectIds(store.getState()));
// "a" was removed due to the `setAll()` call
// Since they're sorted by title, "Book 2" comes before "Book 3"
// ["c", "b"]

console.log("booksSelectors.selectAll(store.getState())");
console.log(booksSelectors.selectAll(store.getState()));
// All book entries in sorted order
// [{id: "c", title: "Book 2"}, {id: "b", title: "Book 3"}]

console.log("booksSelectors.selectTotal2 : ", booksSelectors.selectTotal2());
console.log(
  "booksSelectors.selectTotal : ",
  booksSelectors.selectTotal(store.getState())
);

console.log(booksSelectors.selectById2("c"));
