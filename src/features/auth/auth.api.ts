import { instance } from "../../common/api/common.api";

export type ArgRegisterType={
  email: string
  password: string
}

export const authApi = {
  register: (arg:ArgRegisterType) => {
   return instance.post("auth/register", arg);
  }
};