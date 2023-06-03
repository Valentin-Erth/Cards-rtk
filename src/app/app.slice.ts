import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { log } from "util";

const appinitialState = {
  error: null as string | null,
  isLoading: true,
  isAppInitialized: false
};
type initialStateType = typeof appinitialState

export const slice = createSlice({
  name: "app",
  initialState: appinitialState,
  reducers: {
    // Подредьюсер.
    // Action - это payload объект. Типизация через PayloadAction
    setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      //увидеть состояние state текущее
      // console.log(current(state));
      // Логику в подредьюсерах пишем мутабельным образом,
      // т.к. иммутабельность достигается благодаря immer.js
      state.isLoading = action.payload.isLoading;
      // console.log(current(state));
    }
  }
});
export const appReducer = slice.reducer;
export const appActions = slice.actions;