import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArgLoginType, ArgRegisterType, authApi, MeResType, ProfileType } from "./auth.api";
import { createAppAsyncThunk } from "../../common/utils/createAppAsyncThunk";

const register = createAppAsyncThunk<void, ArgRegisterType>("auth/register", async (arg) => {
  const res = await authApi.register(arg);
});
const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>
("auth/login", async (arg, thunkAPI) => {
  const res = await authApi.login(arg);
  return { profile: res.data };
});
const getMe = createAppAsyncThunk<{ user: MeResType}>("auth/getMe", async (arg, thunkAPI) => {
    const res = await authApi.getMe()
    debugger;
    return { user: res.data };
  }
);

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
    user: null as MeResType | null,
    isAuth: false,
    isLoading: true,
    error: null as null | string,
    profile: null as ProfileType | null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload.user;
          state.isAuth=!!state.user
        }
        state.isLoading = false;
      })
  .addCase(getMe.pending, (state) => {
      state.isLoading = true
    })
  }
});

export const authReducer = slice.reducer;
export const authThunks = { register, login,getMe };