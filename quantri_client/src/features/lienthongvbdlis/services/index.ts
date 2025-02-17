import { Key } from 'antd/es/table/interface';
import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete, IDeleteFiles, IBasePagination, IBaseSearch } from "../../../models";
import { Service } from "../../../services";

import { IPhiLePhi } from "@/features/philephi/models";
import { ITruongHopThuTuc } from "@/features/truonghopthutuc/models";

import { IBanGiaoKetQuaParams, IBanGiaoKetQuaResponse } from '@/pages/dvc/traketqua/chotraketquatthcc/model';
import axiosInstanceFile from '@/lib/axios/fileInstance';
import { ILienThongVBDLIS } from '../models';

export interface ITiepNhanGuiVBDLISParams {
    id: string;
    tinhId: number;
    huyenId: number;
    xaId: number;
}
export interface IBoSungHoSoGuiVBDLISParams {
    maHoSo?: string;
    ngayHenTraMoi?: Date
}
class LienThongVBDLISService extends Service.BaseApi implements Omit<Service.ICrud<ILienThongVBDLIS>, "Delete"> {
    constructor() {
        super("vbdliss")
    }
    Get(_id: string): AxiosResponseWrapper<IResult<ILienThongVBDLIS>> {
        throw new Error('Method not implemented.');
    }
    Create(_data: Partial<Omit<ILienThongVBDLIS, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        throw new Error('Method not implemented.');
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error('Method not implemented.');
    }
    Update(_params: IOmitUpdate<ILienThongVBDLIS>): AxiosResponseWrapper {
        throw new Error('Method not implemented.');
    }
    Search(_params: ILienThongVBDLIS): AxiosResponseWrapper<IPaginationResponse<ILienThongVBDLIS[]>> {
        throw new Error('Method not implemented.');
    }
    TiepNhanGuiVBDLIS(_data: ITiepNhanGuiVBDLISParams): AxiosResponseWrapper<IResult<ILienThongVBDLIS>> {
        return axiosInstance.post(this._urlSuffix + "/TiepNhanGuiVBDLIS", _data)
    }
    BoSungHoSoGuiVBDLIS(_data: IBoSungHoSoGuiVBDLISParams): AxiosResponseWrapper<IResult<ILienThongVBDLIS>> {
        return axiosInstance.post(this._urlSuffix + "/CapNhatTrangThaiBoSungHoSoGuiVBDLIS", _data)
    }
}

export const lienThongVBDLISApi = new LienThongVBDLISService()