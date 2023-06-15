import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { QueryParamsType } from "./Packs";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useDebounce } from 'use-debounce';


type SearchBarPropsType = {
  queryParams: QueryParamsType;
  setQueryParams: React.Dispatch<React.SetStateAction<QueryParamsType>>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchField:FC<SearchBarPropsType>=({searchValue,setSearchValue,setQueryParams,queryParams})=>{
  const [debouncedPackName] = useDebounce(searchValue, 800);
  const [isMounted, setIsMounted] = useState(false);
  const changeSearchHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (isMounted) {
      setQueryParams({ ...queryParams, packName: debouncedPackName });
    }
  }, [debouncedPackName]);
  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 413, height: 33 }}
    >
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Provide your text..."
        inputProps={{ "aria-label": "search packs" }}
        value={searchValue}
        onChange={changeSearchHandler}
      />
    </Paper>
)}
