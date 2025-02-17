import { createAsyncThunk } from "@reduxjs/toolkit";
import { DeleteHoSoNhapParams, GetHoSoNhapDetailParams, hoSoNhapApi } from "../services";
import { IDeleteFiles, IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { IHoSoNhap, ISearchHoSoNhap } from "../models";
import { IThemHoSo } from "@/features/hoso/components/actions/themMoiHoSo/ThemMoiTiepNhanHoSoModal";
import { AxiosError } from "axios";

export const SearchHoSoNhap =
    createAsyncThunk<IPaginationResponse<IHoSoNhap[]>, ISearchHoSoNhap>("SearchHoSoNhap", async (params, thunkApi) => {
        try {
            const res = await hoSoNhapApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetHoSoNhap =
    createAsyncThunk<IResult<IHoSoNhap>, GetHoSoNhapDetailParams>("GetHoSoNhap", async (params, thunkApi) => {
        try {
            const res = await hoSoNhapApi.GetDetail(params);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddHoSoNhap = createAsyncThunk<IResult<string>, IThemHoSo & IDeleteFiles, { rejectValue: IResult<any> }>("AddHoSoNhap", async (data, thunkApi) => {
    try {
        const res = await hoSoNhapApi.Create(data);
        // if (res.status === 201) {
        //     thunkApi.dispatch(SearchHoSoNhap({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue((error as AxiosError).response?.data as IResult<any>)
    }
})


export const UpdateHoSoNhap = createAsyncThunk("UpdateHoSoNhap", async (data: IOmitUpdate<IHoSoNhap>, thunkApi) => {
    try {
        const res = await hoSoNhapApi.Update(data);
        // if (res.status === 200) {
        //     thunkApi.dispatch(SearchHoSoNhap({ reFetch: true }))
        // }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteHoSoNhap = createAsyncThunk("DeleteHoSoNhap", async (params: DeleteHoSoNhapParams, thunkApi) => {
    try {
        const res = await hoSoNhapApi.Delete(params);
        if (res.status === 200) {
            thunkApi.dispatch(SearchHoSoNhap({ reFetch: true, pageSize: 10, pageNumber: 1 }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 