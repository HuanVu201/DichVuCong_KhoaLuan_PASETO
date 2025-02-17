import { createAsyncThunk } from "@reduxjs/toolkit";
import { tiepNhanHoSoTrucTuyenApi } from "../services/TiepNhanHoSoTrucTuyenServices";
import { ITiepNhanHoSoTrucTuyenResponse } from "../models/TiepNhanHoSoTrucTuyen";
import {
  IThongKeHoSoTrucTuyenCapTinhParams,
  IThongKeHoSoTrucTuyenCacSoBanNganhParams,
  IThongKeHoSoTrucTuyenCapHuyenParams,
  IThongKeHoSoTrucTuyenCapXaParams,
  IThongKeHoSoTrucTuyenTheoThuTucParams,
} from "../models/TiepNhanHoSoTrucTuyenSearch";
import { ISearchThongKeParams } from "../../thongKeQD766/models/ThongKeQD766Search";
import { IThongKeHoSoQuaHanResponse } from "../models/ThongKeHoSoQuaHanResponse";

export const SearchTkHoSoTrucTuyenCapTinh = createAsyncThunk<
  ITiepNhanHoSoTrucTuyenResponse,
  IThongKeHoSoTrucTuyenCapTinhParams
>("SearchTkHoSoTrucTuyenCapTinh", async (data, thunkApi) => {
  try {
    const res = await tiepNhanHoSoTrucTuyenApi.ThongKeCapTinh(data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const SearchTkHoSoTrucTuyenTheoThuTuc = createAsyncThunk<
  ITiepNhanHoSoTrucTuyenResponse,
  IThongKeHoSoTrucTuyenTheoThuTucParams
>("SearchTkHoSoTrucTuyenTheoThuTuc", async (data, thunkApi) => {
  try {
    const res = await tiepNhanHoSoTrucTuyenApi.ThongKeTheoThuTuc(data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const SearchTkHoSoTrucTuyenTheoMucDo34 = createAsyncThunk<
  ITiepNhanHoSoTrucTuyenResponse,
  IThongKeHoSoTrucTuyenTheoThuTucParams
>("SearchTkHoSoTrucTuyenTheoMucDo34", async (data, thunkApi) => {
  try {
    const res = await tiepNhanHoSoTrucTuyenApi.ThongKeTheoMucDo34(data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const SearchTkHoSoTrucTuyenCacSoBanNganh = createAsyncThunk<
  ITiepNhanHoSoTrucTuyenResponse,
  IThongKeHoSoTrucTuyenCacSoBanNganhParams
>("SearchTkHoSoTrucTuyenCacSoBanNganh", async (data, thunkApi) => {
  try {
    const res = await tiepNhanHoSoTrucTuyenApi.ThongKeCacSoBanNganh(data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const SearchTkHoSoTrucTuyenCapHuyen = createAsyncThunk<
  ITiepNhanHoSoTrucTuyenResponse,
  IThongKeHoSoTrucTuyenCapHuyenParams
>("SearchTkHoSoTrucTuyenCapHuyen", async (data, thunkApi) => {
  try {
    const res = await tiepNhanHoSoTrucTuyenApi.ThongKeCapHuyen(data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const SearchTkHoSoTrucTuyenCapXa = createAsyncThunk<
  ITiepNhanHoSoTrucTuyenResponse,
  IThongKeHoSoTrucTuyenCapXaParams
>("SearchTkHoSoTrucTuyenCapXa", async (data, thunkApi) => {
  try {
    const res = await tiepNhanHoSoTrucTuyenApi.ThongKeCapXa(data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const ThongKeHoSoQuaHan = createAsyncThunk<
  IThongKeHoSoQuaHanResponse,
  ISearchThongKeParams
>("ThongKeHoSoQuaHan", async (data, thunkApi) => {
  try {
    const res = await tiepNhanHoSoTrucTuyenApi.ThongKeHoSoQuaHan(data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const ThongKeSoTheoDoiHoSo = createAsyncThunk<
  IThongKeHoSoQuaHanResponse,
  ISearchThongKeParams
>("ThongKeThongKeSoTheoDoiHoSo", async (data, thunkApi) => {
  try {
    const res = await tiepNhanHoSoTrucTuyenApi.ThongKeHoSoQuaHan(data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
