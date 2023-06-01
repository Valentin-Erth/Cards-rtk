import { instance } from "../../common/api/common.api";

export const authApi = {
  register: (arg: ArgRegisterType) => {
    return instance.post<RegisterResponseType>("auth/register", arg);
  },
  login: (arg: ArgLoginType) => {
    return instance.post<ProfileType>("auth/login", arg);
  },
  getMe: () => {
    return instance.post<MeResType>('auth/me')
  },
  logout: () => {
    return instance.delete('auth/me')
  },
  editMe: (args: EditMeArgs) => {
    return instance.put('auth/me', args)
  },
  forgotPassword: (args: ForgotArgs) => {
    return instance
      // TODO
      .post('auth/forgot', args)
  },
  setNewPassword: (args: SetNewPasswordArgs) => {
    // TODO
    return instance.post('auth/set-new-password', args)
  },
}
//Types
export type MeResType={
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number; // количество колод
  created: string;
  updated: string;
  isAdmin: boolean;
  verified: boolean; // подтвердил ли почту
  rememberMe: boolean;

  error?: string;
}
export type SetNewPasswordArgs = {
  password: string
  resetPasswordToken: string
}
type LoginOutRes={

}
type ForgotArgs={
  email: string // кому восстанавливать пароль
  from: string // от кого придёт письмо
  message: string // письмо, вместо $token$ бэк вставит токен. Пример:
  // <div style="background-color: indianred; padding: 15px">
  //     password recovery link:
  //   <a href="http://localhost:3000/#/set-new-password/$token$">
  //     link
  //   </a>
  // </div>
}
type EditMeArgs={
  name?: string
  avatar?: string
}
export type RegisterResponseType = {
  addedUser: Omit<ProfileType, "token" | "tokenDeathTime">
}
export type ProfileType = {
  _id: string;
  email: string;
  rememberMe: boolean;
  isAdmin: boolean;
  name: string;
  verified: boolean;
  publicCardPacksCount: number;// количество колод
  created: string;
  updated: string;// подтвердил ли почту
  __v: number;

  token: string;
  tokenDeathTime: number;
}

export type ArgRegisterType = Omit<ArgLoginType, "rememberMe">
export type ArgLoginType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

