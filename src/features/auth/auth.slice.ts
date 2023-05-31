import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArgLoginType, ArgRegisterType, authApi, ProfileType } from "./auth.api";

const _register = createAsyncThunk(
    "auth/register",
  // 2 - callback (условно наша старая санка), в которую:
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
const register = createAsyncThunk("auth/register",async(arg: ArgRegisterType) => {
   const res=await authApi.register(arg)
   });
const _login = createAsyncThunk("auth/login", (arg: ArgLoginType, thunkAPI) => {
  return authApi.login(arg).then(res => {
    return { profile: res.data };
  });
});
const login = createAsyncThunk("auth/login", async (arg: ArgLoginType, thunkAPI) => {
    const res=await authApi.login(arg)
    return { profile: res.data };
  });
const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null
  },
  reducers: {
//     setProfile:(state,action:PayloadAction<{profile:ProfileType }>)=>{
//       state.profile=action.payload.profile
// }
  },
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
      state.profile = action.payload.profile;
    });
  }
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunks = { register, login };