import { configureStore } from "@reduxjs/toolkit";
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	persistReducer,
	persistStore,
	REGISTER,
	REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/es/storage";
import { appReducer } from "./slices/app-slice";

// 💾 Kept across sessions in localStorage
const persistedAppReducer = persistReducer(
	{ key: "app", storage, whitelist: ["brightness", "soundLevel"] },
	appReducer,
);

export const store = configureStore({
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			// redux-persist's actions carry functions, which is expected
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
	reducer: {
		app: persistedAppReducer,
	},
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
