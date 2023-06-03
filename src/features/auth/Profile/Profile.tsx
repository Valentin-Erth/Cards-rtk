import React from "react";
import { useAppDispatch } from "../../../app/hooks";
import Button from '@mui/material/Button';
import s from './Profile.module.css'
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppSelector } from "../../../common/utils/createAppAsyncThunk";
import { authThunks } from "../auth.slice";
import ava from "../../../images/8_102.jpg"
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const dispatch=useAppDispatch()
    const emailUser=useAppSelector(state => state.auth.user?.email)
  const LogoutHandler=()=>{
    dispatch(authThunks.logout())
        }
  return (
    <div className={s.container}>
      <div className={s.header}>Personal Information</div>
      <div><img src={ava} className={s.fotoUser}/></div>
      <div><span>Name</span></div>
      <div className={s.titleLogin}>{emailUser?emailUser: <span>not authorized</span>}</div>
      <Button variant="outlined" color={"inherit"} startIcon={<LogoutIcon/>} onClick={LogoutHandler} style={{border:'none',color:"black", borderRadius: "30px", boxShadow:"0px 2px 10px rgba(109, 109, 109, 0.25), inset 0px 1px 0px rgba(255, 255, 255, 0.3)"}}>Log Out</Button>
    </div>
  );
};

