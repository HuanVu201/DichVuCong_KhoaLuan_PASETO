import { createAsyncThunk } from "@reduxjs/toolkit";
import { Service_Logs_MgrApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { IService_Logs_Mgr, ISearchService_Logs_Mgr } from "../models";

export const SearchService_Logs_Mgr =
    createAsyncThunk<IPaginationResponse<IService_Logs_Mgr[]>, ISearchService_Logs_Mgr>("SearchService_Logs_Mgr", async (params, thunkApi) => {
        try {
            const res = await Service_Logs_MgrApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const GetService_Logs_Mgr =
    createAsyncThunk<IResult<IService_Logs_Mgr>, string>("GetService_Logs_Mgr", async (id, thunkApi) => {
        try {
            const res = await Service_Logs_MgrApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddService_Logs_Mgr = createAsyncThunk("AddService_Logs_Mgr", async (data: IService_Logs_Mgr, thunkApi) => {
    try {
        const res = await Service_Logs_MgrApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchService_Logs_Mgr({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateService_Logs_Mgr = createAsyncThunk("UpdateService_Logs_Mgr", async (data: IOmitUpdate<IService_Logs_Mgr>, thunkApi) => {
    try {
        const res = await Service_Logs_MgrApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchService_Logs_Mgr({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteService_Logs_Mgr = createAsyncThunk("DeleteService_Logs_Mgr", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await Service_Logs_MgrApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchService_Logs_Mgr({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 