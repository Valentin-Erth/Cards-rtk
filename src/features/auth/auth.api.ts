import { instance } from "../../common/api/common.api";

export const authApi = {
  register: (arg: ArgRegisterType) => {
    return instance.post<RegisterResponseType>("auth/register", arg);
  },
  login: (arg: ArgLoginType) => {
    //TODO
    return instance.post<ProfileType>("auth/login", arg);
  }
};

//Types
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

