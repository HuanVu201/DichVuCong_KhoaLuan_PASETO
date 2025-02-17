import { TRANGTHAIHOSO } from "@/features/hoso/data/formData"
import { NhacViecResponse } from "@/features/thongKe/thongKeHoSoTrucTuyen/models/TiepNhanHoSoTrucTuyen"
import { Service } from "@/services"
import { Badge } from "antd"
import { Link } from "react-router-dom"




const { primaryRoutes } = Service

export const nhacViecPortalMapper: Record<string, keyof NhacViecResponse> = {
    [primaryRoutes.portaldvc.hosocanhan.dichVuCongCuaToi + "?query=duoc-tiep-nhan"]: "duocTiepNhan",
    [primaryRoutes.portaldvc.hosocanhan.thanhToanPhiLePhi]: "choThanhToan",
    [primaryRoutes.portaldvc.hosocanhan.dichVuCongCuaToi + "?query=khong-duoc-tiep-nhan"]: "khongDuocTiepNhan",
    [primaryRoutes.portaldvc.hosocanhan.dichVuCongCuaToi + "?query=bo-sung-ho-so"]: "yeuCauBoSung",
    [primaryRoutes.portaldvc.hosocanhan.dichVuCongCuaToi + "?query=da-co-ket-qua"]: "daCoKetQua",
}
export type NhacViecLinkPortalResponseKey = Extract<keyof NhacViecResponse, "duocTiepNhan" | "choThanhToan" | "khongDuocTiepNhan" | "yeuCauBoSung" | "daCoKetQua">
export const nhacViecLinkPortalMapper: Record<NhacViecLinkPortalResponseKey, string> = {
    "duocTiepNhan": primaryRoutes.portaldvc.hosocanhan.dichVuCongCuaToi + "?query=duoc-tiep-nhan",
    "choThanhToan": primaryRoutes.portaldvc.hosocanhan.thanhToanPhiLePhi,
    "khongDuocTiepNhan": primaryRoutes.portaldvc.hosocanhan.dichVuCongCuaToi + "?query=khong-duoc-tiep-nhan",
    "yeuCauBoSung": primaryRoutes.portaldvc.hosocanhan.dichVuCongCuaToi + "?query=bo-sung-ho-so",
    "daCoKetQua": primaryRoutes.portaldvc.hosocanhan.dichVuCongCuaToi + "?query=da-co-ket-qua"
}

const getLabel = (value: string, suffix: string, link: string, query: string) => {
    return <Link to={link + query}><Badge count={+value} showZero color='red' overflowCount={9999} /> <span style={{ fontWeight: 600 }}>{suffix}</span></Link>
}

export const nhacViecLabelPortalMapper: Record<NhacViecLinkPortalResponseKey, (value: string) => JSX.Element> = {
    "duocTiepNhan": (value: string) => getLabel(value, "Hồ sơ mới tiếp nhận", primaryRoutes.portaldvc.hosocanhan.dichVuCongCuaToi, "?query=duoc-tiep-nhan"),
    "choThanhToan": (value: string) => getLabel(value, "Hồ sơ chờ thanh toán", primaryRoutes.portaldvc.hosocanhan.thanhToanPhiLePhi, ""),
    "khongDuocTiepNhan": (value: string) => getLabel(value, "Hồ sơ không được tiếp nhận", primaryRoutes.portaldvc.hosocanhan.dichVuCongCuaToi, "?query=khong-duoc-tiep-nhan"),
    "yeuCauBoSung": (value: string) => getLabel(value, "Hồ sơ yêu cầu bổ sung", primaryRoutes.portaldvc.hosocanhan.dichVuCongCuaToi, "?query=bo-sung-ho-so"),
    "daCoKetQua": (value: string) => getLabel(value, "Hồ sơ đã có kết quả", primaryRoutes.portaldvc.hosocanhan.dichVuCongCuaToi, "?query=da-co-ket-qua"),
}