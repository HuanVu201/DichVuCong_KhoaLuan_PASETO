import { TRANGTHAIHOSO } from "@/features/hoso/data/formData"
import { NhacViecResponse } from "@/features/thongKe/thongKeHoSoTrucTuyen/models/TiepNhanHoSoTrucTuyen"
import { Service } from "@/services"
import { Badge } from "antd"
import { Link } from "react-router-dom"




const {primaryRoutes} = Service

export const nhacViecMapper: Record<string, keyof NhacViecResponse> = {
    [primaryRoutes.dvc.tiepNhanHoSo.moiTiepNhan]: "duocTiepNhan",
    [primaryRoutes.dvc.tiepNhanHoSo.choTiepNhanTrucTuyen]: "moiDangKy",
    [primaryRoutes.dvc.tiepNhanHoSo.daChuyenXuLy]: "daChuyenXuLy",
    [primaryRoutes.dvc.tiepNhanHoSo.tuChoiTiepNhan]: "khongDuocTiepNhan",
    [primaryRoutes.dvc.boSungHoSo.yeuCauBoSung]: "choMotCuaBoSung",
    [primaryRoutes.dvc.boSungHoSo.choBoSung]: "choCongDanBoSung",
    [primaryRoutes.dvc.boSungHoSo.daBoSung]: "daGuiBoSung",
    [primaryRoutes.dvc.boSungHoSo.daHoanThanhBoSung]: "hoanThanhBoSung",
    [primaryRoutes.dvc.theoDoiHoSo.hoSoQuaHan]: "hoSoQuaHan",
    [primaryRoutes.dvc.theoDoiHoSo.hoSoToiHan]: "hoSoToiHan",
    [primaryRoutes.dvc.xuLyHoSo.dangXuLy]: "dangXuLy",
    [primaryRoutes.dvc.xuLyHoSo.dungXuLy]: "dungXuLy",
    [primaryRoutes.dvc.xuLyHoSo.yeuCauThucHienNghiaVuTaiChinh]: "yeuCauThucHienNghiaVuTaiChinh",
    [primaryRoutes.dvc.xuLyHoSo.daChuyenXuLy]: "daChuyenXuLy",
    [primaryRoutes.dvc.xuLyHoSo.daChuyenCoKetQua]: "daChuyenXuLyCoKetQua",
    [primaryRoutes.dvc.traKetQua.choTraTrucTuyen]: "choTraTrucTuyen",
    [primaryRoutes.dvc.traKetQua.choTraTrucTiep]: "choTraTrucTiep",
    [primaryRoutes.dvc.traKetQua.choTraBCCI]: "choTraBCCI",
}
export type NhacViecLinkResponseKey = Extract<keyof NhacViecResponse, "duocTiepNhan" | "moiDangKy" | "choTraTrucTuyen" | "choTraTrucTiep" | "choTraBCCI" | "choCongDanBoSung" | "dangXuLy" | "dungXuLy" | "yeuCauThucHienNghiaVuTaiChinh">
export const nhacViecLinkMapper: Record<NhacViecLinkResponseKey, string> = {
    "duocTiepNhan": primaryRoutes.dvc.tiepNhanHoSo.moiTiepNhan,
    "moiDangKy": primaryRoutes.dvc.tiepNhanHoSo.choTiepNhanTrucTuyen,
    "choCongDanBoSung": primaryRoutes.dvc.boSungHoSo.choBoSung,
    "choTraTrucTuyen": primaryRoutes.dvc.traKetQua.choTraTrucTuyen,
    "choTraTrucTiep": primaryRoutes.dvc.traKetQua.choTraTrucTiep,
    "choTraBCCI": primaryRoutes.dvc.traKetQua.choTraBCCI,
    "dangXuLy": primaryRoutes.dvc.xuLyHoSo.dangXuLy,
    "dungXuLy": primaryRoutes.dvc.xuLyHoSo.dungXuLy,
    "yeuCauThucHienNghiaVuTaiChinh": primaryRoutes.dvc.xuLyHoSo.yeuCauThucHienNghiaVuTaiChinh,
}

const getLabel = (value: string, suffix: string, link: string) => {
    return <Link to={link}><Badge count={+value} showZero color='#2C62B9' overflowCount={9999}/> <span style={{fontWeight:600}}>{suffix}</span></Link>
}

export const nhacViecLabelMapper :Record<NhacViecLinkResponseKey, (value: string) => JSX.Element> = {
    "duocTiepNhan": (value: string) => getLabel(value, "Hồ sơ mới tiếp nhận", primaryRoutes.dvc.tiepNhanHoSo.moiTiepNhan),
    "moiDangKy": (value: string) => getLabel(value, "Hồ sơ chờ tiếp nhận trực tuyến", primaryRoutes.dvc.tiepNhanHoSo.choTiepNhanTrucTuyen),
    "choCongDanBoSung": (value: string) => getLabel(value, "Hồ sơ chờ bổ sung", primaryRoutes.dvc.boSungHoSo.choBoSung),
    "choTraTrucTuyen": (value: string) => getLabel(value, "Hồ sơ chờ trả trực tuyến", primaryRoutes.dvc.traKetQua.choTraTrucTuyen),
    "choTraTrucTiep": (value: string) => getLabel(value, "Hồ sơ chờ trả trực tiếp", primaryRoutes.dvc.traKetQua.choTraTrucTiep),
    "choTraBCCI": (value: string) => getLabel(value, "Hồ sơ chờ trả BCCI", primaryRoutes.dvc.traKetQua.choTraBCCI),
    "dangXuLy": (value: string) => getLabel(value, "Hồ sơ đang xử lý", primaryRoutes.dvc.xuLyHoSo.dangXuLy),
    "dungXuLy": (value: string) => getLabel(value, "Hồ sơ dừng xử lý", primaryRoutes.dvc.xuLyHoSo.dungXuLy),
    "yeuCauThucHienNghiaVuTaiChinh": (value: string) => getLabel(value, "Yêu cầu thực hiện nghĩa vụ tài chính", primaryRoutes.dvc.xuLyHoSo.yeuCauThucHienNghiaVuTaiChinh),
}