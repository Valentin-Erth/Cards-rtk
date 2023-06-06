import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { ErrorPage } from "./ErrorPage";
import { Login } from "../features/auth/Login/Login";
import { Register } from "../features/auth/Register/Register";
import React from "react";
import { Packs } from "../features/packs/Packs";
import { Profile } from "../features/auth/Profile/Profile";
import { FogotPassword } from "../features/auth/ResetPassword/FogotPassword";
import { CheckEmail } from "../features/auth/ResetPassword/CheckEmail";
import { SetPassword } from "../features/auth/ResetPassword/SetPassword";


// const Layout = () => {
//   return (
//
//     <div style={{height: '100vh'}}>
//       <Header/>
//       <div className={cls.content}>
//         <Outlet/>
//       </div>
//      <Footer/>
//     </div>
//   )
// }

export const routes = createBrowserRouter([
  // {
  //   path: '/',
  //   element: <Layout/>,
  //   children: [
  //     {
  //       index: true,
  //       path: '/packs',
  //       element: <Packs/>
  //     }
  //   ]
  // },
  {
    path:"/404",
    element: <h1>404: PAGE NOT FOUND</h1>
  },
  // {
  //   path:"*",
  //   element: <Navigate to={"/404"}/>
  // },
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
    element:<FogotPassword/>
  },
  {
    path:"/check-email",
    element:<CheckEmail/>
  },
  {
    path:"/set-password/:token",
    element:<SetPassword/>
  },
  //require auth
  {
    path:"/profile",
    element:<Profile/>
  },
  {
    path:"/packs",
    element:<Packs/>
  },
])