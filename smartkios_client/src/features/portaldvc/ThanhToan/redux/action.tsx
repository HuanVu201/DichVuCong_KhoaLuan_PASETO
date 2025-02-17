import { createAsyncThunk } from "@reduxjs/toolkit";
import { yeuCauThanhToanApi } from "../services/YeuCauThanhToanPortalServices";
import {
  IError,
  IOmitUpdate,
  IPaginationResponse,
  IPickSearch,
  IResult,
  ISoftDelete,
} from "@/models";
import { IYeuCauThanhToanPortal } from "../models/YeuCauThanhToanPortal";
import {
  IGiaoDichThanhToan,
  IGiaoDichThanhToanDetailPortal,
} from "../models/GiaoDichThanhToan";
import { giaoDichThanhToanApi } from "../services/GiaoDichThanhToanServices";

export const SearchYeuCauThanhToanPortal = createAsyncThunk<
  IPaginationResponse<IYeuCauThanhToanPortal[]>,
  IPickSearch<IYeuCauThanhToanPortal, "maHoSo">
>("SearchYeuCauThanhToanPortal", async (params, thunkApi) => {
  try {
    const res = await yeuCauThanhToanApi.Search(params);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const InitPayment = createAsyncThunk<
  any,
  Partial<IYeuCauThanhToanPortal>
>("InitPayment", async (params, thunkApi) => {
  try {
    const res = await yeuCauThanhToanApi.InitPayment(params);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const GetGiaoDichThanhToanByMaThamChieu = createAsyncThunk<
  IResult<IGiaoDichThanhToanDetailPortal>,
  string
>("GetGiaoDichThanhToanByMaThamChieu", async (params, thunkApi) => {
  try {
    const res = await giaoDichThanhToanApi.GetByMaThamChieu(params);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
