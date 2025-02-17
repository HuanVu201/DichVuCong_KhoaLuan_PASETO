import { createAsyncThunk } from "@reduxjs/toolkit";
import { donViApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { IDonVi } from "../models";

export const SearchDonVi =
    createAsyncThunk<IPaginationResponse<IDonVi[]>, IPickSearch<IDonVi, "maTTHC" | "donViId">>("SearchDonVi", async (params, thunkApi) => {
        try {
            const res = await donViApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetDonVi =
    createAsyncThunk<IResult<IDonVi>, string>("GetDonVi", async (id, thunkApi) => {
        try {
            const res = await donViApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddDonVi = createAsyncThunk("AddDonVi", async (data: IDonVi, thunkApi) => {
    try {
        const res = await donViApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchDonVi({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateDonVi = createAsyncThunk("UpdateDonVi", async (data: IOmitUpdate<IDonVi>, thunkApi) => {
    try {
        const res = await donViApi.Update(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchDonVi({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteDonVi = createAsyncThunk("DeleteDonVi", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await donViApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDonVi({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 