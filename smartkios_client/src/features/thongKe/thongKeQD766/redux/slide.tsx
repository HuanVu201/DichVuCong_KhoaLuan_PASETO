import createGenericSlice from "@/lib/redux/GenericSlice";
import { IThongKeQD766 } from "../models/ThongKeQD766";
import {
  SearchTienDoGiaiQuyet,
  SearchTheoDoiChiTieuDVCTrucTuyen,
  SearchThanhToanTrucTuyen,
  SearchThanhToanTrucTuyenNew,
  SearchTienDoGiaiQuyetNew,
  SearchChiTieuDVCTrucTuyenNew,
  SearchChiTieuSoHoaNew
} from "./action";
import { toast } from "react-toastify";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { IThongKeChiTieuDVCElement, IThongKeChiTieuSoHoaElement, IThongKeTTTTElement, IThongKeTienDoGiaiQuyetElement } from "../models/ThongKe766Response";
interface IThongKeQD766State {
  datas?: IThongKeQD766[];
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
  name: "ThongKeQD766",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SearchTienDoGiaiQuyet.pending, (state) => {
        state.loading = true;
      })
      .addCase(SearchTienDoGiaiQuyet.fulfilled, (state, data) => {
        state.loading = false;
        state.datas = data.payload.data;
      })

      .addCase(SearchTheoDoiChiTieuDVCTrucTuyen.pending, (state) => {
        state.loading = true;
      })
      .addCase(SearchTheoDoiChiTieuDVCTrucTuyen.fulfilled, (state, data) => {
        state.loading = false;
        state.datas = data.payload.data;
      })

      .addCase(SearchThanhToanTrucTuyen.pending, (state) => {
        state.loading = true;
      })
      .addCase(SearchThanhToanTrucTuyen.fulfilled, (state, data) => {
        state.loading = false;
        state.datas = data.payload.data;
      })
      .addCase(SearchThanhToanTrucTuyenNew.pending, (state) => {
        state.loading = true;
      })
      .addCase(SearchThanhToanTrucTuyenNew.fulfilled, (state, data) => {
        state.loading = false;
        state.ThanhToanTrucTuyens = data.payload.data;
      })
      .addCase(SearchTienDoGiaiQuyetNew.pending, (state) => {
        state.loading = true;
      })
      .addCase(SearchTienDoGiaiQuyetNew.fulfilled, (state, data) => {
        state.loading = false;
        state.TienDoGiaiQuyets = data.payload.data;
      })
      .addCase(SearchChiTieuDVCTrucTuyenNew.pending, (state) => {
        state.loading = true;
      })
      .addCase(SearchChiTieuDVCTrucTuyenNew.fulfilled, (state, data) => {
        state.loading = false;
        state.ChiTieuDVCTrucTuyens = data.payload.data;
      })
      .addCase(SearchChiTieuSoHoaNew.pending, (state) => {
        state.loading = true;
      })
      .addCase(SearchChiTieuSoHoaNew.fulfilled, (state, data) => {
        state.loading = false;
        state.ChiTieuSoHoas = data.payload.data;
      })
      .addMatcher(
        isRejectedWithValue(
          SearchTienDoGiaiQuyet,
          SearchTheoDoiChiTieuDVCTrucTuyen,
          SearchThanhToanTrucTuyen,
          SearchThanhToanTrucTuyenNew,
          SearchTienDoGiaiQuyetNew,
          SearchChiTieuDVCTrucTuyenNew,
          SearchChiTieuSoHoaNew,
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
