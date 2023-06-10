import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AppDispatch, RootState } from "../../app/store";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { appActions } from "../../app/app.slice";

//функц для обработки ошибок во всех санках
export const thunkTryCatch = async<T> (thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, unknown>,
   promise: ()=>Promise<T>,
   showGlobalError?:boolean
):Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  const {rejectWithValue,dispatch} = thunkAPI;
    try {
    return await promise();
  } catch (e) {
     return rejectWithValue({ error:e, showGlobalError });//showGlobalError параметр чтобы не показывать ошибку при неуспешном запросе
  }
 };



const error=0?? "haha"// 0
const error2=0 || "haha"// "haha"