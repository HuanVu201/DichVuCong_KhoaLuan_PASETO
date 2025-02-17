import { hoSoApi } from "@/features/hoso/services";
import { ISearchThongKeHoSoChungThuc, IThongKeHoSoChungThuc, IThongKeHoSoChungThucChiTiet } from "@/features/sochungthuc/models";
import { IPaginationResponse } from "@/models";
import { createAsyncThunk } from "@reduxjs/toolkit";



export const StatisticHoSoChungThuc =
createAsyncThunk<IPaginationResponse<IThongKeHoSoChungThuc[]>, ISearchThongKeHoSoChungThuc>("StatisticHoSoChungThuc", async (params, thunkApi) => {
    try {
        const res = await hoSoApi.StatisticHoSoChungThuc(params)
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const StatisticChiTietHoSoChungThuc =
createAsyncThunk<IPaginationResponse<IThongKeHoSoChungThucChiTiet[]>, ISearchThongKeHoSoChungThuc>("StatisticChiTietHoSoChungThuc", async (params, thunkApi) => {
    try {
        const res = await hoSoApi.StatisticChiTietHoSoChungThuc(params)
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

 