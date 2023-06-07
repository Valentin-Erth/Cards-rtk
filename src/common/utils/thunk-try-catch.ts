import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AppDispatch, RootState } from "../../app/store";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { appActions } from "../../app/app.slice";

//функц для обработки ошибок во всех санках
export const thunkTryCatch = async (thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, unknown>, promise: Function, showGlobalError?:boolean) => {
  const {rejectWithValue,dispatch} = thunkAPI;
  // dispatch(appActions.setIsLoading({isLoading: true }))
  try {
    return await promise();
  } catch (e) {
     return rejectWithValue({ error:e, showGlobalError });
  }
  // } finally {
  //   dispatch(appActions.setIsLoading({isLoading: false }))
  // }
};
const error=0?? "haha"// 0
const error2=0 || "haha"// "haha"