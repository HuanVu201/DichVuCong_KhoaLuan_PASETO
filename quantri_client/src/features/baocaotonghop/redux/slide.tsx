import createGenericSlice from "@/lib/redux/GenericSlice";

import { toast } from "react-toastify";
import { isPending, isRejectedWithValue } from "@reduxjs/toolkit";
import {
  IBaoCaoDonVi,
  IBaoCaoNguoiNopHoSo,
  IBaoCaoTongHop07b,
  IBaoCaoTongHopThanhToan,
  IThongKeThuTucPhatSinhHoSos,
} from "../model";
import {
  BaoCaoHoSoNopTuCongDVCAction,
  BaoCaoNguoiNopHoSoAction,
  BaoCaoTheoTrangThaiHoSoAction,
  BaoCaoTongHop06aAction,
  BaoCaoTongHop06aCacCapAction,
  BaoCaoTongHop07aAction,
  BaoCaoTongHop07bAction,
  BaoCaoTongHopDonViAction,
  BaoCaoTongHopLinhVucAction,
  BaoCaoTongHopTheoTruongHopAction,
  BaoCaoTongHopThuTucAction,
  BaoCaoTongHopThuTucTheoDonViAction,
  BaoCaoTongHopTraCuuCSDLDanCuAction,
  ThongKeThuTucPhatSinhHoSoAction,
  ThongKeTiepNhanHoSoBuuChinhAction,
  TongHopThanhToanTheoDonViAction,
} from "./action";
import { IThongKeHoSoTiepNhanBuuChinh } from "@/features/hoso/models";
import { TongHopHoSoTheoTrangThaiResponse } from "@/features/thongKe/ThongKeTheoDonVi/models/TongHopHoSoTheoTrangThaiResponse";
interface IThongKeQD766State {
  datas?: IBaoCaoDonVi[];
  loading: boolean;
  nguoiNopHoSos?: IBaoCaoNguoiNopHoSo[];
  tongHopThanhToans?: IBaoCaoTongHopThanhToan[];
  thuTucPhatSinhHoSos?: IThongKeThuTucPhatSinhHoSos[];
  thongKeTiepNhanHoSoBuuChinhs?: IThongKeHoSoTiepNhanBuuChinh[];
  baoCao07b?: IBaoCaoTongHop07b[];
  tongHopTheoTrangThai?: TongHopHoSoTheoTrangThaiResponse[]
}
const initialState: IThongKeQD766State = {
  loading: false,
  thongKeTiepNhanHoSoBuuChinhs: []
};

const Slice = createGenericSlice({
  name: "BaoCaoTongHop",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(BaoCaoTongHopThuTucAction.fulfilled, (state, data) => {
        state.loading = false;
        state.datas = data.payload.data;
      })
      .addCase(BaoCaoTongHopThuTucTheoDonViAction.fulfilled, (state, data) => {
        state.loading = false;
        state.datas = data.payload.data;
      })
      .addCase(BaoCaoTongHopLinhVucAction.fulfilled, (state, data) => {
        state.loading = false;
        state.datas = data.payload.data;
      })
      .addCase(BaoCaoTongHopDonViAction.fulfilled, (state, data) => {
        state.loading = false;
        state.datas = data.payload.data;
      })
      .addCase(BaoCaoTongHopTheoTruongHopAction.fulfilled, (state, data) => {
        state.loading = false;
        state.datas = data.payload.data;
      })
      .addCase(ThongKeTiepNhanHoSoBuuChinhAction.fulfilled, (state, data) => {
        console.log(data.payload.totalCount);

        state.loading = false;
        state.thongKeTiepNhanHoSoBuuChinhs = data.payload.data;
        state.count = data.payload.totalCount
      })
      .addCase(BaoCaoHoSoNopTuCongDVCAction.fulfilled, (state, data) => {
        state.loading = false;
        state.datas = data.payload.data;
      })
      .addCase(BaoCaoTongHop06aAction.fulfilled, (state, data) => {
        state.loading = false;
        state.datas = data.payload.data;
      })
      .addCase(BaoCaoTongHop06aCacCapAction.fulfilled, (state, data) => {
        state.loading = false;
        state.datas = data.payload.data;
      })
      .addCase(BaoCaoTongHop07bAction.fulfilled, (state, data) => {
        state.loading = false;
        state.baoCao07b = data.payload.data;
      })
      .addCase(BaoCaoTongHop07aAction.fulfilled, (state, data) => {
        state.loading = false;
        state.datas = data.payload.data;
      })
      .addCase(BaoCaoTongHopTraCuuCSDLDanCuAction.fulfilled, (state, data) => {
        state.loading = false;
        state.datas = data.payload.data;
      })
      .addCase(BaoCaoNguoiNopHoSoAction.fulfilled, (state, data) => {
        state.loading = false;
        state.nguoiNopHoSos = data.payload.data;
      })
      .addCase(TongHopThanhToanTheoDonViAction.fulfilled, (state, data) => {
        state.loading = false;
        state.tongHopThanhToans = data.payload.data;
      })
      .addCase(ThongKeThuTucPhatSinhHoSoAction.fulfilled, (state, data) => {
        state.loading = false;
        // state.thuTucPhatSinhHoSos = data.payload.data;
      })
      .addCase(BaoCaoTheoTrangThaiHoSoAction.fulfilled, (state, data) => {
        state.loading = false;
        state.tongHopTheoTrangThai = data.payload.data;
      })
      .addMatcher(
        isPending(
          BaoCaoTongHopThuTucAction,
          BaoCaoTongHopLinhVucAction,
          BaoCaoTongHopDonViAction,
          BaoCaoTongHopTheoTruongHopAction,
          BaoCaoTongHop06aAction,
          BaoCaoTongHop06aCacCapAction,
          BaoCaoTongHop07aAction,
          BaoCaoTongHopTraCuuCSDLDanCuAction,
          BaoCaoNguoiNopHoSoAction,
          TongHopThanhToanTheoDonViAction,
          ThongKeTiepNhanHoSoBuuChinhAction,
          ThongKeThuTucPhatSinhHoSoAction,
          BaoCaoHoSoNopTuCongDVCAction,
          BaoCaoTongHop07bAction,
          BaoCaoTongHopThuTucTheoDonViAction,
          BaoCaoTheoTrangThaiHoSoAction
        ),
        (state, action: any) => {
          state.loading = true;
        }
      )
      .addMatcher(
        isRejectedWithValue(
          BaoCaoTongHopThuTucAction,
          BaoCaoTongHopLinhVucAction,
          BaoCaoTongHopDonViAction,
          BaoCaoTongHopTheoTruongHopAction,
          BaoCaoTongHop06aAction,
          BaoCaoTongHop06aCacCapAction,
          BaoCaoTongHop07aAction,
          ThongKeTiepNhanHoSoBuuChinhAction,
          BaoCaoTongHopTraCuuCSDLDanCuAction,
          BaoCaoNguoiNopHoSoAction,
          TongHopThanhToanTheoDonViAction,
          ThongKeThuTucPhatSinhHoSoAction,
          BaoCaoHoSoNopTuCongDVCAction,
          BaoCaoTongHop07bAction,
          BaoCaoTongHopThuTucTheoDonViAction,
          BaoCaoTheoTrangThaiHoSoAction
        ),
        (state, action: any) => {
          state.loading = false;
          toast.error(action?.payload?.message);
        }
      );
  },
});
export const { resetData, resetDatas } = Slice.actions;
export default Slice.reducer;
