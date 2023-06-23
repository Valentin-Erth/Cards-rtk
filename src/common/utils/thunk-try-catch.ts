import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AppDispatch, RootState } from "../../app/store";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { appActions } from "../../app/app.slice";

/**
 * Обрабатывает асинхронную логику с помощью try-catch блока и возвращает результат или огибку с помощью thunkAPI.rejectWithValue
 * @param {BaseThunkAPI<RootState, any, AppDispatch, unknown>} thunkAPI - объект, содержащий методы `dispatch`, `getState`, `extra`, `rejectWithValue` предоставляемый Redux Toolkit, для использования внутри `promise`.
 * @param {Function} promise - функция содержащая асинхронную логику, которую необходимо выполнить в `try...catch` блоке.
 * @param {boolean} [showGlobalError=true] - флаг, указывающий, нужно ли выводить глобальную ошибку.
 * @returns {Promise<any>} результат выполнения `promise` в случае успешного выполнения, либо объект `rejectWithValue`, в случае возникновения ошибки.
 */

export const thunkTryCatch = async <T>(
  thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, unknown>,
  // promise: ()=>Promise<T>,
  promise: Function,
  showGlobalError?: boolean) => {
// ):Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  const { rejectWithValue, dispatch } = thunkAPI;
  try {
    return await promise();
  } catch (e) {
    return rejectWithValue({ error: e, showGlobalError });//showGlobalError параметр чтобы не показывать ошибку при неуспешном запросе
  }
};


const error = 0 ?? "haha";// 0
const error2 = 0 || "haha";// "haha"