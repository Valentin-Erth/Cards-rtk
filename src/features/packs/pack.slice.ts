import { createSlice } from "@reduxjs/toolkit";
import { AddPackArg, CardPackType, GetPacksArg, packsApi, PacksResType, UpdatePackArg } from "./packsApi";
import { createAppAsyncThunk } from "../../common/utils/createAppAsyncThunk";
import { thunkTryCatch } from "../../common/utils/thunk-try-catch";

//Thunks
export const getPacks=createAppAsyncThunk<{ packs:PacksResType },GetPacksArg >("packs/getPacks",
  async (arg, thunkAPI)=>{
  return thunkTryCatch(thunkAPI,async ()=>{
   const res=await packsApi.getPacks(arg)
    return {packs: res.data}
  })
  }
)
export const addPack = createAppAsyncThunk<{ pack: CardPackType }, AddPackArg>(
  "packs/addPack",
   (arg, thunkAPI) => {
    const { dispatch } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      await packsApi.addPack(arg);
      // return { pack: res.data.newCardsPack}
      dispatch(getPacks({}));

    });
  }
);
export const removePack = createAppAsyncThunk<{ packId: string }, {_id: string }>(
  "packs/deletePack",
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      await packsApi.deletePack(arg._id);
      // dispatch(getPacks({}));
      // // TODO fetch packs with prev queryParams after delete  action
      // return {packId: res.data.deletedCardsPack._id}
    });
  }
);
export const updatePack = createAppAsyncThunk<{ pack: CardPackType }, UpdatePackArg & {userId?:string}>(
  "packs/updatePack",
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      dispatch(packActions.savePackName(arg.name));
      await packsApi.updatePack(arg);
      dispatch(getPacks({user_id:arg.userId}));
      // return {pack: res.data.updatedCardsPack}
    });
  }
);



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
  reducers: {
    savePackName: (state, action) => {
      let packName = state.cardPacks.find((f) => f.name);
      packName = action.payload;
    },
  },
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
export const packsThunks = {getPacks,addPack,removePack,updatePack}

//immerJS trainy CRUD
//   .addCase(addPack.fulfilled,(state, action)=>{
//     state.cardPacks.unshift(action.payload.pack)
//   })
//   .addCase(removePack.fulfilled,(state, action)=>{
//     // const newPacks=state.cardPacks.filter((packs)=>{
//     //   return packs._id!==action.payload.packId
//     //   })
//     // state.cardPacks=newPacks
//     const index = state.cardPacks.findIndex((pack) => pack._id === action.payload.packId);
//     if (index !== -1) {
//       state.cardPacks.splice(index, 1);
//     };
//   })
//   .addCase(updatePack.fulfilled, (state, action)=>{
//     const index = state.cardPacks.findIndex((pack) => pack._id === action.payload.pack._id);
//     if (index !== -1) {
//       state.cardPacks[index]=action.payload.pack
//     };
//   })