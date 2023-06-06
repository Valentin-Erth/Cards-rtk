import React from "react";
import { useAppSelector } from "../../common/utils/createAppAsyncThunk";
import { Navigate } from "react-router-dom";

export const Packs = () => {
  const isAuth = useAppSelector(state => state.auth.isAuth)
  // if (!isAuth) {
  //   return <Navigate to={'/login'} />
  // }
  return (
    <div>
<h1>Packs</h1>
    </div>
  );
};

