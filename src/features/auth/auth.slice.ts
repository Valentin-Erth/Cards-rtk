import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ArgLoginType, ArgRegisterType, authApi } from "./auth.api";

const register = createAsyncThunk(
  // 1 - prefix
  "auth/register",
  // 2 - callback (условно наша старая санка), в которую:
  // - первым параметром (arg) мы передаем аргументы необходимые для санки
  // (если параметров больше чем один упаковываем их в объект)
  // - вторым параметром thunkAPI, обратившись к которому получим dispatch и др. свойства
  // https://redux-toolkit.js.org/usage/usage-with-typescript#typing-the-thunkapi-object
  (arg:ArgRegisterType, thunkAPI) => {
    // const {dispatch,getState,rejectWithValue}=thunkAPI
    authApi.register(arg).then((res) => {
      // debugger;
      console.log("register",res.data)
      // res.data.addedUser.
    });
  }
);
const login=createAsyncThunk("auth/login",(arg:ArgLoginType, thunkAPI)=>{
  authApi.login(arg).then(res=>{
    console.log(res.data);
    // debugger
  })
})
const slice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {},
});

export const authReducer = slice.reducer;
export const authThunks = { register,login };