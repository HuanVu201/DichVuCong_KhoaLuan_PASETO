import { ISearchBaoCaoThuTuc, ISearchBaoCaoTongHopThanhToan } from './../model/index';
import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { Service } from "../../../services";
import { IBaoCaoDonVi, ISearchBaoCaoDonVi } from "../model";
import { BaoCaoNguoiNopHoSoResponse, BaoCaoTongHopResponse, ITongHopHoSoTheoTrangThaiResponse, ThongKeThuTucPhatSinhHoSoResponse, TongHopThanhToanResponse } from '../redux/action';
import { ThongKeHSLTParams } from '@/features/hoso/services';
import { IThongKeHoSoTiepNhanBuuChinh } from '@/features/hoso/models';
import { TongHopHoSoTheoTrangThaiResponse } from '@/features/thongKe/ThongKeTheoDonVi/models/TongHopHoSoTheoTrangThaiResponse';

class BaoCaoTongHopService extends Service.BaseApi {
    constructor() {
        super("baocaotonghops")
    }
    BaoCaoTongHopDonVi(data: ISearchBaoCaoDonVi): AxiosResponseWrapper<BaoCaoTongHopResponse> {
        return axiosInstance.post(this._urlSuffix + "/donvi", data)
    }
    BaoCaoTongHopTheoTruongHop(data: ISearchBaoCaoDonVi): AxiosResponseWrapper<BaoCaoTongHopResponse> {
        return axiosInstance.post(this._urlSuffix + "/TruongHop", data)
    }
    BaoCaoTongHopThuTuc(data: ISearchBaoCaoThuTuc): AxiosResponseWrapper<BaoCaoTongHopResponse> {
        return axiosInstance.post(this._urlSuffix + "/ThuTuc", data)
    }
    BaoCaoTongHopThuTucTheoDonVi(data: ISearchBaoCaoThuTuc): AxiosResponseWrapper<BaoCaoTongHopResponse> {
        return axiosInstance.post(this._urlSuffix + "/ThuTucTheoDonVi", data)
    }
    BaoCaoTongHopLinhVuc(data: ISearchBaoCaoThuTuc): AxiosResponseWrapper<BaoCaoTongHopResponse> {
        return axiosInstance.post(this._urlSuffix + "/linhvuc", data)
    }
    BaoCaoDonViLinhVuc(data: ISearchBaoCaoThuTuc): AxiosResponseWrapper<BaoCaoTongHopResponse> {
        return axiosInstance.post(this._urlSuffix + "/linhvuctheodonvi", data)
    }
    BaoCaoTongHop06a(data: ISearchBaoCaoThuTuc): AxiosResponseWrapper<BaoCaoTongHopResponse> {
        return axiosInstance.post(this._urlSuffix + "/BaoCao06a", data)
    }
    BaoCaoTongHop07b(data: ISearchBaoCaoThuTuc): AxiosResponseWrapper<BaoCaoTongHopResponse> {
        return axiosInstance.post(this._urlSuffix + "/BaoCao07b", data)
    }
    BaoCaoTongHop06aCacCap(data: ISearchBaoCaoThuTuc): AxiosResponseWrapper<BaoCaoTongHopResponse> {
        return axiosInstance.post(this._urlSuffix + "/BaoCao06CacCap", data)
    }
    BaoCaoTongHop07a(data: ISearchBaoCaoThuTuc): AxiosResponseWrapper<BaoCaoTongHopResponse> {
        return axiosInstance.post(this._urlSuffix + "/BaoCao07a", data)
    }
    BaoCaoTongHopTraCuuCSDLDanCu(data: ISearchBaoCaoThuTuc): AxiosResponseWrapper<BaoCaoTongHopResponse> {
        return axiosInstance.post(this._urlSuffix + "/SoLuongTruyCapCSDLDanCu", data)
    }
    BaoCaoNguoiNopHoSo(data: ISearchBaoCaoThuTuc): AxiosResponseWrapper<BaoCaoNguoiNopHoSoResponse> {
        return axiosInstance.post(this._urlSuffix + "/nguoinophoso", data)
    }
    TongHopThanhToanTheoDonVi(data: ISearchBaoCaoTongHopThanhToan): AxiosResponseWrapper<TongHopThanhToanResponse> {
        return axiosInstance.post(this._urlSuffix + "/thanhtoan/theodonvi", data)
    }
    ThongKeThuTucPhatSinhHoSo(data: ISearchBaoCaoThuTuc): AxiosResponseWrapper<ThongKeThuTucPhatSinhHoSoResponse> {
        return axiosInstance.post(this._urlSuffix + "/TongHopThuTuc/PhatSinhHoSo", data)
    }
    BaoCaoHoSoNopTuCongDVC(data: ISearchBaoCaoDonVi): AxiosResponseWrapper<BaoCaoTongHopResponse> {
        return axiosInstance.post(this._urlSuffix + "/HoSoNopTuCongDVC", data)
    }
    ThongKeTiepNhanHoSoBuuChinh(_params: ThongKeHSLTParams): AxiosResponseWrapper<IPaginationResponse<IThongKeHoSoTiepNhanBuuChinh[]>> {
        return axiosInstance.get(this._urlSuffix + "/tiepnhanbuuchinh", {
            params: _params, paramsSerializer: {
                indexes: null // by default: false
            }
        })
    }
    BaoCaoTheoTrangThaiHoSo(data: ISearchBaoCaoDonVi): AxiosResponseWrapper<ITongHopHoSoTheoTrangThaiResponse> {
        return axiosInstance.post(this._urlSuffix + "/TongHopTheoTrangThai", data)
    }
}

export const baoCaoTongHopApi = new BaoCaoTongHopService()