import Slider from "@mui/material/Slider";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../common/hooks/hooks";
import { maxCardsCount_Selector, minCardsCount_Selector } from "../packsSelector";
import s from '../Packs.module.css'

type PackSliderPropsType = {
  sliderCallBack: (arr: number[]) => void;
  sliderValuesLocal: number[];
  setSliderValuesLocal: React.Dispatch<React.SetStateAction<number[]>>;
};

export const PacksSlider = ({
                              sliderCallBack,
                              sliderValuesLocal,
                              setSliderValuesLocal,
                            }: PackSliderPropsType) => {

  const minCardsCount = useAppSelector(minCardsCount_Selector);
  const maxCardsCount = useAppSelector(maxCardsCount_Selector);

  useEffect(() => {
    setTimeout(() => {
      setSliderValuesLocal([minCardsCount, maxCardsCount]);
    });
  }, [maxCardsCount]);

  const sliderChangeHandler = (
    event: React.SyntheticEvent | Event,
    value: number | Array<number>
  ) => {
    setSliderValuesLocal(value as number[]);
    sliderCallBack(value as number[]);
  };
  return (
    <>
      <div className={s.sliderNumber}>{sliderValuesLocal[0]}</div>
      <Slider
        min={minCardsCount}
        max={maxCardsCount}
        step={10}
        sx={{ width: "155px" }}
        valueLabelDisplay="auto"
        value={[sliderValuesLocal[0], sliderValuesLocal[1]]}
        onChangeCommitted={sliderChangeHandler}
      />
      <div className={s.sliderNumber}>{sliderValuesLocal[1]}</div>
    </>
  );
};