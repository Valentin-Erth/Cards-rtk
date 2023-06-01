import { AppDispatch, RootState } from "../../app/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
  rejectValue: unknown
}>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
