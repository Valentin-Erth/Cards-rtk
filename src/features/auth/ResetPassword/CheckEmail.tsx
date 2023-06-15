import React from "react";
import s from "./SetPaswword.module.css";
import mail from "../../../images/Group 281.svg";
import { useAppSelector } from "../../../common/hooks/hooks";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";

export const CheckEmail = () => {
  const email = useAppSelector(state => state.auth.email);
  return (
    <div className={`${s.container} ${s.containerMail}`}>
      <div className={s.header}>Check Email</div>
      <img src={mail} />
      <div className={s.question}>We’ve sent an Email with instructions to <br/> {email?email:'example@mail.com' }</div>
      <Button type={"button"} variant={"contained"} color={"primary"}
              style={{ width: "347px", borderRadius: "30px", marginTop: "49px" }}>
        <NavLink className={s.ButtonLink} to="/login">Back to login</NavLink>
      </Button>
    </div>
  );
};

