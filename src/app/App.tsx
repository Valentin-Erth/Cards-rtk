import { useAppDispatch, useAppSelector } from "../common/hooks/hooks";
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
import { createPortal } from "react-dom";
import { isLoading_Selector } from "./appSelector";
import { isInitialized_auth_Selector } from "../features/auth/authSelectors";


export const App = () => {
  console.log('app render');
    const isLoading = useAppSelector(isLoading_Selector);
    const isInitialized = useAppSelector(isInitialized_auth_Selector);
    const dispatch = useAppDispatch();
    // const navigate = useNavigate();
    useEffect(() => {
      dispatch(authThunks.getMe());
      toast("Loaded successfully")
    }, []);

    return (
      <div>
         {(isLoading || !isInitialized) && createPortal(
          <div style={{ position: "absolute", inset: 0, display:'flex', justifyContent:'center', alignItems: 'center', backgroundColor:'#fff', zIndex:10 }}><Loader /></div>, document.body) }
        <RouterProvider router={routes} />
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

