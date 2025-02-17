
import { IResult } from "@/models";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { DatLaiNgayHenTraParams, DatLaiQuyTrinhXuLyParams, adminHoSoApi,AdminUpdateHoSoParams } from "../services";
import { AxiosError } from "axios";
import { IHoSo } from "@/features/hoso/models";
import { IAdminHoSo } from "../models/AdminHoSoDto";
import { AdminUpdateYeuCauThanhToanParams, IAdminYeuCauThanhToan } from "../models/AdminYeuCauThanhToanDto";

export const DatLaiNgayHenTra = createAsyncThunk<IResult<any>, DatLaiNgayHenTraParams, {rejectValue: IResult<any>}>("DatLaiNgayHenTra", async (data, thunkApi) => {
    try {
        const res = await adminHoSoApi.DatLaiNgayHenTra(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})
export const DatLaiQuyTrinhXuLy = createAsyncThunk<IResult<any>, DatLaiQuyTrinhXuLyParams, {rejectValue: IResult<any>}>("DatLaiQuyTrinhXuLy", async (data, thunkApi) => {
    try {
        const res = await adminHoSoApi.DatLaiQuyTrinhXuLy(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})
export const AdminUpdateHoSo = createAsyncThunk<IResult<any>, AdminUpdateHoSoParams, {rejectValue: IResult<any>}>("AdminUpdateHoSo", async (data, thunkApi) => {
    try {
        const res = await adminHoSoApi.AdminUpdateHoSo(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})
export const AdminGetHoSo = createAsyncThunk<IResult<IAdminHoSo>, string>("AdminGetHoSo", async (id, thunkApi) => {
    try{
        const res = await adminHoSoApi.AdminGetHoSo(id)
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const AdminGetYeuCauThanhToan = createAsyncThunk<IResult<IAdminYeuCauThanhToan>, string>("AdminGetYeuCauThanhToan", async (id, thunkApi) => {
    try{
        const res = await adminHoSoApi.AdminGetYeuCauThanhToan(id)
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const AdminUpdateYeuCauThanhToan = createAsyncThunk<IResult<any>, AdminUpdateYeuCauThanhToanParams, {rejectValue: IResult<any>}>("AdminUpdateYeuCauThanhToan", async (data, thunkApi) => {
    try {
        const res = await adminHoSoApi.AdminUpdateYeuCauThanhToanService(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSo({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})
