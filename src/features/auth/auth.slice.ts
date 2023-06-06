import { createAsyncThunk, createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import {
  ArgLoginType,
  ArgRegisterType,
  authApi, EditMeArgs,
  ForgotArgs,
  MeResType,
  ProfileType,
  SetNewPasswordArgs
} from "./auth.api";
import { createAppAsyncThunk, globalRouter } from "../../common/utils/createAppAsyncThunk";


const register = createAppAsyncThunk<void, ArgRegisterType>("auth/register", async (arg, thunkAPI) => {
  const {rejectWithValue}=thunkAPI
  try {
    const res = await authApi.register(arg);
  } catch (e) {
    // console.error(e);
    return rejectWithValue(e)
  }

});
const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>
("auth/login", async (arg, thunkAPI) => {
  const res = await authApi.login(arg);
  return { profile: res.data };
});
const logout = createAppAsyncThunk("auth/logout", async (arg, thunkAPI) => {
  const res = await authApi.logout();
});

const getMe = createAppAsyncThunk<{ user: MeResType }>("auth/getMe", async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await authApi.getMe();
      // debugger
      return { user: res.data };
    } catch (error: any) {
      // if (e.response.status===401 && globalRouter.navigate){
      //   globalRouter.navigate('/login')
      // }
      return rejectWithValue(null);
    }
  }
);
const sendResetPassword = createAppAsyncThunk("auth/resetPassword", async (arg: ForgotArgs) => {
  // debugger
  return await authApi.forgotPassword({ email: arg.email, from: arg.from, message: arg.message });
});
const setNewPassword = createAppAsyncThunk("auth/newPassword", async (arg: SetNewPasswordArgs) => {
  return await authApi.setNewPassword({
    password: arg.password,
    resetPasswordToken: arg.resetPasswordToken
  });
});
const editMe = createAppAsyncThunk("auth/editMe", async (arg: EditMeArgs) => {
  debugger
  return await authApi.editMe({ name: arg.name });
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
    user: null as MeResType | null,
    isAuth: false,
    isLoading: true,
    error: null as null | string,
    profile: null as ProfileType | null,
    email: "",
    password: "",
    name: "" as undefined | string
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
        state.isAuth = true;
        state.isLoading = false;
      })
     .addCase(login.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload.user;
          // console.log(state.user.email);
          state.isAuth = !!state.user;
        }
        state.isLoading = false;
      })
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendResetPassword.fulfilled, (state, action) => {
        // debugger
        console.log(action);
        state.email = action.meta.arg.email;
      })
      .addCase(setNewPassword.fulfilled, (state, action) => {
        // debugger
        state.password = action.meta.arg.password;
        console.log(current(state));
      })
      .addCase(editMe.fulfilled, (state, action) => {
        debugger
        console.log(action);
        state.name = action.meta.arg.name;
      });
  }
});

export const authReducer = slice.reducer;
export const authThunks = { register, login, getMe, logout, sendResetPassword, setNewPassword, editMe };