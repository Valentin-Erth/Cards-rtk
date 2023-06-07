import React, { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import Button from "@mui/material/Button";
import s from "./Profile.module.css";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppSelector } from "../../../common/utils/createAppAsyncThunk";
import { authThunks } from "../auth.slice";
import ava from "../../../images/8_102.jpg";
import TextField from "@mui/material/TextField";
import pen from "../../../images/Pen.svg";


export const Profile = () => {
  const dispatch = useAppDispatch();
  const nameUser = useAppSelector(state => state.auth.user?.name);
  console.log(nameUser);
  const emailUser = useAppSelector(state => state.auth.user?.email);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [localTitle, setlocalTitle] = useState<string | undefined>(nameUser);
  console.log(localTitle);
  const LogoutHandler = () => {
    dispatch(authThunks.logout());
  };
  const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setlocalTitle(e.currentTarget.value);
  };
  const onEditMode = () => {
    setEditMode(true);
  };
  const offEditMode = () => {
    // setEditMode(false);
    // changeTitle(localTitle)
  };
  const handleSave = () => {
    dispatch(authThunks.editMe({ name: localTitle }));
    // console.log(`Save ${localTitle}`);
    setEditMode(false);
  };
  return (
    <div className={s.container}>
      <div className={s.header}>Personal Information</div>
      <div><img src={ava} className={s.fotoUser} /></div>
      {editMode ?
        <TextField value={localTitle} onChange={changeLocalTitle} autoFocus={true} onBlur={offEditMode}
                   margin="normal" type={"email"} variant={"standard"} style={{ width: "347px" }} InputProps={{
          endAdornment: (
            <Button variant="contained" onClick={handleSave} size={"small"}>
              Save
            </Button>)
        }} />
        : <span className={s.name} onDoubleClick={onEditMode}>{nameUser} <img src={pen} /></span>}
      <div className={s.titleLogin}>{emailUser ? emailUser : <span>not authorized</span>}</div>
      <Button variant="outlined" color={"inherit"} startIcon={<LogoutIcon />} onClick={LogoutHandler} style={{
        border: "none",
        color: "black",
        borderRadius: "30px",
        boxShadow: "0px 2px 10px rgba(109, 109, 109, 0.25), inset 0px 1px 0px rgba(255, 255, 255, 0.3)"
      }}>Log Out</Button>
    </div>
  );
};


