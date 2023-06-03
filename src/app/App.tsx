import { useAppDispatch, useAppSelector } from "./hooks";
import React, { useEffect } from "react";
import { appActions } from "./app.slice";
import CircularProgress from "@mui/material/CircularProgress";
import { RouterProvider, useNavigate } from "react-router-dom";
import { routes } from "../routes/routes";
import { authThunks } from "../features/auth/auth.slice";

function App() {
  const isLoading = useAppSelector((state) => state.app.isLoading);
  const user=useAppSelector(state => state.auth.user)
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      dispatch(appActions.setIsLoading({ isLoading: false }));
    }, 1000);
  }, []);
  useEffect(() => {
    if (!user){
      // debugger
      dispatch(authThunks.getMe())
        // .unwrap()
        // .catch((error)=> {
        //   if (error.response.status===401) {
        //     console.log(error);
        //     navigate('/login')
        //   };
        // })
    }
  }, [])
  return (
    <div>
      {isLoading? <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}><CircularProgress
        size={100} /></div>
      :<RouterProvider router={routes} />
      }
    </div>
  );
}

export default App;