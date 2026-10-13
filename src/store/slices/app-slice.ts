import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";

type AppState = {
  openFinder: boolean;
  isPowerMode: boolean;
  dockHeight: number;
  brightness: number;
  soundLevel: number;
};

const initialState: AppState = {
  dockHeight: 0,
  isPowerMode: false,
  openFinder: false,
  brightness: 1,
  soundLevel: 1,
};

const appSlice = createSlice({
  initialState,
  name: "app",
  reducers: {
    // 🔍
    closeFinder(state) {
      state.openFinder = false;
    },
    openFinder(state) {
      state.openFinder = true;
    },
    // 🟧🟡
    setDockHeight(state, action: PayloadAction<number>) {
      state.dockHeight = action.payload;
    },
    // 🔋
    togglePowerMode(state) {
      state.isPowerMode = !state.isPowerMode;
    },
    // 🔊
    setSoundLevel(state, action: PayloadAction<number>) {
      state.soundLevel = action.payload;
    },
    // 🔆
    setBrightness(state, action: PayloadAction<number>) {
      state.brightness = action.payload;
    },
  },
});

export const {
  openFinder,
  closeFinder,
  setDockHeight,
  togglePowerMode,
  setSoundLevel,
  setBrightness,
} = appSlice.actions;
export const appReducer = appSlice.reducer;

// 🔍
export const selectIsFinderOpen = (state: RootState) => state.app.openFinder;
// 🟧🟡
export const selectDockHeight = (state: RootState) => state.app.dockHeight;
// 🔋
export const selectIsPowerMode = (state: RootState) => state.app.isPowerMode;
// 🔆
export const selectBrightness = (state: RootState) => state.app.brightness;
// 🔊
export const selectSoundLevel = (state: RootState) => state.app.soundLevel;
