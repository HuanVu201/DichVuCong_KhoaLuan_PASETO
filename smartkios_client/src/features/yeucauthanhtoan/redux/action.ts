import { createAsyncThunk } from "@reduxjs/toolkit";
import { yeuCauThanhToanApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { ISearchYeuCauThanhToan, IYeuCauThanhToan } from "../models";

export const SearchYeuCauThanhToan =
    createAsyncThunk<IPaginationResponse<IYeuCauThanhToan[]>, ISearchYeuCauThanhToan>("SearchYeuCauThanhToan", async (params, thunkApi) => {
        try {
            const res = await yeuCauThanhToanApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetYeuCauThanhToan =
    createAsyncThunk<IResult<IYeuCauThanhToan>, string>("GetYeuCauThanhToan", async (id, thunkApi) => {
        try {
            const res = await yeuCauThanhToanApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddYeuCauThanhToan = createAsyncThunk("AddYeuCauThanhToan", async (data: IYeuCauThanhToan, thunkApi) => {
    try {
        const res = await yeuCauThanhToanApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchYeuCauThanhToan({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateYeuCauThanhToan = createAsyncThunk("UpdateYeuCauThanhToan", async (data: IOmitUpdate<IYeuCauThanhToan>, thunkApi) => {
    try {
        const res = await yeuCauThanhToanApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchYeuCauThanhToan({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const PayYeuCauThanhToan = createAsyncThunk("PayYeuCauThanhToan", async (data: IOmitUpdate<IYeuCauThanhToan>, thunkApi) => {
    try {
        const res = await yeuCauThanhToanApi.Pay(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchYeuCauThanhToan({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
    
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteYeuCauThanhToan = createAsyncThunk("DeleteYeuCauThanhToan", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await yeuCauThanhToanApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchYeuCauThanhToan({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 