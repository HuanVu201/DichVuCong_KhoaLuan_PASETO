import createGenericSlice from "@/lib/redux/GenericSlice";
import { ITiepNhanHoSoTrucTuyenElm } from "../models/TiepNhanHoSoTrucTuyen";
import {
  SearchTkHoSoTrucTuyenCapTinh,
  SearchTkHoSoTrucTuyenCacSoBanNganh,
  SearchTkHoSoTrucTuyenCapHuyen,
  SearchTkHoSoTrucTuyenCapXa,
  ThongKeHoSoQuaHan,
  ThongKeSoTheoDoiHoSo,
  SearchTkHoSoTrucTuyenTheoThuTuc,
  SearchTkHoSoTrucTuyenTheoMucDo34,
} from "./action";
import { toast } from "react-toastify";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { IThongKeHoSoQuaHanResponse } from "../models/ThongKeHoSoQuaHanResponse";
interface ITiepNhanHoSoTrucTuyenState {
  datas?: ITiepNhanHoSoTrucTuyenElm[];
  loading: boolean;
  TkHoSoQuaHans?: IThongKeHoSoQuaHanResponse;
}
const initialState: ITiepNhanHoSoTrucTuyenState = {
  loading: false,
};
const Slice = createGenericSlice({
  name: "ThongKeTiepNhanHoSoTrucTuyen",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SearchTkHoSoTrucTuyenCapTinh.pending, (state) => {
        state.loading = true;
      })
      .addCase(SearchTkHoSoTrucTuyenCapTinh.fulfilled, (state, data) => {
        state.loading = false;
        state.datas = data.payload.data;
      })

      .addCase(SearchTkHoSoTrucTuyenCacSoBanNganh.pending, (state) => {
        state.loading = true;
      })
      .addCase(SearchTkHoSoTrucTuyenCacSoBanNganh.fulfilled, (state, data) => {
        state.loading = false;
        state.datas = data.payload.data;
      })

      .addCase(SearchTkHoSoTrucTuyenCapHuyen.pending, (state) => {
        state.loading = true;
      })
      .addCase(SearchTkHoSoTrucTuyenCapHuyen.fulfilled, (state, data) => {
        state.loading = false;
        state.datas = data.payload.data;
      })
      .addCase(SearchTkHoSoTrucTuyenTheoThuTuc.pending, (state) => {
        state.loading = true;
      })
      .addCase(SearchTkHoSoTrucTuyenTheoThuTuc.fulfilled, (state, data) => {
        state.loading = false;
        state.datas = data.payload.data;
      })
      .addCase(SearchTkHoSoTrucTuyenTheoMucDo34.pending, (state) => {
        state.loading = true;
      })
      .addCase(SearchTkHoSoTrucTuyenTheoMucDo34.fulfilled, (state, data) => {
        state.loading = false;
        state.datas = data.payload.data;
      })
      
      .addCase(SearchTkHoSoTrucTuyenCapXa.pending, (state) => {
        state.loading = true;
      })
      .addCase(SearchTkHoSoTrucTuyenCapXa.fulfilled, (state, data) => {
        state.loading = false;
        state.datas = data.payload.data;
      })
      .addCase(ThongKeHoSoQuaHan.pending, (state) => {
        state.loading = true;
        state.TkHoSoQuaHans = undefined;
      })
      .addCase(ThongKeHoSoQuaHan.fulfilled, (state, data) => {
        state.loading = false;
        state.TkHoSoQuaHans = data.payload;
      })
      .addCase(ThongKeSoTheoDoiHoSo.fulfilled, (state, data) => {
        state.loading = false;
        state.TkHoSoQuaHans = data.payload;
      })
      .addMatcher(
        isRejectedWithValue(
          SearchTkHoSoTrucTuyenCapTinh,
          SearchTkHoSoTrucTuyenCacSoBanNganh,
          SearchTkHoSoTrucTuyenCapHuyen,
          SearchTkHoSoTrucTuyenTheoThuTuc,
          SearchTkHoSoTrucTuyenCapXa,
          SearchTkHoSoTrucTuyenTheoMucDo34,
          ThongKeHoSoQuaHan,
          ThongKeSoTheoDoiHoSo
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
