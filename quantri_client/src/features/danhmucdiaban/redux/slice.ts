import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { IDanhMucDiaBan } from "../models";
import { AddDanhMucDiaBan, DeleteDanhMucDiaBan, GetDanhMucDiaBan, SearchDanhMucDiaBan , UpdateDanhMucDiaBan } from "./action";

export interface IDanhMucDiaBanState extends ExtendedState<IDanhMucDiaBan, {
    maTinh: IDanhMucDiaBan[] | undefined, maHuyen: IDanhMucDiaBan[] | undefined, maXa: IDanhMucDiaBan[] | undefined
}, "maHuyen" | "maTinh" | "maXa">{

}

const initialState : IDanhMucDiaBanState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "danhmucdiaban",
    initialState,
    reducers: {
        resetMaTinh: (state) => {
            state.maTinh = undefined
        },
        resetMaHuyen: (state) => {
            state.maHuyen = undefined
        },
        resetMaXa: (state) => {
            state.maXa = undefined
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(SearchDanhMucDiaBan.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchDanhMucDiaBan.fulfilled, (state, action) => {
                const type =  action.meta.arg.Loai
                state.loading = false
                state.datas = action.payload.data
                if(type == "Tinh")
                    state.maTinh = action.payload.data
                else if(type == "Huyen")
                    state.maHuyen = action.payload.data
                else if(type == "Xa")
                    state.maXa = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchDanhMucDiaBan.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(GetDanhMucDiaBan.pending, (state) => {
                state.loading = true
            })
            .addCase(GetDanhMucDiaBan.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(GetDanhMucDiaBan.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(AddDanhMucDiaBan.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddDanhMucDiaBan.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(UpdateDanhMucDiaBan.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateDanhMucDiaBan.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(DeleteDanhMucDiaBan.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeleteDanhMucDiaBan.rejected, (_, action) => {
                toast.error(action.error.message)
            })
    }
})

export const {resetData, resetDatas, resetMaTinh, resetMaHuyen, resetMaXa} = Slice.actions

export default Slice.reducer