import { createAsyncThunk } from "@reduxjs/toolkit";
import { giaoDichThanhToanApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { IConfirmDvcPaymentResponse, IGiaoDichThanhToan, ISearchGiaoDichThanhToan } from "../models";

export const SearchGiaoDichThanhToan =
    createAsyncThunk<IPaginationResponse<IGiaoDichThanhToan[]>, ISearchGiaoDichThanhToan>("SearchGiaoDichThanhToan", async (params, thunkApi) => {
        try {
            const res = await giaoDichThanhToanApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const SearchGiaoDichThanhToanTheoDonVi =
    createAsyncThunk<IPaginationResponse<IGiaoDichThanhToan[]>, ISearchGiaoDichThanhToan>("SearchGiaoDichThanhToanTheoDonVi", async (params, thunkApi) => {
        try {
            const res = await giaoDichThanhToanApi.SearchTheoDonVi(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const GetGiaoDichThanhToan =
    createAsyncThunk<IResult<IGiaoDichThanhToan>, string>("GetGiaoDichThanhToan", async (id, thunkApi) => {
        try {
            const res = await giaoDichThanhToanApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddGiaoDichThanhToan = createAsyncThunk("AddGiaoDichThanhToan", async (data: IGiaoDichThanhToan, thunkApi) => {
    try {
        const res = await giaoDichThanhToanApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchGiaoDichThanhToan({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateGiaoDichThanhToan = createAsyncThunk("UpdateGiaoDichThanhToan", async (data: IOmitUpdate<IGiaoDichThanhToan>, thunkApi) => {
    try {
        const res = await giaoDichThanhToanApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchGiaoDichThanhToan({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteGiaoDichThanhToan = createAsyncThunk("DeleteGiaoDichThanhToan", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await giaoDichThanhToanApi.Delete(data);

        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const CheckConfirmGiaoDichThanhToan =
    createAsyncThunk<IResult<IConfirmDvcPaymentResponse>, string>("CheckConfirmGiaoDichThanhToan", async (id, thunkApi) => {
        try {
            const res = await giaoDichThanhToanApi.Checkconfirm(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }) 