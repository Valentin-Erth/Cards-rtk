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
    },
    setAppInitialized:(state,
                       action:PayloadAction<{isAppInitialized:boolean}>)=>{
      state.isAppInitialized=action.payload.isAppInitialized
    }
  },
  extraReducers:builder =>
    builder.addMatcher((action)=> {
      return action.type.endsWith("/pending")
      }
      ,(state, action) => {
        console.log(action);
      state.isLoading=true
    })
      .addMatcher((action)=> {
        return action.type.endsWith("/fulfilled")
      }
      ,(state, action) => {
        console.log(action);
        state.isLoading=false
      })
      .addMatcher((action)=> {
        return action.type.endsWith("/rejected")
      }
      ,(state, action) => {
        console.log(action);
        const e=action.payload
        state.isLoading=false
          let errorMessage = ""
          if (isAxiosError(e)) {
            errorMessage = e?.response?.data?.error ?? e.message
          } else if (e instanceof Error) {
            errorMessage = `Native error: ${e.message}`
          } else errorMessage = JSON.stringify(e)
          toast.error(errorMessage)
      })


  });
export const appReducer = slice.reducer;
export const appActions = slice.actions;