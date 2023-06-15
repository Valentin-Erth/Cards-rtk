import React from "react";
import logo from "../images/Group 753.svg";
import s from "./header.module.css";
import { useAppSelector } from "../common/hooks/hooks";
import ava from "../images/8_102.jpg";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";


export const Header = () => {
  const nameUser = useAppSelector(state => state.auth.user?.name);
  const isAuth = useAppSelector(state => state.auth.isAuth);
  return (
    <div className={s.wrapper}>
      <img src={logo} alt="logo" />
      {isAuth ?
        <div className={s.avaUserHeader}>{nameUser}<img src={ava} className={s.fotoUser} /></div>
        : <Button variant={"contained"} color={"primary"}
                  style={{ borderRadius: "30px", width: "113px" }}>
          <NavLink to="/login" className={s.loginLink}> Sign in</NavLink>
        </Button>
      }
      {/*<Button variant={"contained"} color={"primary"}*/}
      {/*        style={{ borderRadius: "30px", width: "113px" }}>*/}
      {/*  <NavLink to="/login" className={s.loginLink}> Sign in</NavLink>*/}
      {/*</Button>*/}
    </div>
  );
};

