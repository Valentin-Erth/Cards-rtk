import React, { ChangeEvent, FC, useState } from "react";
import { BaseModal } from "../../../common/components/basicModal";
import { useActions } from "../../../common/hooks/useActions";
import { packsThunks } from "../pack.slice";
import s from './addPack.module.css'
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

type PropsType = {
  closeModal: () => void;
};

export const AddPackModal:FC<PropsType> = ({closeModal}) => {
  const {addPack}=useActions(packsThunks)
  const [checked, setChecked] = useState(true);
  const [name, setName] = useState("");
  // const [packCover, setPackCover] = useState(defaultPackAva);
  // const [isCoverBroken, setIsCoverBroken] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const cancelHandler = () => {
    closeModal();
  };
  const saveHandler = () => {
    // addPack({ name: name, deckCover: packCover });
    addPack({ name: name})
    closeModal();
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
         <div>
        <div className={s.coverBlock}>
          {/*<img src={isCoverBroken ? defaultPackAva : packCover} alt="cover" onError={imgErrorHandler} />*/}
          {/*<label style={{ width: "100%" }}>*/}
          {/*  <input style={{ display: "none" }} type="file" onChange={uploadHandler} accept="image/*" />*/}
          {/*  <Button*/}
          {/*    variant={"outlined"}*/}
          {/*    component="span"*/}
          {/*    sx={{ width: "100%", textTransform: "none", borderRadius: "30px" }}*/}
          {/*  >*/}
          {/*    Add Pack Cover*/}
          {/*  </Button>*/}
          {/*</label>*/}
        </div>
        <TextField
          autoFocus
          margin="none"
          label="Name pack"
          type="email"
          fullWidth
          variant="standard"
          sx={{ marginBottom: "29px" }}
          size={"medium"}
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.currentTarget.value);
          }}
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
          <Button
            sx={{ width: "130px",height:"40px",borderRadius: "30px" }}
            variant={"contained"}
            onClick={saveHandler}
          >Save</Button>
        </div>
      </div>

  );
};

