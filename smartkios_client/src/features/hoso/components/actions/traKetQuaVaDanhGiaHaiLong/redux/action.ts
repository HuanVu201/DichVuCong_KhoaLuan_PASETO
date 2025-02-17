import { createAsyncThunk } from "@reduxjs/toolkit";
import { PhieuKhaoSatApi } from "../services";
import { IBaseExt, IOmitUpdate, IOmitUpdateDanhGiaHaiLong, IPaginationResponse, IResult, ISoftDelete } from "@/models";
import { IPhieuKhaoSat, ISearchPhieuKhaoSat } from "../models";
import { toast } from "react-toastify";

export const SearchPhieuKhaoSat =
    createAsyncThunk<IPaginationResponse<IPhieuKhaoSat[]>, ISearchPhieuKhaoSat>("SearchPhieuKhaoSat", async (params, thunkApi) => {
        try {
            const res = await PhieuKhaoSatApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const SearchBaoCao01 =
    createAsyncThunk<IPaginationResponse<IPhieuKhaoSat[]>, ISearchPhieuKhaoSat>("SearchBaoCao01", async (params, thunkApi) => {
        try {
            const res = await PhieuKhaoSatApi.SearchBaoCao01(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })



export const SearchPublicPhieuKhaoSat =
    createAsyncThunk<IPaginationResponse<IPhieuKhaoSat[]>, undefined>("SearchPublicPhieuKhaoSat", async (params, thunkApi) => {
        try {
            const res = await PhieuKhaoSatApi.SearchPublicModule()
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })


export const GetPhieuKhaoSat =
    createAsyncThunk<IResult<IPhieuKhaoSat>, string>("GetPhieuKhaoSat", async (id, thunkApi) => {
        try {
            const res = await PhieuKhaoSatApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetBaoCao1 =
    createAsyncThunk<IResult<IPhieuKhaoSat>, string>("GetBaoCao1", async (id, thunkApi) => {
        try {
            const res = await PhieuKhaoSatApi.GetBaoCao1(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetByMHS =
    createAsyncThunk<IResult<IPhieuKhaoSat>, string>("GetByMHS", async (maHS, thunkApi) => {
        try {
            const res = await PhieuKhaoSatApi.GetByMHS(maHS);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddPhieuKhaoSat = createAsyncThunk("AddPhieuKhaoSat", async (data: IPhieuKhaoSat, thunkApi) => {
    try {
        const res = await PhieuKhaoSatApi.Create(data);
      
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdatePhieuKhaoSat = createAsyncThunk("UpdatePhieuKhaoSat", async (data: IOmitUpdateDanhGiaHaiLong<IPhieuKhaoSat>, thunkApi) => {
    try {
        const res = await PhieuKhaoSatApi.Update(data);
      

        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeletePhieuKhaoSat = createAsyncThunk("DeletePhieuKhaoSat", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await PhieuKhaoSatApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchPhieuKhaoSat({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 
