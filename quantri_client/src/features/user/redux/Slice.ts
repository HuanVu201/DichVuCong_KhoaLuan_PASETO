import { toast } from "react-toastify";
import createGenericSlice, { GenericState, ExtendedState } from "../../../lib/redux/GenericSlice";
import { ICredential, IParseUserToken } from "../../../models";
import { GetUser, GetUserById, SearchUser, GetUsersWithDonViQuanLy, UpdateUser, DeleteUser, ChangePasswordUser, AdminResetPassword, GetUserFromCSDLDanCu, CreateUserWithDefaultPassword, ChangeUserGroup, GetUserBySoDinhDanh, SearchUserDonViThuTuc, SearchPortalUser } from "./Actions";
import { GetCSDLDanCuResponse, IUser, ThongTinCSDLDanCuSearchParams } from "../models";
import { PayloadAction, createAction, isFulfilled, isPending, isRejected, isRejectedWithValue } from "@reduxjs/toolkit";
import { toCamel } from "@/utils/common";

export interface IAuthState extends ExtendedState<IUser, {
    userCDSLDanCu?: GetCSDLDanCuResponse;
    donViThuTucUsers?: IUser[];
}, "userCDSLDanCu" | "donViThuTucUsers" > {
}

const initialState: IAuthState = {
    loading: false
}

