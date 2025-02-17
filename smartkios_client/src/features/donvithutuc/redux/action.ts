import { createAsyncThunk } from "@reduxjs/toolkit";
import { donViThuTucApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { IAddMultiDonViThuTuc, IDeleteMultiDonViThuTuc, IDonViThuTuc, IUpdateMultiDonViThuTuc } from "../models";

export const SearchDonViThuTuc =
    createAsyncThunk<IPaginationResponse<IDonViThuTuc[]>, IPickSearch<IDonViThuTuc, "maTTHC" | "donViId">>("SearchDonViThuTuc", async (params, thunkApi) => {
        try {
            const res = await donViThuTucApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetDonViThuTuc =
    createAsyncThunk<IResult<IDonViThuTuc>, string>("GetDonViThuTuc", async (id, thunkApi) => {
        try {
            const res = await donViThuTucApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddDonViThuTuc = createAsyncThunk("AddDonViThuTuc", async (data: IDonViThuTuc, thunkApi) => {
    try {
        const res = await donViThuTucApi.Create(data);
        // if (res.status === 201) {
        //     thunkApi.dispatch(SearchDonViThuTuc({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const AddMultiDonViThuTuc = createAsyncThunk("AddMultiDonViThuTuc", async (data: IAddMultiDonViThuTuc, thunkApi) => {
    try {
        const res = await donViThuTucApi.AddMulti(data);
        // if (res.status === 201) {
        //     thunkApi.dispatch(SearchDonViThuTuc({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const UpdateDonViThuTuc = createAsyncThunk("UpdateDonViThuTuc", async (data: IOmitUpdate<IDonViThuTuc>, thunkApi) => {
    try {
        const res = await donViThuTucApi.Update(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchDonViThuTuc({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const UpdateMultiDonViThuTuc = createAsyncThunk("UpdateMultiDonViThuTuc", async (data: IUpdateMultiDonViThuTuc, thunkApi) => {
    try {
        const res = await donViThuTucApi.UpdateMulti(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchDonViThuTuc({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteDonViThuTuc = createAsyncThunk("DeleteDonViThuTuc", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await donViThuTucApi.Delete(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchDonViThuTuc({ reFetch: true }))
        // }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 
export const DeleteMultiDonViThuTuc = createAsyncThunk("DeleteMultiDonViThuTuc", async (data: IDeleteMultiDonViThuTuc, thunkApi) => {
    try {
        const res = await donViThuTucApi.DelMulti(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchDonViThuTuc({ reFetch: true }))
        // }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 