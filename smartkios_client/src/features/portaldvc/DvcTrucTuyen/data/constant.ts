import { ISearchThuTuc } from "@/features/thutuc/models";
import { Service } from "@/services";
type RenderDVCRouteParams = {maTTHC?: string;donVi?: string; maTinh?: string;maHuyen?:string;maXa?:string; truongHopId?: string; capThucHien?:string; maLinhVucChinh?:string; pageSize?:string; pageNumber?:string; tuKhoa?: string}
export const renderDVCRouteParams = (params: RenderDVCRouteParams, route: string = Service.primaryRoutes.portaldvc.dvcTrucTuyen): string => {
    const searchParams = new URLSearchParams(params)
    return route + '?' + searchParams.toString()
}