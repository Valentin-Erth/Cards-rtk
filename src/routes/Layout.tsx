import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../common/hooks/hooks";
import { Header } from "../Header/Header";
import { Loader } from "../features/loader/loader";
import React, { useEffect } from "react";
import { authThunks } from "../features/auth/auth.slice";
import { isAuth_auth_Selector } from "../features/auth/authSelectors";

export const Layout = () => {
  // debugger
  const navigate = useNavigate();
  const isAuth=useAppSelector(isAuth_auth_Selector)
  // console.log(isAuth);
  // useEffect(() => {
  //   if(!isAuth){
  //     navigate('/login')
  //   }
  // }, [isAuth]);

  return (
    <div>
      <Header />
       <Outlet />
     <footer>2023</footer>
    </div>
  );
};