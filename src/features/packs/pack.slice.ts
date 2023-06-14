import { createSlice } from "@reduxjs/toolkit";
import { CardPackType, GetPacksArg, packsApi, PacksResType } from "./packsApi";
import { createAppAsyncThunk } from "../../common/utils/createAppAsyncThunk";
import { thunkTryCatch } from "../../common/utils/thunk-try-catch";

//Thunks
export const getPacks=createAppAsyncThunk<{ packs:PacksResType },GetPacksArg >("packs/getPacks",
  async (arg, thunkAPI)=>{
  return thunkTryCatch(thunkAPI,async ()=>{
    const res=await packsApi.getPacks(arg)
    console.log(res.data);
    return {packs: res.data}
  })
  }
)

const slice=createSlice({
  name: "packs",
  initialState:{
    cardPacks: [] as CardPackType[],
    cardPacksTotalCount: null as number | null,
    maxCardsCount: 100 as number,
    minCardsCount: 0 as number,
    page: 1 as number, // выбранная страница
    pageCount: 6 as number, // количество элементов на странице
  },
  reducers:{},
  extraReducers:(builder)=>{
builder
  .addCase(getPacks.fulfilled, (state, action)=>{
    state.cardPacks=action.payload.packs.cardPacks
    state.cardPacksTotalCount = action.payload.packs.cardPacksTotalCount;
    state.maxCardsCount = action.payload.packs.maxCardsCount;
    state.minCardsCount = action.payload.packs.minCardsCount;
    state.page = action.payload.packs.page;
    state.pageCount = action.payload.packs.pageCount;
  })
  }
})
export const packReducer=slice.reducer
export const packActions=slice.actions
export const packsThunks = {getPacks}