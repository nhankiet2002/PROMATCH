import { client, Endpoint } from "@api/index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  dishes: [],
  loading: false,
};

export const requestGetCategories = createAsyncThunk(
  "dish/getCategories",
  async (storeId) => {
    const res = await client.get(`${Endpoint.CATEGORIES}/store/${storeId}`);
    return res;
  }
);

export const dishSlice = createSlice({
  name: "dish",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestGetCategories.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(requestGetCategories.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.length > 0) {
          state.categories = action.payload;
        }
      })
      .addCase(requestGetCategories.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export const dishState = (state) => state.dish;

export const {} = dishSlice.actions;
export default dishSlice.reducer;
