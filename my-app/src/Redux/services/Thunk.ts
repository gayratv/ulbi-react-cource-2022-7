import { AxiosInstance } from "axios";
import { StoreState } from "./reduxStore";
export interface ThunkExtraArg {
  api: AxiosInstance;
  // navigate?: (to: To, options?: NavigateOptions) => void;
}
export interface ThunkConfig<T> {
  state: StoreState;
  rejectValue: T;
  extra: ThunkExtraArg;
}
