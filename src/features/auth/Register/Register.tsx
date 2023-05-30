import React from "react";
import { useAppDispatch } from "../../../app/hooks";
import { authThunks } from "../auth.slice";
import s from './register.module.css'

export const Register = () => {
  const dispatch = useAppDispatch();
  const registerHandler = () => {
    const payload = {
      email: "nya-admin@nya.nya",
      password: "1qazxcvBG"
    };
    dispatch(authThunks.register(payload));
  };
  return (
    <div className={s.container}>
      <h1>Register</h1>
      <button onClick={registerHandler}>register</button>
    </div>
  );
};

