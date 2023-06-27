import React, { FC } from "react";
import Typography from "@mui/material/Typography";
import { QueryParamsType } from "../Packs";
import { useActions } from "../../../common/hooks/useActions";
import { packsThunks } from "../pack.slice";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

type PropsType = {
  closeModal: () => void;
  _id: string;
  packName?: string;
  closeSecondModalHandler?: (value: null | HTMLElement) => void;
  queryParams?: QueryParamsType;
};

export const DeletePackModal:FC<PropsType> = ({packName,closeModal,closeSecondModalHandler,_id,queryParams}) => {
  const { removePack, getPacks } = useActions(packsThunks);
  const location = useLocation();
  console.log(location.pathname.includes("/cards/pack/"));
  // const { packId } = useParams();
  const navigate = useNavigate();

  const cancelHandler = () => {
    closeSecondModalHandler && closeSecondModalHandler(null);
    closeModal();
  };
  const deleteHandler = () => {
    removePack({ _id })
      .then(() => {
        getPacks(queryParams!);
        if (location.pathname.includes("/cards/pack/")) navigate("/packs");
        toast.success(`${packName} pack successfully deleted `);
      })
      .catch((e: any) => {
        e?.message ? toast.error(e.message) : toast.error(e.errorMessage);
      });
    closeSecondModalHandler && closeSecondModalHandler(null);
    closeModal();
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Typography sx={{ marginBottom: "30px", marginTop: "35px" }}>
        Do you really want to remove <b>{packName}</b> pack?
        <br /> All cards in pack will be deleted!
      </Typography>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          sx={{ width: "130px",height:"40px", borderRadius: "30px" }}
          onClick={cancelHandler}
        >Cancel</Button>
        <Button
          sx={{ width: "130px",height:"40px", borderRadius: "30px" }}
          variant={"contained"}
          color={"error"}
          onClick={deleteHandler}
        >Delete</Button>
      </div>
    </div>
  );
};

