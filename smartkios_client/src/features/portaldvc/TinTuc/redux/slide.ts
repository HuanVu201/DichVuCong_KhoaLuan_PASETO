import createGenericSlice, { ExtendedState } from "@/lib/redux/GenericSlice";
import { SearchTinBaiPortal } from "./action";
import { toast } from "react-toastify";
import { ITinBaiPortal } from "../models/TinBai";

export interface ITinBaiPortalState extends ExtendedState<ITinBaiPortal> {}

const initialState: ITinBaiPortalState = {
  loading: false,
};

const Slice = createGenericSlice({
  name: "portaltinbai",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SearchTinBaiPortal.pending, (state) => {
        state.loading = true;
      })
      .addCase(SearchTinBaiPortal.fulfilled, (state, action) => {
        state.loading = false;
        state.datas = action.payload.data;
        state.count = action.payload.totalCount;
        state.totalPages= action.payload.totalPages,
        state.currentPages = action.payload.currentPage
      })
      .addCase(SearchTinBaiPortal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetData, resetDatas } = Slice.actions;

export default Slice.reducer;
