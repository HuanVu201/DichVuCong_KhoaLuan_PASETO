import { createAsyncThunk } from "@reduxjs/toolkit";
import { thanhPhanThuTucApi } from "../services";
import { IBaseExt, IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { IThanhPhanThuTuc } from "../models";

export const SearchThanhPhanThuTuc =
    createAsyncThunk<IPaginationResponse<IThanhPhanThuTuc[]>, IPickSearch<IThanhPhanThuTuc>>("SearchThanhPhanThuTuc", async (params, thunkApi) => {
        try {
            const res = await thanhPhanThuTucApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetThanhPhanThuTuc =
    createAsyncThunk<IResult<IThanhPhanThuTuc>, string>("GetThanhPhanThuTuc", async (id, thunkApi) => {
        try {
            const res = await thanhPhanThuTucApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddThanhPhanThuTuc = createAsyncThunk("AddThanhPhanThuTuc", async (data: IThanhPhanThuTuc, thunkApi) => {
    try {
        const res = await thanhPhanThuTucApi.Create(data);
        // if (res.status === 201) {
        //     thunkApi.dispatch(SearchThanhPhanThuTuc({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const UpdateThanhPhanThuTuc = createAsyncThunk("UpdateThanhPhanThuTuc", async (data: IOmitUpdate<IThanhPhanThuTuc>, thunkApi) => {
    try {
        const res = await thanhPhanThuTucApi.Update(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchThanhPhanThuTuc({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteThanhPhanThuTuc = createAsyncThunk("DeleteThanhPhanThuTuc", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await thanhPhanThuTucApi.Delete(data);
       
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 