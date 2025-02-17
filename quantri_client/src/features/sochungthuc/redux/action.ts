import { createAsyncThunk } from "@reduxjs/toolkit";
import { SoChungThucApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { ISoChungThuc, ISearchSoChungThuc } from "../models";
import { useAppSelector } from "@/lib/redux/Hooks";


export const SearchSoChungThuc =
    createAsyncThunk<IPaginationResponse<ISoChungThuc[]>, ISearchSoChungThuc>("SearchSoChungThuc", async (params, thunkApi) => {
        try {
            const res = await SoChungThucApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })


export const GetSoChungThuc =
    createAsyncThunk<IResult<ISoChungThuc>, string>("GetSoChungThuc", async (id, thunkApi) => {
        try {
            const res = await SoChungThucApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddSoChungThuc = createAsyncThunk("AddSoChungThuc", async (data: ISoChungThuc, thunkApi) => {
    try {
        const res = await SoChungThucApi.Create(data);
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
// export const AddSoChungThucDonVi = createAsyncThunk("AddSoChungThuc", async (data: ISoChungThuc, thunkApi) => {
//     try {
//         const res = await SoChungThucApi.Create(data);
//         if (res.status === 201) {
//             thunkApi.dispatch(SearchSoChungThuc({ reFetch: true ,donVi : user?.officeCode}))
//         }
//         return res.data
//     } catch (error) {
//         return thunkApi.rejectWithValue(error)
//     }
// })


export const UpdateSoChungThuc = createAsyncThunk("UpdateSoChungThuc", async (data: IOmitUpdate<ISoChungThuc>, thunkApi) => {
    try {
        const res = await SoChungThucApi.Update(data);
       
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteSoChungThuc = createAsyncThunk("DeleteSoChungThuc", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await SoChungThucApi.Delete(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchSoChungThuc({ reFetch: true }))
        // }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 
