import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { FC, ReactNode, useState } from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Button from "@mui/material/Button";

type BaseModalPropsType = {
  children: (close: () => void) => ReactNode;
  buttonType: "base" | "iconEdit" | "iconDelete";
  modalTitle: string;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  bgcolor: "#FFFFFF",
  boxShadow: 24,
  borderRadius: 2,
  padding: "19px 30px 47px 30px",
};

export const BaseModal:FC<BaseModalPropsType>=(
  { children, modalTitle, buttonType })=> {
  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      {buttonType === "base" ? (
        <Button
          style={{borderRadius: "30px", height: "36px"}}
          variant={"contained"}
          onClick={handleOpen}
        >{modalTitle}</Button>
      ) : (
        <IconButton onClick={handleOpen}>
          {buttonType === "iconEdit" ? (
            <EditIcon color={"primary"} />
          ) : (
            <DeleteOutlineIcon color={"primary"} />
          )}
        </IconButton>
      )}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 400,
          },
        }}
      >
        <Fade in={showModal}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h5"
              component="h1"
              sx={{ marginBottom: "19px", fontSize: "18px" }}
            >
              {modalTitle}
            </Typography>
            {/*<Divider sx={{ marginBottom: "35px" }} />*/}
            <Divider />
            {children(handleClose)}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}