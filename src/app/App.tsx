import { useAppDispatch, useAppSelector } from "./hooks";
import React, { PropsWithChildren, useEffect } from "react";
import { appActions } from "./app.slice";
import CircularProgress from "@mui/material/CircularProgress";
import { Outlet, RouterProvider, useNavigate } from "react-router-dom";
import { routes } from "../routes/routes";
import { authThunks } from "../features/auth/auth.slice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../features/loader/loader";
import { Header } from "../Header/Header";


export const App = () => {
  const isLoading = useAppSelector((state) => state.app.isLoading);
  const user = useAppSelector(state => state.auth.user);
  const isAuthed=useAppSelector(state => state.auth.isAuth)
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      dispatch(appActions.setIsLoading({ isLoading: false }));
      toast("Loaded successfully");
    }, 1000);
  }, []);
  useEffect(() => {
    if (!isAuthed) {
       dispatch(authThunks.getMe())
        // .unwrap()
        // .then(() => console.log("authorized"))
        // .catch((e) => navigate("/login"))
    }
    }, [isAuthed]);

return (
  <div>
    {isLoading ?
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}><Loader /></div>
      : <RouterProvider router={routes} />}
    <ToastContainer
      position="top-center"
      autoClose={5000}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </div>
);
}
;
//<CircularProgress size={100} />
export const Layout = () => {
  const isLoading = useAppSelector((state) => state.app.isLoading);
  return (
    <div>
      <Header />
      {isLoading ?
        <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}><Loader /></div>
        : <Outlet />}
      {/*<div><h1>Footer</h1></div>*/}
    </div>
  );
};