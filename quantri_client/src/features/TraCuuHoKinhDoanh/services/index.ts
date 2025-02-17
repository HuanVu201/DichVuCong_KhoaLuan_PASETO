import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { ITraCuuHoKinhDoanh, ISearchTraCuuHoKinhDoanh } from "../models";

class TraCuuHoKinhDoanhService extends Service.BaseApi implements Service.ICrud<ITraCuuHoKinhDoanh> {
    constructor() {
        super("tracuuhokinhdoanhs")
    }
    Search(_params: IPickSearch<ITraCuuHoKinhDoanh, "maSoHKD">): AxiosResponseWrapper<IPaginationResponse<ITraCuuHoKinhDoanh[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<ITraCuuHoKinhDoanh>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<ITraCuuHoKinhDoanh, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<ITraCuuHoKinhDoanh>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    SearchTheoDonVi(_params: ISearchTraCuuHoKinhDoanh): AxiosResponseWrapper<IPaginationResponse<ITraCuuHoKinhDoanh[]>> {
        return axiosInstance.get(this._urlSuffix + "/SearchTheoDonVi", { params: _params })
    }
}

export const traCuuHoKinhDoanhApi = new TraCuuHoKinhDoanhService()