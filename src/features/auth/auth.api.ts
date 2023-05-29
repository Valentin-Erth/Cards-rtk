import { instance } from "../../common/api/common.api";

type ResponseType={
  addedUser: {} // чтобы посмотреть как выглядит созданный юзер
  error?: string
}
type payloadRegisterType={
  email: string
  password:string

}
export const authApi={
  register:(payload:payloadRegisterType)=>{
    instance.post('/auth/register',payload)
  },
}