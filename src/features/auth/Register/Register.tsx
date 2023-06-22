import React, { useState } from "react";
import { authThunks } from "../auth.slice";
import s from "./register.module.css";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useActions } from "../../../common/hooks/useActions";

type FormInputType = {
  email: string
  password: string
  confirmPassword: string
}
export const Register = () => {
  const {registration}=useActions(authThunks)
  const navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { errors, isSubmitting, isValid } } = useForm<FormInputType>({
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  });
  const [showPassword, setShowPassword] = useState(false);
  // const [isRegistered, setIsRegistered] = useState(false);
  const onSubmit: SubmitHandler<FormInputType> = data => {
    // console.log(data);
    registration(data)
      .unwrap()
      .then(() => {
        navigate("/login");
        toast.success("Successful registration")
      })
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={s.container}>
      {/*{!!error && <h2>{error}</h2>}*/}
      <div className={s.header}>Sign up</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormGroup>
            <TextField label="Email" margin="normal" type={"email"} variant={"standard"} {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })} style={{ width: "347px" }} error={Boolean(errors.email)} helperText={errors.email?.message} />
            <TextField type={showPassword ? "text" : "password"} label="Password" margin="normal"
                       variant={"standard"} {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })} error={Boolean(errors.password)} helperText={errors.password?.message}
                       InputProps={{
                         endAdornment: (
                           <InputAdornment position="end">
                             <IconButton onClick={handleShowPassword}>
                               {showPassword ? <VisibilityOff /> : <Visibility />}
                             </IconButton>
                           </InputAdornment>
                         )
                       }} />
            <TextField type={showPassword ? "text" : "password"} label="Confirm Password" margin="normal"
                       variant={"standard"} {...register("confirmPassword", {
              validate: (value) =>
                value === watch("password") || "Passwords do not match"
            })}
                       error={Boolean(errors.confirmPassword)} helperText={errors.confirmPassword?.message}
                       InputProps={{
                         endAdornment: (
                           <InputAdornment position="end">
                             <IconButton onClick={handleShowPassword}>
                               {showPassword ? <VisibilityOff /> : <Visibility />}
                             </IconButton>
                           </InputAdornment>
                         )
                       }} />
            <Button type={"submit"} variant={"contained"} color={"primary"}
                    style={{ borderRadius: "30px", marginTop: "69px" }}>
              Sign up
            </Button>
          </FormGroup>
        </FormControl>
      </form>
      <div className={s.question}>Already have an account?</div>
      <div>
        <NavLink to="/login" className={s.loginLink}> Sign in</NavLink>
      </div>
    </div>

    // <div className={s.container}>
    //   <h1>Register</h1>
    //   <button onClick={registerHandler}>register</button>
    // </div>
  );
};

