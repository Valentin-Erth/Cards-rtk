import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../app/store';
import { ActionCreator, ActionCreatorsMapObject, AsyncThunk, bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useEffect, useState } from 'react'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// export function useDebounce<T>(value: T, delay?: number): T {
//   const [debouncedValue, setDebouncedValue] = useState<T>(value)
//
//   useEffect(() => {
//     const timer = setTimeout(() => setDebouncedValue(value), delay || 500)
//
//     return () => {
//       clearTimeout(timer)
//     }
//   }, [value, delay])
//
//   return debouncedValue
// }