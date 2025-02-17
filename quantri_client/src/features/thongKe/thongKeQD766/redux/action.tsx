import { createAsyncThunk } from "@reduxjs/toolkit";
import { thongKeQD766Api } from "../services/ThongKeQD766Service";
import { IThongKeQD766Response } from "../models/ThongKeQD766";
import {
  ITheoDoiChiTieuDVCTrucTuyenParams,
  ITienDoGiaiQuyetParams,
  IThanhToanTrucTuyenParams,
  ISearchThongKeParams,
} from "../models/ThongKeQD766Search";
import {
  IThongKeChiTieuDVCResponse,
  IThongKeChiTieuSoHoaResponse,
  IThongKeQD766DonDocTTTTResponse,
  IThongKeTTTTResponse,
  IThongKeTienDoGiaiQuyetResponse,
} from "../models/ThongKe766Response";
import {
  ISearchThongKe766TTHCParams,
  IThongKe766TTHCResponse,
} from "../models/ThongKe766TTHCModels";

export const SearchTienDoGiaiQuyet = createAsyncThunk<
  IThongKeQD766Response,
  ITienDoGiaiQuyetParams
>("SearcTienDoGiaiQuyet", async (data, thunkApi) => {
  try {
    const res = await thongKeQD766Api.TienDoGiaiQuyet(data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const SearchTheoDoiChiTieuDVCTrucTuyen = createAsyncThunk<
  IThongKeQD766Response,
  ITheoDoiChiTieuDVCTrucTuyenParams
>("SearchTheoDoiChiTieuDVCTrucTuyen", async (data, thunkApi) => {
  try {
    const res = await thongKeQD766Api.TheoDoiChiTieuDVCTrucTuyen(data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const SearchThanhToanTrucTuyen = createAsyncThunk<
  IThongKeQD766Response,
  IThanhToanTrucTuyenParams
>("SearchThanhToanTrucTuyen", async (data, thunkApi) => {
  try {
    const res = await thongKeQD766Api.ThanhToanTrucTuyen(data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const SearchThanhToanTrucTuyenNew = createAsyncThunk<
  IThongKeTTTTResponse,
  ISearchThongKeParams
>("SearchThanhToanTrucTuyenNew", async (data, thunkApi) => {
  try {
    const res = await thongKeQD766Api.ThanhToanTrucTuyenNew(data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const SearchDonDocThanhToanTrucTuyen = createAsyncThunk<
  IThongKeQD766DonDocTTTTResponse,
  ISearchThongKeParams
>("SearchDonDocThanhToanTrucTuyen", async (data, thunkApi) => {
  try {
    const res = await thongKeQD766Api.SearchDonDocThanhToanTrucTuyen(data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const SearchTienDoGiaiQuyetNew = createAsyncThunk<
  IThongKeTienDoGiaiQuyetResponse,
  ISearchThongKeParams
>("SearchTienDoGiaiQuyetNew", async (data, thunkApi) => {
  try {
    const res = await thongKeQD766Api.TienDoGiaiQuyetNew(data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const SearchChiTieuDVCTrucTuyenNew = createAsyncThunk<
  IThongKeChiTieuDVCResponse,
  ISearchThongKeParams
>("SearchChiTieuDVCTrucTuyetNew", async (data, thunkApi) => {
  try {
    const res = await thongKeQD766Api.ChiTieuDVCTrucTuyenNew(data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const SearchChiTieuSoHoaNew = createAsyncThunk<
  IThongKeChiTieuSoHoaResponse,
  ISearchThongKeParams
>("SearchChiTieuSoHoaNew", async (data, thunkApi) => {
  try {
    const res = await thongKeQD766Api.ChiTieuSoHoaNew(data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const TongHopTTHC = createAsyncThunk<
  IThongKe766TTHCResponse,
  ISearchThongKe766TTHCParams
>("TongHopTTHC", async (data, thunkApi) => {
  try {
    const res = await thongKeQD766Api.TongHopTTHC(data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
