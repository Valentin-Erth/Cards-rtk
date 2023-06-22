import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../common/utils/createAppAsyncThunk";
import { Link, Navigate } from "react-router-dom";
import { packsThunks } from "./pack.slice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import SchoolIcon from "@mui/icons-material/School";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { RootState } from "../../app/store";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import TablePagination from "@mui/material/TablePagination";
import TableSortLabel from "@mui/material/TableSortLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import s from "./Packs.module.css";
import { SearchField } from "./search";
import { PacksSlider } from "./PackSlider/PackSlider";
import { maxCardsCount_Selector, minCardsCount_Selector, packs_Selector, packsCount_Selector } from "./packsSelector";
import { isAuth_auth_Selector, userId_auth_Selector } from "../auth/authSelectors";
import { useActions } from "../../common/hooks/useActions";


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
  const { getPacks,addPack,updatePack,removePack} = useActions(packsThunks);
  const isAuth = useAppSelector(isAuth_auth_Selector);
  const packs = useAppSelector(packs_Selector);
  const packsCount = useAppSelector(packsCount_Selector);
  const userId = useAppSelector(userId_auth_Selector);
  const minCardsCount = useAppSelector(minCardsCount_Selector);
  const maxCardsCount = useAppSelector(maxCardsCount_Selector);
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

  const updatedSortHandler = () => {
    if (queryParams.sortPacks === "1updated" || queryParams.sortPacks === "") {
      setQueryParams((prevState) => ({
        ...prevState,
        sortPacks: "0updated",
        page: 0,
      }));
    } else {
      setQueryParams((prevState) => ({
        ...prevState,
        sortPacks: "1updated",
        page: 0,
      }));
    }
  };
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
                  style={{ borderRadius: "30px", width: "175px" }} onClick={()=>{addPack({name:"NewPack"})}}>
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
          <div className={s.resetFilter}>
            <IconButton aria-label="filterOff" onClick={resetFiltersHandler}>
              <FilterAltOffIcon color={"primary"} />
            </IconButton>
          </div>
        </div>
        {packs.length === 0 ? (
          <div className={s.noPacksError}>
            Колоды не найдены. Измените параметры фильтра / поиска
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
                  <TableCell align="left" onClick={updatedSortHandler}
                             sx={{ display: "flex" }}>
                    <TableSortLabel
                      active={queryParams.sortPacks !== ""} //should be true for the sorted column
                      direction={queryParams.sortPacks !== "0updated" ? "desc" : "asc"} // The current sort direction /"desc"
                    >
                      Last updated
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="left">Created By</TableCell>
                  <TableCell align="left" sx={{ padding: "16px 36px 16px 16px" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {packs.map((p) => (
                  <TableRow key={p._id}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row" sx={{ padding: "16px 16px 16px 36px" }}>
                      <Link to={`/cards/pack/${p._id}`} style={{ textDecoration: "none", color: "inherit" }}>{p.name}</Link>
                    </TableCell>
                    <TableCell align="left">{p.cardsCount}</TableCell>
                    <TableCell align="left">{changeDateFormat(p.updated)}</TableCell>
                    <TableCell align="left">{p.user_name}</TableCell>
                    <TableCell align="left" sx={{ padding: "16px 28px 16px 8px" }}>
                      <span style={{ width: "33%" }}>
                        {p.cardsCount !== 0 && (
                          <IconButton aria-label="learn">
                            <SchoolIcon color={"primary"} />
                          </IconButton>
                        )}
                      </span>
                      {userId===p.user_id && (
                        <span style={{ width: "67%" }}>
                        <IconButton aria-label="edit"
                          onClick={() => updatePack({_id: p._id, name:"updatedPack13" })}
                          //TODO modal
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete"
                        onClick={() => removePack(p._id)}
                        >
                        <DeleteOutlineIcon />
                        </IconButton>
                          </span>
                      )}

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
        {/*  <span>packs per page</span>*/}
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

