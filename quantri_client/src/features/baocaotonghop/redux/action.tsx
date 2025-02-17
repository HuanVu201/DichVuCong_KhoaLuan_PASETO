import { createAsyncThunk } from "@reduxjs/toolkit";

import { baoCaoTongHopApi } from "../services";
import {
  ISearchBaoCaoThuTuc,
  IBaoCaoDonVi,
  ISearchBaoCaoDonVi,
  IBaoCaoNguoiNopHoSo,
  ISearchBaoCaoTongHopThanhToan,
  IBaoCaoTongHopThanhToan,
  IBaoCaoTongHop07b,
} from "../model";
import { IThongKeQD766Response } from "@/features/thongKe/thongKeQD766/models/ThongKeQD766";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IThongKeHoSoTiepNhanBuuChinh } from "@/features/hoso/models";
import { ThongKeHSLTParams } from "@/features/hoso/services";
import { IPaginationResponse } from "@/models";
import { TongHopHoSoTheoTrangThaiResponse } from "@/features/thongKe/ThongKeTheoDonVi/models/TongHopHoSoTheoTrangThaiResponse";
export interface BaoCaoTongHopResponse {
  data: IBaoCaoDonVi[];
}
export interface BaoCaoTongHop07bResponse {
  data: IBaoCaoTongHop07b[];
}
export interface BaoCaoNguoiNopHoSoResponse {
  data: IBaoCaoNguoiNopHoSo[];
}
export interface TongHopThanhToanResponse {
  data: IBaoCaoTongHopThanhToan[];
}
export interface ThongKeThuTucPhatSinhHoSoResponse {
  data: ThongKeThuTucPhatSinhHoSoResponse[];
}
export interface ThongKeTiepNhanHoSoBuuChinhResponse {
  data: IThongKeHoSoTiepNhanBuuChinh[];
}
export interface ITongHopHoSoTheoTrangThaiResponse {
  data: TongHopHoSoTheoTrangThaiResponse[];
}
export const BaoCaoTongHopThuTucAction = createAsyncThunk<
  BaoCaoTongHopResponse,
  ISearchBaoCaoThuTuc
