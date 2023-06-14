import { instance } from "../../common/api/common.api";

export const packsApi={
  getPacks:(arg:GetPacksArg)=>{
return instance.get<PacksResType>('cards/pack',{params:{...arg}})
},
  addPack:(arg:AddPackArg)=>{
    return instance.post('cards/pack')
  },
  deletePack:(id:string)=>{
    return instance.delete( `/cards/pack?id=${id}`)
  },
  updatePack:(arg:UpdatePackArg)=>{
    return instance.put('cards/pack',{cardsPack:{...arg}})
  }
}

//Types
export type GetPacksArg={
  packName?: string;
  min?: number;
  max?: number;
  sortPacks?: string;
  page?: number;
  pageCount?: number;
  user_id?: string;
}
export type PacksResType={
  cardPacks: CardPackType[];
  page: number; //выбранная страница
  pageCount: number; //количество эл-ов на странице
  cardPacksTotalCount: number; //количество колод
  minCardsCount: number;
  maxCardsCount: number;
  token: string;
  tokenDeathTime: number;
}
export type CardPackType = {
  _id: string;
  user_id: string;
  user_name: string;
  private: boolean;
  name: string;
  path: string;
  grade: number;
  shots: number;
  deckCover: string;
  cardsCount: number;
  type: string;
  rating: number;
  created: string;
  updated: Date;
  more_id: string;
  __v: number;
};
type AddPackArg={
  name?: string; // если не отправить будет "no Name"
  deckCover?: string; // не обязателен  url/base64
  private?: boolean; // если не отправить будет false
}
export type UpdatePackArg = {
  _id: string;
  name?: string;
};