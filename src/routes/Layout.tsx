import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { Header } from "../Header/Header";
import { Loader } from "../features/loader/loader";
import React, { useEffect } from "react";
import { authThunks } from "../features/auth/auth.slice";

export const Layout = () => {
  // debugger
  const navigate = useNavigate();
  const isLoading = useAppSelector((state) => state.app.isLoading);
  const isAuth=useAppSelector(state => state.auth.isAuth)
  console.log(isAuth);
  useEffect(() => {
    if(!isAuth){
      navigate('/login')
    }
  }, [isAuth]);

  return (
    <div>
      <Header />
      {/*{isLoading ?*/}
      {/*  <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}><Loader /></div>*/}
      {/*  : <Outlet />}*/}
      <Outlet />
     <footer>2023</footer>
    </div>
  );
};