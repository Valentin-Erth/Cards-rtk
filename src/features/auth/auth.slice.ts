import { createSlice, current } from "@reduxjs/toolkit";
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
import { thunkTryCatch } from "../../common/utils/thunk-try-catch";
import { appActions } from "../../app/app.slice";

const register = createAppAsyncThunk<any, ArgRegisterType>("auth/register", (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {// если не сработает запрос попадем в катч ошибки
    const res = await authApi.register(arg);
    return res.data;
  });
});
const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>
("auth/login", (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, () => {
    return authApi.login(arg).then((res) => {
      return { profile: res.data };
    });
  });
});
const logout = createAppAsyncThunk("auth/logout", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authApi.logout();
  });
});
const getMe = createAppAsyncThunk<{ user: MeResType }>("auth/getMe", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authApi.getMe();
    return { user: res.data };
  });
});
const sendResetPassword = createAppAsyncThunk("auth/resetPassword", async (arg: ForgotArgs, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    return await authApi.forgotPassword({ email: arg.email, from: arg.from, message: arg.message });
  });
});
const setNewPassword = createAppAsyncThunk("auth/newPassword", async (arg: SetNewPasswordArgs, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    return await authApi.setNewPassword({
      password: arg.password,
      resetPasswordToken: arg.resetPasswordToken
    });
  });

});
const editMe = createAppAsyncThunk("auth/editMe", async (arg: EditMeArgs, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    return await authApi.editMe({ name: arg.name });
  });
});

const slice = createSlice({
  name: "auth",
  initialState: {
    user: null as MeResType | null,
    isAuth: false,
    error: null as null | string,
    profile: null as ProfileType | null,
    email: "",
    isLoading:false,
    password: "",
    name: "" as undefined | string
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.profile;
        state.isAuth = true;
        // state.isLoading = false;
      })
     .addCase(getMe.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload.user;
          // console.log(state.user.email);
          state.isAuth = !!state.user;
        }
      })
      .addCase(sendResetPassword.fulfilled, (state, action) => {
        console.log(action);
        state.email = action.meta.arg.email;
      })
      .addCase(setNewPassword.fulfilled, (state, action) => {
        // debugger
        state.password = action.meta.arg.password;
        console.log(current(state));
      })
      .addCase(editMe.fulfilled, (state, action) => {
        console.log(action);
        if (state.user) {
          state.user.name = action.payload.data.updatedUser.name;
        }
      })

  }
});

export const authReducer = slice.reducer;
export const authThunks = { register, login, getMe, logout, sendResetPassword, setNewPassword, editMe };