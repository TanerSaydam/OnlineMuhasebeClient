import { createReducer, on } from "@ngrx/store";
import { changeLoading } from "./loading.actions";

export const initialState: boolean = false;

export const loadingReducer = createReducer(
    initialState,
    on(changeLoading, (state)=> !state)
)