import { createBrowserRouter, Navigate } from "react-router-dom";
import { ErrorPage } from "../ErrorPage";
import { Login } from "../features/auth/Login/Login";
import { Register } from "../features/auth/Register/Register";
import React from "react";
import { Packs } from "../features/packs/Packs";

export const routes=createBrowserRouter([
  {
    path:"/",
    element:<Navigate to={"/packs"}/>,
    errorElement:<ErrorPage/>,
  },
  {
    path:"/404",
    element: <h1>404: PAGE NOT FOUND</h1>
  },
  {
    path:"*",
    element: <Navigate to={"/404"}/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/register",
    element:<Register/>
  },
  {
    path:"/forgot-password",
    element:<h1>FogotPassword</h1>
  },
  {
    path:"/check-email",
    element:<h1>CheckEmail</h1>
  },
  {
    path:"/set-new-password/:token",
    element:<h1>SetNewPassword</h1>
  },
  //require auth
  {
    path:"/profile",
    element:<h1>Profile</h1>
  },
  {
    path:"/packs",
    element:<Packs/>
  },
])