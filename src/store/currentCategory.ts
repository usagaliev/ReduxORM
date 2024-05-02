import { createSlice } from "@reduxjs/toolkit";

export const currentCategorySlice = createSlice({
	name: "currentCategory",
	initialState: 1,
	reducers: {
		clear: ():any => null
	}
});

export const currentCategoryReducer = currentCategorySlice.reducer;
