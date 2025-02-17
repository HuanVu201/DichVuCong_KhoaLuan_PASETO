import { createAsyncThunk } from "@reduxjs/toolkit";
import { TaiKhoanThuHuongApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { ITaiKhoanThuHuong } from "../models";

export const SearchTaiKhoanThuHuong =
    createAsyncThunk<IPaginationResponse<ITaiKhoanThuHuong[]>, IPickSearch<ITaiKhoanThuHuong, "maNHThuHuong" | "donViId" | "tenTKThuHuong">>("SearchTaiKhoanThuHuong", async (params, thunkApi) => {
        try {
            const res = await TaiKhoanThuHuongApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetTaiKhoanThuHuong =
    createAsyncThunk<IResult<ITaiKhoanThuHuong>, string>("GetTaiKhoanThuHuong", async (id, thunkApi) => {
        try {
            const res = await TaiKhoanThuHuongApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddTaiKhoanThuHuong = createAsyncThunk("AddTaiKhoanThuHuong", async (data: ITaiKhoanThuHuong, thunkApi) => {
    try {
        const res = await TaiKhoanThuHuongApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchTaiKhoanThuHuong({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateTaiKhoanThuHuong = createAsyncThunk("UpdateTaiKhoanThuHuong", async (data: IOmitUpdate<ITaiKhoanThuHuong>, thunkApi) => {
    try {
        const res = await TaiKhoanThuHuongApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchTaiKhoanThuHuong({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteTaiKhoanThuHuong = createAsyncThunk("DeleteTaiKhoanThuHuong", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await TaiKhoanThuHuongApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchTaiKhoanThuHuong({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 