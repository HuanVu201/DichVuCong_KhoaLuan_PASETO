import { createAsyncThunk } from "@reduxjs/toolkit";
import { assor_Proc_Mgr_Api } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../../models";
import { IAssor_Proc_Mgr } from "../model";
import Search from "antd/es/input/Search";

export const SearchAssor_proc_mgrs =
    createAsyncThunk<IPaginationResponse<IAssor_Proc_Mgr[]>, IPickSearch<IAssor_Proc_Mgr>>("SearchAssor_proc_mgrs", async (params, thunkApi) => {
        try {
            const res = await assor_Proc_Mgr_Api.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetAssor_proc_mgrs =
    createAsyncThunk<IResult<IAssor_Proc_Mgr>, string>("GetAssor_proc_mgrs", async (id, thunkApi) => {
        try {
            const res = await assor_Proc_Mgr_Api.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddAssor_proc_mgrs = createAsyncThunk("AddAssor_proc_mgrs", async (data: IAssor_Proc_Mgr, thunkApi) => {
    try {
        const res = await assor_Proc_Mgr_Api.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchAssor_proc_mgrs({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateAssor_proc_mgrs = createAsyncThunk("UpdateAssor_proc_mgrs", async (data: IOmitUpdate<IAssor_Proc_Mgr>, thunkApi) => {
    try {
        const res = await assor_Proc_Mgr_Api.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchAssor_proc_mgrs({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteAssor_proc_mgrs = createAsyncThunk("DeleteAssor_proc_mgrs", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await assor_Proc_Mgr_Api.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchAssor_proc_mgrs({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 