import { createAsyncThunk } from "@reduxjs/toolkit";
import { phiLePhiApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { IPhiLePhi } from "../models";

export const SearchPhiLePhi =
    createAsyncThunk<IPaginationResponse<IPhiLePhi[]>, IPickSearch<IPhiLePhi, "thuTucId" | "loai" | "donVi">>("SearchPhiLePhi", async (params, thunkApi) => {
        try {
            const res = await phiLePhiApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetPhiLePhi =
    createAsyncThunk<IResult<IPhiLePhi>, string>("GetPhiLePhi", async (id, thunkApi) => {
        try {
            const res = await phiLePhiApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddPhiLePhi = createAsyncThunk("AddPhiLePhi", async (data: IPhiLePhi, thunkApi) => {
    try {
        const res = await phiLePhiApi.Create(data);
        // if (res.status === 201) {
        //     thunkApi.dispatch(SearchPhiLePhi({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdatePhiLePhi = createAsyncThunk("UpdatePhiLePhi", async (data: IOmitUpdate<IPhiLePhi>, thunkApi) => {
    try {
        const res = await phiLePhiApi.Update(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchPhiLePhi({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeletePhiLePhi = createAsyncThunk("DeletePhiLePhi", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await phiLePhiApi.Delete(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchPhiLePhi({ reFetch: true }))
        // }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 