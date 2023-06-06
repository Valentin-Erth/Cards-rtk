import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { authThunks } from "../features/auth/auth.slice";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

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
  },
  extraReducers: builder => {
    builder
      .addCase(authThunks.register.rejected,(state, action)=>{
        if(!isAxiosError(action.payload)){
          state.error="an error has occurred"
          toast.error("an error has occurred")
          return
          }
        state.error=action.payload?.response?.data?.error
        toast.error(action.payload?.response?.data?.error)
        state.isLoading=false
      })
  }
});
export const appReducer = slice.reducer;
export const appActions = slice.actions;