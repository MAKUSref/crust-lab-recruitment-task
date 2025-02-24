import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users/usersSlice";
import sessionReducer from "./session/sessionSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      usersState: usersReducer,
      session: sessionReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
