import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { ITraCuuHopTacXa, ISearchTraCuuHopTacXa } from "../models";

class TraCuuHopTacXaService extends Service.BaseApi implements Service.ICrud<ITraCuuHopTacXa> {
    constructor() {
        super("tracuuhoptacxas")
    }
    Search(_params: IPickSearch<ITraCuuHopTacXa, "maSoDoanhNghiep">): AxiosResponseWrapper<IPaginationResponse<ITraCuuHopTacXa[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<ITraCuuHopTacXa>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<ITraCuuHopTacXa, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<ITraCuuHopTacXa>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
    SearchTheoDonVi(_params: ISearchTraCuuHopTacXa): AxiosResponseWrapper<IPaginationResponse<ITraCuuHopTacXa[]>> {
        return axiosInstance.get(this._urlSuffix + "/SearchTheoDonVi", { params: _params })
    }
}

export const traCuuHopTacXaApi = new TraCuuHopTacXaService()