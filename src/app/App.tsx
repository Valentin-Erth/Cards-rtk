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
    const isInitialized = useAppSelector(state => state.auth.isInitialized);
    const dispatch = useAppDispatch();
    // const navigate = useNavigate();
    useEffect(() => {
      setTimeout(() => {
        dispatch(appActions.setIsLoading({ isLoading: false }));
        toast("Loaded successfully");
      }, 1000);
    }, []);
    useEffect(() => {
      if (!isInitialized) {
        dispatch(authThunks.getMe());
      }
    }, [isInitialized]);

    return (
      <div>
        {isLoading ?
          <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}><Loader /></div>
          : <RouterProvider router={routes} />}
        {/*<RouterProvider router={routes} />*/}
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

