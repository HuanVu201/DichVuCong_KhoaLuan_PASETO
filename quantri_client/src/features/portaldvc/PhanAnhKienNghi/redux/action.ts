import { createAsyncThunk } from "@reduxjs/toolkit";
import { PhanAnhKienNghiApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../../models";
import { IPhanAnhKienNghi } from "../models";
import { toast } from "react-toastify";

export const SearchPhanAnhKienNghi =
    createAsyncThunk<IPaginationResponse<IPhanAnhKienNghi[]>, IPickSearch<IPhanAnhKienNghi, "tieuDe" | "noiDung" | "congKhai" | "trangThai">>("SearchPhanAnhKienNghi", async (params, thunkApi) => {
        try {
            const res = await PhanAnhKienNghiApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetPhanAnhKienNghi =
    createAsyncThunk<IResult<IPhanAnhKienNghi>, string>("GetPhanAnhKienNghi", async (id, thunkApi) => {
        try {
            const res = await PhanAnhKienNghiApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddPhanAnhKienNghi = createAsyncThunk("AddPhanAnhKienNghi", async (data: IPhanAnhKienNghi, thunkApi) => {
    try {
        const res = await PhanAnhKienNghiApi.Create(data);
        // if (res.status === 201) {
        //     toast.success('Đã gửi phản ánh, kiến nghị thành công')
        // }
        return res.status
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdatePhanAnhKienNghi = createAsyncThunk("UpdatePhanAnhKienNghi", async (data: IOmitUpdate<IPhanAnhKienNghi>, thunkApi) => {
    try {
        const res = await PhanAnhKienNghiApi.Update(data);
        return res
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeletePhanAnhKienNghi = createAsyncThunk("DeletePhanAnhKienNghi", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await PhanAnhKienNghiApi.Delete(data);
        if (res.status === 200) {
            // thunkApi.dispatch(SearchPhanAnhKienNghi({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 