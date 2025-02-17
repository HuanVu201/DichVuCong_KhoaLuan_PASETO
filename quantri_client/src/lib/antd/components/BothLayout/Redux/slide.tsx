import createGenericSlice, { ExtendedState } from "@/lib/redux/GenericSlice";
import { IMenuPortal } from "../Models/KenhTin";
import { SearchMenuPortal } from "./action";
import { toast } from "react-toastify";

export interface IMenuPortalState extends ExtendedState<IMenuPortal> {}

const initialState: IMenuPortalState = {
  loading: false,
};

const Slice = createGenericSlice({
  name: "portalmenu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SearchMenuPortal.pending, (state) => {
        state.loading = true;
      })
      .addCase(SearchMenuPortal.fulfilled, (state, action) => {
        state.loading = false;
        state.datas = action.payload.data;
        state.count = action.payload.totalCount;
      })
      .addCase(SearchMenuPortal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetData, resetDatas } = Slice.actions;

export default Slice.reducer;
