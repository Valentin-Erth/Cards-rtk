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

//аналог enam,поля только для чтения
const ResultCode= {
  Success: 0,
  Error: 1,
  Captcha: 10
} as const;
const registration = createAppAsyncThunk<any, ArgRegisterType>("auth/register", (arg, thunkAPI) => {
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
const getMe = createAppAsyncThunk("auth/getMe", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authApi.getMe();
    // console.log(res);
    return { user: res.data };
  }, false);
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
    user: null as ProfileType | null,
    isAuth: false,
    isInitialized: false,
    email: "",
    password: ""
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.profile;
        state.isAuth = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload.user;
          state.isAuth = true;
          state.isInitialized = true;
        }
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isInitialized = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isAuth = false;
      })
      .addCase(sendResetPassword.fulfilled, (state, action) => {
        // console.log(action);
        state.email = action.meta.arg.email;
      })
      .addCase(setNewPassword.fulfilled, (state, action) => {
        // debugger
        state.password = action.meta.arg.password;
        // console.log(current(state));
      })
      .addCase(editMe.fulfilled, (state, action) => {
        // console.log(action);
        if (state.user) {
          state.user.name = action.payload.data.updatedUser.name;
        }
      });

  }
});

export const authReducer = slice.reducer;
export const authThunks = { registration, login, getMe, logout, sendResetPassword, setNewPassword, editMe };