import { useDispatch } from "react-redux";
import type { AppDispatch } from "../state/store";

type DispatchFn = () => AppDispatch;

export const useAppDispatch: DispatchFn = useDispatch;
