import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";

type AppState = {
	openFinder: boolean;
	dockHeight: number;
};

const initialState: AppState = {
	dockHeight: 0,
	openFinder: false,
};

const appSlice = createSlice({
	initialState,
	name: "app",
	reducers: {
		closeFinder(state) {
			state.openFinder = false;
		},
		openFinder(state) {
			state.openFinder = true;
		},
		setDockHeight(state, action: PayloadAction<number>) {
			state.dockHeight = action.payload;
		},
	},
});

export const { openFinder, closeFinder, setDockHeight } = appSlice.actions;
export const appReducer = appSlice.reducer;

export const selectIsFinderOpen = (state: RootState) => state.app.openFinder;
export const selectDockHeight = (state: RootState) => state.app.dockHeight;
