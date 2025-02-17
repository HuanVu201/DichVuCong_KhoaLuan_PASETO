import { createAsyncThunk } from "@reduxjs/toolkit";
import { thuTucApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { INguoiTiepNhanThuTuc, ISearchNguoiTiepNhanThuTuc, ISearchThuTuc, ISearchThuTucTheoBaoCaoTongHop, IThuTuc } from "../models";
import { ISearchLinhVuc } from "@/features/linhvuc/models";

export const SearchThuTuc =
    createAsyncThunk<IPaginationResponse<IThuTuc[]>, ISearchThuTuc>("SearchThuTuc", async (params, thunkApi) => {
        try {
            const res = await thuTucApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const PortalSearchThuTuc =
createAsyncThunk<IPaginationResponse<IThuTuc[]>, ISearchThuTuc>("PortalSearchThuTuc", async (params, thunkApi) => {
    try {
        const res = await thuTucApi.PortalSearch(params)
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const SearchDanhMucTTHC =
    createAsyncThunk<IPaginationResponse<IThuTuc[]>, ISearchLinhVuc>("SearchDanhMucTTHC", async (params, thunkApi) => {
        try {
            const res = await thuTucApi.SearchDanhMucTTHC(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

    export const SearchNguoiTiepNhanThuTucs =
    createAsyncThunk<IPaginationResponse<INguoiTiepNhanThuTuc[]>, IPickSearch<INguoiTiepNhanThuTuc, "maTTHC" | "tenTTHC" | "donViId">>("SearchNguoiTiepNhanThuTucs", async (params, thunkApi) => {
        try {
            const res = await thuTucApi.SearchNguoiTiepNhanThuTucs(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const SearchThuTucNoiBat =
    createAsyncThunk<IThuTuc[], ISearchThuTuc>("SearchThuTucNoiBat", async (params, thunkApi) => {
        try {
            const res = await thuTucApi.SearchDVCNoiBat(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetThuTuc =
    createAsyncThunk<IResult<IThuTuc>, string>("GetThuTuc", async (id, thunkApi) => {
        try {
            const res = await thuTucApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })



export const AddThuTuc = createAsyncThunk("AddThuTuc", async (data: IThuTuc, thunkApi) => {
    try {
        const res = await thuTucApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchThuTuc({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateThuTuc = createAsyncThunk("UpdateThuTuc", async (data: IOmitUpdate<IThuTuc>, thunkApi) => {
    try {
        const res = await thuTucApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchThuTuc({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteThuTuc = createAsyncThunk("DeleteThuTuc", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await thuTucApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchThuTuc({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 
export const SearchThuTucTheoBaoCaoTongHop =
    createAsyncThunk<IPaginationResponse<IThuTuc[]>, ISearchThuTucTheoBaoCaoTongHop>("SearchThuTucTheoBaoCaoTongHop", async (params, thunkApi) => {
        try {
            const res = await thuTucApi.SearchTheoBaoCaoTongHop(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })