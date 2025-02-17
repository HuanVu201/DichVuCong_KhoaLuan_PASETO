import axiosInstance, { parseParams } from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { IGetDanhSachNguoiTraKetQua, INguoiDungNhomNguoiDung, ISearchNguoiDungNhomNguoiDung, ISearchUserNotInNhom } from "../models";
import { IUser } from "@/features/user/models";

class NguoiDungNhomNguoiDungService extends Service.BaseApi implements Service.ICrud<INguoiDungNhomNguoiDung>{
    constructor(){
        super("nguoidungnhomnguoidungs")
    }
    Search(_params: ISearchNguoiDungNhomNguoiDung): AxiosResponseWrapper<IPaginationResponse<INguoiDungNhomNguoiDung[]>> {
        return axiosInstance.get(this._urlSuffix, {params: _params, paramsSerializer: p=>{
            return parseParams(p);
        }})
    }
    DanhSachNguoiTraKetQua(params: IGetDanhSachNguoiTraKetQua): AxiosResponseWrapper<IPaginationResponse<INguoiDungNhomNguoiDung[]>> {
        return axiosInstance.get(this._urlSuffix + "/DanhSachNguoiTraKetQua", {params});
    }
    SearchUserNotInNhom(params: ISearchUserNotInNhom): AxiosResponseWrapper<IPaginationResponse<IUser[]>> {
        return axiosInstance.get(this._urlSuffix + "/usernotinnhom", {params});
    }
    Get(_id: string): AxiosResponseWrapper<IResult<INguoiDungNhomNguoiDung>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<INguoiDungNhomNguoiDung, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    CreateRange(data: {taiKhoans: string[], nhomNguoiDungId: string}):AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix + "/AddList", data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, {data: {forceDelete: _params.forceDelete}})
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<INguoiDungNhomNguoiDung>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
}

export const nguoiDungnhomNguoiDungApi = new NguoiDungNhomNguoiDungService()