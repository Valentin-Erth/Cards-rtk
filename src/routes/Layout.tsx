import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../common/hooks/hooks";
import { Header } from "../Header/Header";
import { Loader } from "../features/loader/loader";
import React, { useEffect } from "react";
import { authThunks } from "../features/auth/auth.slice";

export const Layout = () => {
  // debugger
  const navigate = useNavigate();
  const isAuth=useAppSelector(state => state.auth.isAuth)
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