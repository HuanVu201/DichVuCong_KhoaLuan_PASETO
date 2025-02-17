import { createAsyncThunk } from "@reduxjs/toolkit";
import { loaiPhiLePhiApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { ILoaiPhiLePhi } from "../models";
import Search from "antd/es/input/Search";

export const SearchLoaiPhiLePhi =
    createAsyncThunk<IPaginationResponse<ILoaiPhiLePhi[]>, IPickSearch<ILoaiPhiLePhi, "ten">>("SearchLoaiPhiLePhi", async (params, thunkApi) => {
        try {
            const res = await loaiPhiLePhiApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetLoaiPhiLePhi =
    createAsyncThunk<IResult<ILoaiPhiLePhi>, string>("GetLoaiPhiLePhi", async (id, thunkApi) => {
        try {
            const res = await loaiPhiLePhiApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddLoaiPhiLePhi = createAsyncThunk("AddLoaiPhiLePhi", async (data: ILoaiPhiLePhi, thunkApi) => {
    try {
        const res = await loaiPhiLePhiApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchLoaiPhiLePhi({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateLoaiPhiLePhi = createAsyncThunk("UpdateLoaiPhiLePhi", async (data: IOmitUpdate<ILoaiPhiLePhi>, thunkApi) => {
    try {
        const res = await loaiPhiLePhiApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchLoaiPhiLePhi({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteLoaiPhiLePhi = createAsyncThunk("DeleteLoaiPhiLePhi", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await loaiPhiLePhiApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchLoaiPhiLePhi({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 