>("BaoCaoTongHopThuTucAction", async (data, thunkApi) => {
  try {
    const res = await baoCaoTongHopApi.BaoCaoTongHopThuTuc(data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const BaoCaoTongHopThuTucTheoDonViAction = createAsyncThunk<
  BaoCaoTongHopResponse,
  ISearchBaoCaoThuTuc
>("BaoCaoTongHopThuTucTheoDonViAction", async (data, thunkApi) => {
  try {
    const res = await baoCaoTongHopApi.BaoCaoTongHopThuTucTheoDonVi(data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const BaoCaoTongHopLinhVucAction = createAsyncThunk<
  BaoCaoTongHopResponse,
  ISearchBaoCaoThuTuc
>("BaoCaoTongHopLinhVucAction", async (data, thunkApi) => {
  try {
    const res = await baoCaoTongHopApi.BaoCaoTongHopLinhVuc(data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const BaoCaoDonViLinhVucAction = createAsyncThunk<
  BaoCaoTongHopResponse,
  ISearchBaoCaoThuTuc
>("BaoCaoDonViLinhVucAction", async (data, thunkApi) => {
  try {
    const res = await baoCaoTongHopApi.BaoCaoDonViLinhVuc(data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const BaoCaoTongHopDonViAction = createAsyncThunk<
  BaoCaoTongHopResponse,
  ISearchBaoCaoDonVi
>("BaoCaoTongHopDonViAction", async (data, thunkApi) => {
  try {
    const res = await baoCaoTongHopApi.BaoCaoTongHopDonVi(data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const BaoCaoTongHopTheoTruongHopAction = createAsyncThunk<
  BaoCaoTongHopResponse,
  ISearchBaoCaoDonVi
>("BaoCaoTongHopTheoTruongHopAction", async (data, thunkApi) => {
  try {
    const res = await baoCaoTongHopApi.BaoCaoTongHopTheoTruongHop(data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const ThongKeTiepNhanHoSoBuuChinhAction = createAsyncThunk<
  IPaginationResponse<IThongKeHoSoTiepNhanBuuChinh[]>,
  ThongKeHSLTParams
>("ThongKeTiepNhanHoSoBuuChinhAction", async (data, thunkApi) => {
  try {
    const res = await baoCaoTongHopApi.ThongKeTiepNhanHoSoBuuChinh(data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const BaoCaoHoSoNopTuCongDVCAction = createAsyncThunk<
  BaoCaoTongHopResponse,
  ISearchBaoCaoDonVi
>("BaoCaoHoSoNopTuCongDVCAction", async (data, thunkApi) => {
  try {
    const res = await baoCaoTongHopApi.BaoCaoHoSoNopTuCongDVC(data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const BaoCaoTongHop06aAction = createAsyncThunk<
  BaoCaoTongHopResponse,
  ISearchBaoCaoThuTuc
>("BaoCaoTongHop06aAction", async (data, thunkApi) => {
  try {
    const res = await baoCaoTongHopApi.BaoCaoTongHop06a(data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const BaoCaoTongHop07bAction = createAsyncThunk<
  BaoCaoTongHop07bResponse,
  ISearchBaoCaoThuTuc
>("BaoCaoTongHop07bAction", async (data, thunkApi) => {
  try {
    const res = await baoCaoTongHopApi.BaoCaoTongHop07b(data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const BaoCaoTongHop06aCacCapAction = createAsyncThunk<
  BaoCaoTongHopResponse,
  ISearchBaoCaoThuTuc
>("BaoCaoTongHop06aCacCapAction", async (data, thunkApi) => {
  try {
    const res = await baoCaoTongHopApi.BaoCaoTongHop06aCacCap(data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const BaoCaoTongHop07aAction = createAsyncThunk<
  BaoCaoTongHopResponse,
  ISearchBaoCaoThuTuc
>("BaoCaoTongHop07aAction", async (data, thunkApi) => {
  try {
    const res = await baoCaoTongHopApi.BaoCaoTongHop07a(data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const BaoCaoTongHopTraCuuCSDLDanCuAction = createAsyncThunk<
  BaoCaoTongHopResponse,
  ISearchBaoCaoThuTuc
>("BaoCaoTongHopTraCuuCSDLDanCuAction", async (data, thunkApi) => {
  try {
    const res = await baoCaoTongHopApi.BaoCaoTongHopTraCuuCSDLDanCu(data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const BaoCaoNguoiNopHoSoAction = createAsyncThunk<
  BaoCaoNguoiNopHoSoResponse,
  ISearchBaoCaoThuTuc
>("BaoCaoNguoiNopHoSoAction", async (data, thunkApi) => {
  try {
    const res = await baoCaoTongHopApi.BaoCaoNguoiNopHoSo(data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const TongHopThanhToanTheoDonViAction = createAsyncThunk<
  TongHopThanhToanResponse,
  ISearchBaoCaoTongHopThanhToan
>("TongHopThanhToanTheoDonViAction", async (data, thunkApi) => {
  try {
    const res = await baoCaoTongHopApi.TongHopThanhToanTheoDonVi(data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const ThongKeThuTucPhatSinhHoSoAction = createAsyncThunk<
  ThongKeThuTucPhatSinhHoSoResponse,
  ISearchBaoCaoThuTuc
>("ThongKeThuTucPhatSinhHoSoAction", async (data, thunkApi) => {
  try {
    const res = await baoCaoTongHopApi.ThongKeThuTucPhatSinhHoSo(data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const BaoCaoTheoTrangThaiHoSoAction = createAsyncThunk<
  ITongHopHoSoTheoTrangThaiResponse,
  ISearchBaoCaoDonVi
>("BaoCaoTheoTrangThaiHoSoAction", async (data, thunkApi) => {
  try {
    const res = await baoCaoTongHopApi.BaoCaoTheoTrangThaiHoSo(data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

