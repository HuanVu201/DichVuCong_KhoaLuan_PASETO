import { IResult } from "@/models";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILienThongVBDLIS } from "../models";
import { IBoSungHoSoGuiVBDLISParams, ITiepNhanGuiVBDLISParams, lienThongVBDLISApi } from "../services";

export const TiepNhanGuiVBDLISAction =
    createAsyncThunk<IResult<ILienThongVBDLIS>, ITiepNhanGuiVBDLISParams>("TiepNhanGuiVBDLISAction", async (params, thunkApi) => {
        try {
            const res = await lienThongVBDLISApi.TiepNhanGuiVBDLIS(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const BoSungHoSoGuiVBDLISAction =
    createAsyncThunk<IResult<ILienThongVBDLIS>, IBoSungHoSoGuiVBDLISParams>("BoSungHoSoGuiVBDLISAction", async (params, thunkApi) => {
        try {
            const res = await lienThongVBDLISApi.BoSungHoSoGuiVBDLIS(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