export const Slice = createGenericSlice({
    name: "user",
    initialState,
    reducers: {
        toggleLoading: (state) => {
            state.loading = !state.loading
        },
        resetUserCSDLDanCu: (state) => {
            state.userCDSLDanCu = undefined
        },
        resetDonViThuTucUsers: (state) => {
            state.donViThuTucUsers = undefined
        },
        setUserData: (state, action: PayloadAction<IParseUserToken>) => {

            const payload = action.payload
            state.data =state.data|| {
                groupCode: payload.groupCode,
                email: payload.email,
                fullName: payload.fullName,
                groupName: payload.groupName,
                officeCode: payload.officeCode,
                officeName: payload.officeName,
                typeUser: payload.typeUser,
                id: payload.uid,
                userName: payload.sub,
                maDinhDanh: payload.maDinhDanh,
                positionName: payload.positionName
            } as IUser
        },
        UpdateUserData: (state, action: PayloadAction<IUser>) => {
            const payload = action.payload
            state.data = {
                groupCode: payload.groupCode,
                email: payload.email,
                fullName: payload.fullName,
                groupName: payload.groupName,
                officeCode: payload.officeCode,
                officeName: payload.officeName,
                typeUser: payload.typeUser,
                id: payload.id,
                userName: payload.userName,
                maDinhDanh: payload.maDinhDanh,
                positionName: payload.positionName
            } as IUser
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(SearchUser.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(GetUsersWithDonViQuanLy.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchPortalUser.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchUserDonViThuTuc.fulfilled, (state, action) => {
                state.loading = false
                state.donViThuTucUsers = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(GetUser.pending, (state) => {
                state.loading = true
            })
            .addCase(GetUser.fulfilled, (state, action) => {
                state.data = action.payload
                state.loading = false
            })
            .addCase(GetUser.rejected, (state, action) => {
                state.error = action.payload?.message
                state.loading = false
            })
            .addCase(GetUserById.fulfilled, (state, action) => {
                state.data = action.payload
                state.loading = false
            })
            .addCase(GetUserById.rejected, (state) => {
                state.loading = false
            })
            

            .addCase(UpdateUser.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateUser.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(ChangeUserGroup.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(ChangeUserGroup.rejected, (_, action) => {
                toast.error(action.error.message)
            })

            .addCase(ChangePasswordUser.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(ChangePasswordUser.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            
            .addCase(DeleteUser.fulfilled, () => {
                toast.success("Xóa thành công")
            })
            .addCase(DeleteUser.rejected, (_, action) => {
            
                toast.error(action.error.message)
            })
            .addCase(AdminResetPassword.fulfilled, (state,action) => {
               
                state.loading= false
            })
            .addCase(AdminResetPassword.rejected, (_, action) => {
               
                toast.error(action.error.message)
            })
            .addCase(CreateUserWithDefaultPassword.fulfilled, () => {
                toast.success("Thêm mới người dùng thành công")
            })

            .addCase(CreateUserWithDefaultPassword.rejected, (_, action) => {
               
                toast.error("Thêm mới tài khoản thất bại")
                console.log(action);
                
            })
            // .addCase(GetUserFromCSDLDanCu.fulfilled, (state, action) => {
            //     state.loading = false
            //     const data = action.payload.data
            //     state.userCDSLDanCu = {...data, 
            //         voChong: toCamel(JSON.parse(data.voChong as unknown as string)),
            //         cha: toCamel(JSON.parse(data.cha as unknown as string)),
            //         me: toCamel(JSON.parse(data.me as unknown as string)),
            //         nguoiDaiDien: toCamel(JSON.parse(data.nguoiDaiDien as unknown as string)),
            //         chuHo: toCamel(JSON.parse(data.chuHo as unknown as string)),
            //         noiOHienTai: toCamel(JSON.parse(data.noiOHienTai as unknown as string)),
            //         noiDangKyKhaiSinh: toCamel(JSON.parse(data.noiDangKyKhaiSinh as unknown as string)),
            //         thuongTru: toCamel(JSON.parse(data.thuongTru as unknown as string)),
            //         queQuan: toCamel(JSON.parse(data.queQuan as unknown as string)),
            //     };

            // })
            .addMatcher(isPending(GetUserFromCSDLDanCu, GetUserBySoDinhDanh), (state) =>{
                state.loading = true
            })
            .addMatcher(isFulfilled(GetUserFromCSDLDanCu, GetUserBySoDinhDanh), (state, action) =>{
                state.loading = false
                const data = action.payload.data
                if(data){
                    state.userCDSLDanCu = {...data, 
                        voChong: toCamel(JSON.parse(data.voChong as unknown as string)),
                        cha: toCamel(JSON.parse(data.cha as unknown as string)),
                        me: toCamel(JSON.parse(data.me as unknown as string)),
                        nguoiDaiDien: toCamel(JSON.parse(data.nguoiDaiDien as unknown as string)),
                        chuHo: toCamel(JSON.parse(data.chuHo as unknown as string)),
                        noiOHienTai: toCamel(JSON.parse(data.noiOHienTai as unknown as string)),
                        ngayThangNamSinh: toCamel(JSON.parse(data.ngayThangNamSinh as unknown as string)),
                        noiDangKyKhaiSinh: toCamel(JSON.parse(data.noiDangKyKhaiSinh as unknown as string)),
                        thuongTru: toCamel(JSON.parse(data.thuongTru as unknown as string)),
                        queQuan: toCamel(JSON.parse(data.queQuan as unknown as string)),
                    };
                } else {
                    toast.warn("Định danh không thành công, vui lòng kiểm tra lại thông tin.")
                }
            })
            .addMatcher(isRejectedWithValue(GetUserFromCSDLDanCu), (state, action) => {
                state.loading = false
            })
            .addMatcher(isRejectedWithValue(GetUserBySoDinhDanh), (state, action) => {
                state.loading = false
                toast.error(action.payload.message)
            })
            .addMatcher(isPending(GetUser, GetUserById), (state) => {
                state.loading = true
            })

            .addMatcher(isPending(GetUsersWithDonViQuanLy), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(GetUsersWithDonViQuanLy), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
           

          

    }
})
const { reducer, actions } = Slice

export default reducer

export const { resetData, resetUserCSDLDanCu, setUserData, resetDonViThuTucUsers, toggleLoading, UpdateUserData } = actions;
export const logout = createAction('LOGOUT');