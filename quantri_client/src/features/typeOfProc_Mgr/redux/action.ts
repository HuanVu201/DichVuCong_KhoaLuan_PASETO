import { createAsyncThunk } from "@reduxjs/toolkit";
import { typeOfProc_MgrApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { ITypeOfProc_Mgr, ISearchTypeOfProc_Mgr } from "../models";
import { useProcGroup_MgrContext } from "@/features/proGruop_Mgr/contexts/ProcGroup_MgrContext";

export const SearchTypeOfProc_Mgr =
    createAsyncThunk<IPaginationResponse<ITypeOfProc_Mgr[]>, ISearchTypeOfProc_Mgr>("SearchTypeOfProc_Mgr", async (params, thunkApi) => {
        try {
            const res = await typeOfProc_MgrApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const SearchTypeOfProc_MgrTheoDonVi =
    createAsyncThunk<IPaginationResponse<ITypeOfProc_Mgr[]>, ISearchTypeOfProc_Mgr>("SearchTypeOfProc_MgrTheoDonVi", async (params, thunkApi) => {
        try {
            const res = await typeOfProc_MgrApi.SearchTheoDonVi(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const GetTypeOfProc_Mgr =
    createAsyncThunk<IResult<ITypeOfProc_Mgr>, string>("GetTypeOfProc_Mgr", async (id, thunkApi) => {
        try {
            const res = await typeOfProc_MgrApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddTypeOfProc_Mgr = createAsyncThunk("AddTypeOfProc_Mgr", async (data: ITypeOfProc_Mgr, thunkApi) => {
    try {
        const res = await typeOfProc_MgrApi.Create(data);
        if (res.status === 201) {
           // chuyển xử lý qua dispath trực tiếp rồi
            //  thunkApi.dispatch(SearchTypeOfProc_Mgr({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateTypeOfProc_Mgr = createAsyncThunk("UpdateTypeOfProc_Mgr", async (data: IOmitUpdate<ITypeOfProc_Mgr>, thunkApi) => {
    try {
        const res = await typeOfProc_MgrApi.Update(data);
        if (res.status === 200) {
           // thunkApi.dispatch(SearchTypeOfProc_Mgr({ reFetch: true}))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteTypeOfProc_Mgr = createAsyncThunk("DeleteTypeOfProc_Mgr", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await typeOfProc_MgrApi.Delete(data);
        if (res.status === 200) {
            // chuyển xử lý qua dispath trực tiếp rồi
            // thunkApi.dispatch(SearchTypeOfProc_Mgr({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 