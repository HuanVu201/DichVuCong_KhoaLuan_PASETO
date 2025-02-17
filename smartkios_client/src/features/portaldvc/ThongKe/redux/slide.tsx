import createGenericSlice from "@/lib/redux/GenericSlice";
import { toast } from "react-toastify";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { IThongKeChiTieuDVCElement, IThongKeChiTieuSoHoaElement, IThongKeTTTTElement, IThongKeTienDoGiaiQuyetElement } from "../models/ThongKe766Response";
import { SearchChiTieuDVCTrucTuyenPortal, SearchChiTieuSoHoaPortal, SearchThanhToanTrucTuyenPortal, SearchTienDoGiaiQuyetPortal } from "./action";
interface IThongKeQD766State {
  loading: boolean;
  ThanhToanTrucTuyens?: IThongKeTTTTElement[];
  TienDoGiaiQuyets?: IThongKeTienDoGiaiQuyetElement[];
  ChiTieuDVCTrucTuyens?: IThongKeChiTieuDVCElement[];
  ChiTieuSoHoas?: IThongKeChiTieuSoHoaElement[];
}
const initialState: IThongKeQD766State = {
  loading: false,
};

const Slice = createGenericSlice({
  name: "ThongKePortal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SearchThanhToanTrucTuyenPortal.pending, (state) => {
        state.loading = true;
      })
      .addCase(SearchThanhToanTrucTuyenPortal.fulfilled, (state, data) => {
        state.loading = false;
        state.ThanhToanTrucTuyens = data.payload.data;
      })
      .addCase(SearchTienDoGiaiQuyetPortal.pending, (state) => {
        state.loading = true;
      })
      .addCase(SearchTienDoGiaiQuyetPortal.fulfilled, (state, data) => {
        state.loading = false;
        state.TienDoGiaiQuyets = data.payload.data;
      })
      .addCase(SearchChiTieuDVCTrucTuyenPortal.pending, (state) => {
        state.loading = true;
      })
      .addCase(SearchChiTieuDVCTrucTuyenPortal.fulfilled, (state, data) => {
        state.loading = false;
        state.ChiTieuDVCTrucTuyens = data.payload.data;
      })
      .addCase(SearchChiTieuSoHoaPortal.pending, (state) => {
        state.loading = true;
      })
      .addCase(SearchChiTieuSoHoaPortal.fulfilled, (state, data) => {
        state.loading = false;
        state.ChiTieuSoHoas = data.payload.data;
      })
      .addMatcher(
        isRejectedWithValue(
          SearchThanhToanTrucTuyenPortal,
          SearchTienDoGiaiQuyetPortal,
          SearchChiTieuDVCTrucTuyenPortal,
          SearchChiTieuSoHoaPortal,
        ),
        (state) => {
          toast.error("");
          state.loading = false;
        }
      );
  },
});
export const { resetData, resetDatas } = Slice.actions;
export default Slice.reducer;
