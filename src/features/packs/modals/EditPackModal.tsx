import React from "react";
import { ChangeEvent, ReactNode, useState } from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useActions } from "common/hooks/useActions";
import s from './addPack.module.css'
import Button from "@mui/material/Button";
import { QueryParamsType } from "features/packs/Packs";
import { useAppDispatch } from "common/hooks/hooks";
import { packsThunks } from "../pack.slice";

type PropsType = {
  closeModal: () => void | ReactNode;
  _id: string;
  packName?: string;
  cover?: string;
  closeSecondModalHandler?: (value: null | HTMLElement) => void;
  queryParams?: QueryParamsType;
};

export const EditPackModal = ({
                                closeModal,
                                _id,
                                closeSecondModalHandler,
                                packName,
                                cover,
                                queryParams,
                              }: PropsType) => {
  const { updatePack, getPacks } = useActions(packsThunks);
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(true);
  const [name, setName] = useState(packName);
  // const [packCover, setPackCover] = useState(cover);
  // const [isCoverBroken, setIsCoverBroken] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const handleSetName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const cancelHandler = () => {
    closeModal();
    closeSecondModalHandler && closeSecondModalHandler(null);
  };
  const saveHandler = () => {
    updatePack({ _id, name})
      .then(() => getPacks(queryParams!));
    closeModal();
    closeSecondModalHandler && closeSecondModalHandler(null);
  };
  // const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files.length) {
  //     const file = e.target.files[0];
  //     if (file.size < 4000000) {
  //       convertFileToBase64(file, (file64: string) => {
  //         setPackCover(file64);
  //       });
  //     } else {
  //       console.error("Error: ", "Файл слишком большого размера");
  //     }
  //   }
  // };

  // const imgErrorHandler = () => {
  //   setIsCoverBroken(true);
  //   alert("Image is broken");
  // };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
{/*  <div className={s.coverBlock}>*/}
{/*  <img src={isCoverBroken ? defaultPackAva : packCover} alt="cover" onError={imgErrorHandler} />*/}
{/*  <label style={{ width: "100%" }}>*/}
{/*  <input style={{ display: "none" }} type="file" onChange={uploadHandler} accept="image/*" />*/}
{/*  <Button*/}
{/*    variant={"outlined"}*/}
{/*  component="span"*/}
{/*  sx={{ width: "100%", textTransform: "none", borderRadius: "30px" }}*/}
{/*>*/}
{/*  Change Pack Cover*/}
{/*  </Button>*/}
{/*  </label>*/}
{/*  </div>*/}
  <TextField
  autoFocus
  margin="none"
  label="Pack name"
  type="email"
  fullWidth
  variant="standard"
  sx={{ marginBottom: "29px", marginTop: "35px" }}
  size={"medium"}
  value={name}
  onChange={handleSetName}
  InputProps={{
    style: {
      fontSize: "20px",
    },
  }}
  InputLabelProps={{
    style: {
      fontSize: "20px",
    },
  }}
  />
  {/*TODO checkbox data*/}
  <FormControlLabel
    sx={{ marginBottom: "29px" }}
  control={<Checkbox checked={checked} onChange={handleChange} />}
  label="Private pack"
  />
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    <Button
      sx={{ width: "130px",height:"40px", borderRadius: "30px" }}
      onClick={cancelHandler}
    > Cancel</Button>
    <Button/>
    <Button
      sx={{ width: "130px",height:"40px",borderRadius: "30px" }}
      variant={"contained"}
      onClick={saveHandler}
    >Save</Button>

  </div>
  </div>
);
};
