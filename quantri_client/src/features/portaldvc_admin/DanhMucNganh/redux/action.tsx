import { createAsyncThunk } from "@reduxjs/toolkit";
import { DanhMucNganhApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../../models";
import { IDanhMucNganh } from "../models";

export const SearchDanhMucNganh =
    createAsyncThunk<IPaginationResponse<IDanhMucNganh[]>, IPickSearch<IDanhMucNganh, "tenDanhMuc" | "type">>("SearchDanhMucNganh", async (params, thunkApi) => {
        try {
            const res = await DanhMucNganhApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetDanhMucNganh =
    createAsyncThunk<IResult<IDanhMucNganh>, string>("GetDanhMucNganh", async (id, thunkApi) => {
        try {
            const res = await DanhMucNganhApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddDanhMucNganh = createAsyncThunk("AddDanhMucNganh", async (data: IDanhMucNganh, thunkApi) => {
    try {
        const res = await DanhMucNganhApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchDanhMucNganh({ reFetch: true, type: 'danh-muc-nganh' }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateDanhMucNganh = createAsyncThunk("UpdateDanhMucNganh", async (data: IOmitUpdate<IDanhMucNganh>, thunkApi) => {
    try {
        const res = await DanhMucNganhApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhMucNganh({ reFetch: true, type: 'danh-muc-nganh' }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteDanhMucNganh = createAsyncThunk("DeleteDanhMucNganh", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await DanhMucNganhApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDanhMucNganh({ reFetch: true,type : 'danh-muc-nganh' }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 