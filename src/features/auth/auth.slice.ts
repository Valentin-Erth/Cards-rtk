import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArgLoginType, ArgRegisterType, authApi, ProfileType } from "./auth.api";
import { createAppAsyncThunk } from "../../common/utils/createAppAsyncThunk";

const register = createAppAsyncThunk<void, ArgRegisterType>("auth/register", async (arg) => {
  const res = await authApi.register(arg);
});
const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>
("auth/login", async (arg, thunkAPI) => {
  const res = await authApi.login(arg);
  return { profile: res.data };

});

const _register = createAsyncThunk("auth/register",// 2 - callback (условно наша старая санка), в которую:
  // - первым параметром (arg) мы передаем аргументы необходимые для санки
  // (если параметров больше чем один упаковываем их в объект)
  // - вторым параметром thunkAPI, обратившись к которому получим dispatch и др. свойства
  (arg: ArgRegisterType, thunkAPI) => {
    // const {dispatch,getState,rejectWithValue}=thunkAPI
    authApi.register(arg).then((res) => {
      // debugger;
      console.log("register", res.data);
      // res.data.addedUser.
    });
  });
const _login = createAsyncThunk("auth/login", (arg: ArgLoginType, thunkAPI) => {
  return authApi.login(arg).then(res => {
    return { profile: res.data };
  });
});

const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
      });
  }
});

export const authReducer = slice.reducer;
export const authThunks = { register, login };