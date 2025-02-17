import createGenericSlice from "@/lib/redux/GenericSlice";
import { ITiepNhanHoSoTrucTuyenElm } from "../models/TiepNhanHoSoTrucTuyen";
import {
  SearchTkHoSoTrucTuyenCapTinh,
  SearchTkHoSoTrucTuyenCacSoBanNganh,
  SearchTkHoSoTrucTuyenCapHuyen,
  SearchTkHoSoTrucTuyenCapXa,
  ThongKeHoSoQuaHan,
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

      .addCase(SearchTkHoSoTrucTuyenCapXa.pending, (state) => {
        state.loading = true;
      })
      .addCase(SearchTkHoSoTrucTuyenCapXa.fulfilled, (state, data) => {
        state.loading = false;
        state.datas = data.payload.data;
      })
      .addCase(ThongKeHoSoQuaHan.pending, (state) => {
        state.loading = true;
      })
      .addCase(ThongKeHoSoQuaHan.fulfilled, (state, data) => {
        state.loading = false;
        state.TkHoSoQuaHans = data.payload;
      })
      .addMatcher(
        isRejectedWithValue(
          SearchTkHoSoTrucTuyenCapTinh,
          SearchTkHoSoTrucTuyenCacSoBanNganh,
          SearchTkHoSoTrucTuyenCapHuyen,
          SearchTkHoSoTrucTuyenCapXa,
          ThongKeHoSoQuaHan
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
