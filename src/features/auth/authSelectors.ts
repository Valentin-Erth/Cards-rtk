import { RootState } from "../../app/store";

export const isAuth_auth_Selector = (state: RootState) => state.auth.isAuth;
export const userId_auth_Selector = (state: RootState) => state.auth.user?._id;
export const userAvatar_auth_Selector = (state: RootState) => state.auth.user?.avatar;
export const userName_auth_Selector = (state: RootState) => state.auth.user?.name;
export const userEmail_auth_Selector = (state: RootState) => state.auth.user?.email;
export const isInitialized_auth_Selector=(state:RootState)=>state.auth.isInitialized