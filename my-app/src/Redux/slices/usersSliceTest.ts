import { store } from "../services/reduxStore";
import { usersActions, usersSelectors } from "./usersSlice";

export function userSliceTest() {
  console.log("Check the initial state:");
  console.log(store.getState().users);
  // {ids: [], entities: {}, loading: 'idle' }

  console.log("booksSelectors : ", usersSelectors);
  console.log(
    "booksSelectors.selectTotal ",
    usersSelectors.selectTotal(store.getState()),
    usersSelectors.selectTotal2()
  );

  console.log("usersActions.usersAddOne");

  store.dispatch(
    usersActions.usersAddOne({
      gender: "male",
      name: {
        title: "Mr",
        first: "Edward",
        last: "Anderson",
      },
      location: {
        street: {
          number: 8202,
          name: "Queen Street",
        },
        city: "Palmerston North",
        state: "Manawatu-Wanganui",
        country: "New Zealand",
        postcode: 66597,
        coordinates: {
          latitude: "53.8579",
          longitude: "-47.9660",
        },
        timezone: {
          offset: "+11:00",
          description: "Magadan, Solomon Islands, New Caledonia",
        },
      },
      email: "edward.anderson@example.com",
      login: {
        uuid: "40fdb95a-f6fa-4e4f-9b65-0118f0383f55",
        username: "happygoose106",
        password: "redbird",
        salt: "0y7N5r9L",
        md5: "55fde618055e06cb607d6737e7c336ef",
        sha1: "8cbd172300d229b1bec48be8ac060396e68863b5",
        sha256:
          "400b342945d8ff90d5fc797a04c0037d47f59252b1d8aa0da261d2c5b13ce079",
      },
      dob: {
        // date: new Date("1950-10-15T21:39:08.738Z"),
        date: "1950-10-15T21:39:08.738Z",
        age: 72,
      },
      registered: {
        // date: new Date("2004-09-05T14:47:37.568Z"),
        date: "2004-09-05T14:47:37.568Z",
        age: 18,
      },
      phone: "(901)-529-3327",
      cell: "(241)-842-3563",
      id: {
        name: "",
        value: "null",
      },
      picture: {
        large: "https://randomuser.me/api/portraits/men/53.jpg",
        medium: "https://randomuser.me/api/portraits/med/men/53.jpg",
        thumbnail: "https://randomuser.me/api/portraits/thumb/men/53.jpg",
      },
      nat: "NZ",
    })
  );

  console.log(store.getState().users);

  /*
  store.dispatch(bookAdded({ id: "a", title: "First" }));
  store.dispatch(bookAdded({ id: "a1", title: "First1", descr: "decr2" }));
  console.log("store.dispatch(bookAdded");
  console.log(store.getState().books);
  // {ids: ["a"], entities: {a: {id: "a", title: "First"}}, loading: 'idle' }

  console.log("bookUpdated");
  store.dispatch(bookUpdated({ id: "a", changes: { title: "First (altered)" } }));
  store.dispatch(booksLoading());
  console.log("store.dispatch(booksLoading());");
  console.log(store.getState().books);
  // {ids: ["a"], entities: {a: {id: "a", title: "First (altered)"}}, loading: 'pending' }

  store.dispatch(
    booksReceived([
      { id: "b", title: "Book 3" },
      { id: "c", title: "Book 2", descr: "descr" },
    ])
  );

  console.log("booksSelectors.selectIds");
  console.log(usersSelectors.selectIds(store.getState()));
  // "a" was removed due to the `setAll()` call
  // Since they're sorted by title, "Book 2" comes before "Book 3"
  // ["c", "b"]

  console.log(usersSelectors.selectAll(store.getState()));
  // All book entries in sorted order
  // [{id: "c", title: "Book 2"}, {id: "b", title: "Book 3"}]
  */
}
