import { configureStore } from "@reduxjs/toolkit";
import { currentCategoryReducer } from "./currentCategory";
import { reducer as ormReducer } from "../orm";

const store = configureStore({
	reducer: {
		orm: ormReducer,
		currentCategory: currentCategoryReducer,
	}
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
