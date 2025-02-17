import { createAsyncThunk } from "@reduxjs/toolkit";
import { IQuanLyTaiKhoanDinhDanh, ISearchQuanLyTaiKhoanDinhDanhParams } from "../models/QuanLyTaiKhoanModel";
import { quanLyDinhDanhCongDanApi } from "../service";
import { IPaginationResponse } from "@/models";
import { useQuanLyDinhDanhContext } from "../context/quanLyDinhDanhCongDanContext";


export const SearchDanhSachTaiKhoan =
    createAsyncThunk<IPaginationResponse<IQuanLyTaiKhoanDinhDanh[]>, ISearchQuanLyTaiKhoanDinhDanhParams>("SearchDanhSachTaiKhoan", async (params, thunkApi) => {
        try {
            const res = await quanLyDinhDanhCongDanApi.SearchDanhSachTaiKhoan(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })


export const GetThongTinTaiKhoan =
    createAsyncThunk<IQuanLyTaiKhoanDinhDanh, { id: string }>("GetThongTinTaiKhoan", async (params, thunkApi) => {
        try {
            const res = await quanLyDinhDanhCongDanApi.GetThongTinTaiKhoan(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })


export const GetDataChartDinhDanhCongDan =
    createAsyncThunk<IQuanLyTaiKhoanDinhDanh, { doTuoi?: string }>("GetDataChartDinhDanhCongDan", async (params, thunkApi) => {
        try {
            const res = await quanLyDinhDanhCongDanApi.GetDataChartDinhDanhCongDan(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const DeleteDinhDanhUser = createAsyncThunk("DeleteDinhDanhUser", async (data: { id: string }, thunkApi) => {
    try {
        const res = await quanLyDinhDanhCongDanApi.DeleteDinhDanhUser(data);
        return res
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const ToggleLockoutUser = createAsyncThunk("ToggleLockoutUser", async (data: { id: string }, thunkApi) => {
    try {
        const res = await quanLyDinhDanhCongDanApi.ToggleLockoutUser(data);
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
