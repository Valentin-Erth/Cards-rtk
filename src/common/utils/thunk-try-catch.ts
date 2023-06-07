import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AppDispatch, RootState } from "../../app/store";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

//функц для обработки ошибок во всех санках
export const thunkTryCatch = async (thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, unknown>, promise: Function) => {
  const {rejectWithValue } = thunkAPI;
  try {
    return await promise();
  } catch (e) {
    let errorMessage=""
    if (isAxiosError(e)){
      errorMessage=e?.response?.data?.error
    } else if (e instanceof Error){
      errorMessage=`Native error: ${e.message}`
    } else errorMessage=JSON.stringify(e)
    toast.error(errorMessage)
    return rejectWithValue(errorMessage);
  }
};