import { createAsyncThunk } from "@reduxjs/toolkit";
import { LogThongKeDGHLCongDanApi } from "../services";
import { IBaseExt, IOmitUpdate, IOmitUpdateDanhGiaHaiLong, IPaginationResponse, IResult, ISoftDelete } from "@/models";
import { ILogThongKeDGHLCongDan, ISearchLogThongKeDGHLCongDan } from "../models";
import { toast } from "react-toastify";

export const SearchLogThongKeDGHLCongDan =
    createAsyncThunk<IPaginationResponse<ILogThongKeDGHLCongDan[]>, ISearchLogThongKeDGHLCongDan>("SearchLogThongKeDGHLCongDan", async (params, thunkApi) => {
        try {
            const res = await LogThongKeDGHLCongDanApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })



export const SearchPublicLogThongKeDGHLCongDan =
    createAsyncThunk<IPaginationResponse<ILogThongKeDGHLCongDan[]>, undefined>("SearchPublicLogThongKeDGHLCongDan", async (params, thunkApi) => {
        try {
            const res = await LogThongKeDGHLCongDanApi.SearchPublicModule()
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })


export const GetLogThongKeDGHLCongDan =
    createAsyncThunk<IResult<ILogThongKeDGHLCongDan>, string>("GetLogThongKeDGHLCongDan", async (id, thunkApi) => {
        try {
            const res = await LogThongKeDGHLCongDanApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetBaoCao1 =
    createAsyncThunk<IResult<ILogThongKeDGHLCongDan>, string>("GetBaoCao1", async (id, thunkApi) => {
        try {
            const res = await LogThongKeDGHLCongDanApi.GetBaoCao1(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetByMHS =
    createAsyncThunk<IResult<ILogThongKeDGHLCongDan>, string>("GetByMHS", async (maHS, thunkApi) => {
        try {
            const res = await LogThongKeDGHLCongDanApi.GetByMHS(maHS);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddLogThongKeDGHLCongDan = createAsyncThunk("AddLogThongKeDGHLCongDan", async (data: ILogThongKeDGHLCongDan, thunkApi) => {
    try {
        const res = await LogThongKeDGHLCongDanApi.Create(data);
        
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateLogThongKeDGHLCongDan = createAsyncThunk("UpdateLogThongKeDGHLCongDan", async (data: IOmitUpdateDanhGiaHaiLong<ILogThongKeDGHLCongDan>, thunkApi) => {
    try {
        const res = await LogThongKeDGHLCongDanApi.Update(data);
      

        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteLogThongKeDGHLCongDan = createAsyncThunk("DeleteLogThongKeDGHLCongDan", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await LogThongKeDGHLCongDanApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchLogThongKeDGHLCongDan({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 
