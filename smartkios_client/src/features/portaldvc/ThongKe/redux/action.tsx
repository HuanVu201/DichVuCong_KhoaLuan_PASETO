import { createAsyncThunk } from "@reduxjs/toolkit";
import { thongKePortalApi } from "../services/ThongKeService";
import { ISearchThongKeParams, IThongKeChiTieuDVCResponse, IThongKeChiTieuSoHoaResponse, IThongKeTTTTResponse, IThongKeTienDoGiaiQuyetResponse } from "../models/ThongKe766Response";


export const SearchThanhToanTrucTuyenPortal = createAsyncThunk<
    IThongKeTTTTResponse,
    ISearchThongKeParams
>("SearchThanhToanTrucTuyenPortal", async (data, thunkApi) => {
    try {
        const res = await thongKePortalApi.ThanhToanTrucTuyenPortal(data);
        return res.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});


export const SearchTienDoGiaiQuyetPortal = createAsyncThunk<
    IThongKeTienDoGiaiQuyetResponse,
    ISearchThongKeParams
>("SearchTienDoGiaiQuyetPortal", async (data, thunkApi) => {
    try {
        const res = await thongKePortalApi.TienDoGiaiQuyetPortal(data);
        return res.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});


export const SearchChiTieuDVCTrucTuyenPortal = createAsyncThunk<
    IThongKeChiTieuDVCResponse,
    ISearchThongKeParams
>("SearchChiTieuDVCTrucTuyetPortal", async (data, thunkApi) => {
    try {
        const res = await thongKePortalApi.ChiTieuDVCTrucTuyenPortal(data);
        return res.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});


export const SearchChiTieuSoHoaPortal = createAsyncThunk<
    IThongKeChiTieuSoHoaResponse,
    ISearchThongKeParams
>("SearchChiTieuSoHoaPortal", async (data, thunkApi) => {
    try {
        const res = await thongKePortalApi.ChiTieuSoHoaPortal(data);
        return res.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});
