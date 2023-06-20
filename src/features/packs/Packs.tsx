import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../common/utils/createAppAsyncThunk";
import { Navigate } from "react-router-dom";
import { useActions, useAppDispatch } from "../../common/hooks/hooks";
import { packsThunks } from "./pack.slice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SchoolIcon from "@mui/icons-material/School";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { RootState } from "../../app/store";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import TablePagination from "@mui/material/TablePagination";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import s from "./Packs.module.css";
import { SearchField } from "./search";
import { PacksSlider } from "./PackSlider/PackSlider";


export type QueryParamsType = {
  packName: string;
  page: number;
  pageCount: number;
  min: number;
  max: number;
  sortPacks: string;
  user_id: string;
};
export const Packs = () => {
  console.log("Packs");
  const { getPacks } = useActions(packsThunks);
  const isAuth = useAppSelector(state => state.auth.isAuth);
  const cardPacks = useAppSelector((state: RootState) => state.packs.cardPacks);
  const packsCount = useAppSelector((state: RootState) => state.packs.cardPacksTotalCount);
  const userId = useAppSelector((state: RootState) => state.auth.user?._id);
  const minCardsCount = useAppSelector((state: RootState) => state.packs.minCardsCount);
  const maxCardsCount = useAppSelector((state: RootState) => state.packs.maxCardsCount);
  const [sliderValuesLocal, setSliderValuesLocal] = useState([minCardsCount, maxCardsCount]);
  const [queryParams, setQueryParams] = useState<QueryParamsType>({
    packName: "",
    page: 0,
    pageCount: 6,
    min: 0,
    max: 100,
    sortPacks: "",
    user_id: ""
  });
  const [searchBarValue, setSearchBarValue] = useState(queryParams.packName);
  const packsPaginationCount: number = packsCount
    ? Math.ceil(packsCount / queryParams.pageCount)
    : 10;
  useEffect(() => {
    // debugger
    console.log("useEffect get packs");
    getPacks(queryParams);
  }, [queryParams]);

  const showMyPacks = () => {
    // console.log(userId);
    if (userId) setQueryParams({ ...queryParams, user_id: userId });
  };
  const showAllPacks = () => {
    setQueryParams({ ...queryParams, user_id: "" });
  };
  const sliderCallBack = (arr: number[]) => {
    setQueryParams({ ...queryParams, min: arr[0], max: arr[1] });
  };
  const resetFiltersHandler = () => {
    setSearchBarValue("");
    setSliderValuesLocal([minCardsCount, maxCardsCount]);
    setQueryParams({
      packName: "",
      min: 0,
      max: 100,
      page: 1,
      pageCount: 6,
      user_id: "",
      sortPacks: ""
    });
  };
  const changeDateFormat = (date: Date) => {
    const newDate = new Date(date);
    return `${newDate.getDate().toString().padStart(2, "0")}.${(newDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${newDate.getFullYear().toString()}`;
  };
  //TODO  add update delete

  // const paginationChangeHandler = (event: React.ChangeEvent<unknown>, value: number) => {
  //   setQueryParams({ ...queryParams, page: value });
  // };
  // const changeCountRows = (event: SelectChangeEvent) => {
  //   setQueryParams({ ...queryParams, pageCount: +event.target.value });
  // };
  const handleChangePage = (event: unknown, newPage: number) => {
    setQueryParams({ ...queryParams, page: newPage });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryParams({ ...queryParams, pageCount: +event.target.value });
  };
  return (
    <div className={s.packs}>
      <div className={s.packsContainer}>
        <div className={s.titleBlock}>
          <span className={s.title}>Packs List</span>
          <Button variant={"contained"} color={"primary"}
                  style={{ borderRadius: "30px", width: "175px" }}>
            Add new pack
          </Button>
        </div>
        <div className={s.actionsBlock}>
          <div className={s.search}>
            <span>Search</span>
            <SearchField
              queryParams={queryParams}
              setQueryParams={setQueryParams}
              searchValue={searchBarValue}
              setSearchValue={setSearchBarValue}
            />
          </div>
          <div className={s.showCards}>
            <span>Show packs cards</span>
            <div className={s.buttons}>
              <Button variant={"contained"} color={"primary"} onClick={showMyPacks}
                      style={{ borderRadius: "30px", width: "98px" }}>
                My
              </Button>
              <Button variant={"contained"} color={"primary"} onClick={showAllPacks}
                      style={{ borderRadius: "30px", width: "98px" }}>
                All
              </Button>
            </div>
          </div>
          <div className={s.slider}>
            <span>Number of cards</span>
            <div className={s.sliderContent}>
              <PacksSlider
                sliderCallBack={sliderCallBack}
                sliderValuesLocal={sliderValuesLocal}
                setSliderValuesLocal={setSliderValuesLocal}
              />
            </div>
          </div>
        </div>
        {cardPacks.length === 0 ? (
          <div className={s.noPacksError}>
            Колоды не найдены.
          </div>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <colgroup>
                <col style={{ width: "30%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "15%" }} />
              </colgroup>
              <TableHead sx={{ background: "#EFEFEF" }}>
                <TableRow>
                  <TableCell sx={{ padding: "16px 16px 16px 36px" }}>Name</TableCell>
                  <TableCell align="left">Cards</TableCell>
                  <TableCell align="left">Last updated</TableCell>
                  <TableCell align="left">Created By</TableCell>
                  <TableCell align="left" sx={{ padding: "16px 36px 16px 16px" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cardPacks.map((p) => (
                  <TableRow key={p._id}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row" sx={{ padding: "16px 16px 16px 36px" }}>
                      {p.name}
                    </TableCell>
                    <TableCell align="left">{p.cardsCount}</TableCell>
                    <TableCell align="left">{changeDateFormat(p.updated)}</TableCell>
                    <TableCell align="left">{p.user_name}</TableCell>
                    <TableCell align="left" sx={{ padding: "16px 28px 16px 8px" }}>
                      <IconButton aria-label="learn">
                        <SchoolIcon />
                      </IconButton>
                      <IconButton
                        aria-label="edit"
                        // onClick={() => updatePackHandler(p._id, "updatedPack13")}
                        //TODO modal
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton aria-label="delete"
                        // onClick={() => deletePackHandler(p._id)}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/*<div className={s.paginationBlock}>*/}
        {/*  <Pagination*/}
        {/*    shape={"rounded"}*/}
        {/*    count={packsPaginationCount}*/}
        {/*    color="primary"*/}
        {/*    page={queryParams.page}*/}
        {/*    onChange={paginationChangeHandler}*/}
        {/*  />*/}
        {/*  <span>Show</span>*/}
        {/*  <FormControl>*/}
        {/*    <Select value={queryParams.pageCount.toString()} onChange={changeCountRows} autoWidth>*/}
        {/*      <MenuItem value={"4"}>4</MenuItem>*/}
        {/*      <MenuItem value={"6"}>6</MenuItem>*/}
        {/*      <MenuItem value={"8"}>8</MenuItem>*/}
        {/*      <MenuItem value={"10"}>10</MenuItem>*/}
        {/*    </Select>*/}
        {/*  </FormControl>*/}
        {/*  <span>Packs per page</span>*/}
        {/*</div>*/}
        <TablePagination
          rowsPerPageOptions={[4, 6, 8, 10]}
          component="div"
          count={packsPaginationCount}
          rowsPerPage={queryParams.pageCount}
          page={queryParams.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

