import { store } from "./reduxStore";
import { fetchArticleById } from "./fetchArticleById";

export function testFetchArticle() {
  store.dispatch(fetchArticleById("1"));
}
