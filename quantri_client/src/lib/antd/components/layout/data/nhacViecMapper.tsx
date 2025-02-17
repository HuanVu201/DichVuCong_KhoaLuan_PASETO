import { TRANGTHAIHOSO } from "@/features/hoso/data/formData"
import { NhacViecResponse } from "@/features/thongKe/thongKeHoSoTrucTuyen/models/TiepNhanHoSoTrucTuyen"
import { Service } from "@/services"
import { Badge } from "antd"
import { Link } from "react-router-dom"




const { primaryRoutes } = Service

export const nhacViecMapper: Record<string, keyof NhacViecResponse> = {
    [primaryRoutes.dvc.tiepNhanHoSo.moiTiepNhan]: "duocTiepNhan",
    [primaryRoutes.dvc.tiepNhanHoSo.choTiepNhanTrucTuyen]: "moiDangKy",
    [primaryRoutes.dvc.xuLyHoSo.dangXuLyLienThong]: "dangXuLy",
    [primaryRoutes.dvc.hoSoPhiDiaGioi.tiepNhan]: "tiepNhanPhiDiaGioi",
    // [primaryRoutes.dvc.tiepNhanHoSo.daChuyenXuLy]: "daChuyenXuLy",
    // [primaryRoutes.dvc.tiepNhanHoSo.tuChoiTiepNhan]: "khongDuocTiepNhan",
    [primaryRoutes.dvc.boSungHoSo.yeuCauBoSung]: "choMotCuaBoSung",
    [primaryRoutes.dvc.boSungHoSo.choBoSung]: "choCongDanBoSung",
    // [primaryRoutes.dvc.boSungHoSo.daBoSung]: "daGuiBoSung",
    // [primaryRoutes.dvc.boSungHoSo.daHoanThanhBoSung]: "hoanThanhBoSung",
    [primaryRoutes.dvc.theoDoiHoSoTN.hoSoQuaHan]: "hoSoQuaHan",
    [primaryRoutes.dvc.theoDoiHoSoTN.hoSoToiHan]: "hoSoToiHan",
    // [primaryRoutes.dvc.theoDoiHoSo.hoSoToiHan]: "hoSoToiHan",
    // [primaryRoutes.dvc.theoDoiHoSo.hoSoQuaHan]: "hoSoQuaHan",
    [primaryRoutes.dvc.xuLyHoSo.dangXuLy]: "dangXuLy",
    [primaryRoutes.dvc.xuLyHoSo.dungXuLy]: "dungXuLy",
    [primaryRoutes.dvc.xuLyHoSo.yeuCauThucHienNghiaVuTaiChinh]: "yeuCauThucHienNghiaVuTaiChinh",
    // [primaryRoutes.dvc.xuLyHoSo.daChuyenXuLy]: "daChuyenXuLy",
    // [primaryRoutes.dvc.xuLyHoSo.daChuyenCoKetQua]: "daChuyenXuLyCoKetQua",
    // [primaryRoutes.dvc.traKetQua.choTraTrucTuyen]: "choTraTrucTuyen",
    [primaryRoutes.dvc.traKetQua.choTraKetQua]: "choTraKetQua",
    [primaryRoutes.dvc.traKetQua.choTraBCCI]: "choTraBCCI",
    [primaryRoutes.dvc.traKetQua.choTraBCCITTHCC]: "choTraBCCITTHCC",
    // [primaryRoutes.dvc.boSungHoSo.daBoSung]: "daGuiBoSung",
    [primaryRoutes.dvc.chungThuc.choTiepNhanTrucTuyen]: "moiDangKyChungThuc",
    [primaryRoutes.dvc.chungThuc.moiTiepNhan]: "duocTiepNhanChungThuc",
    [primaryRoutes.dvc.chungThuc.dangXuLy]: "dangXuLyChungThuc",
    [primaryRoutes.dvc.chungThuc.choTraKetQua]: "choTraKetQuaChungThuc",

    [primaryRoutes.dvc.duThaoXuLyHoSo.xinLoiChoDuyetThongQua]: "duThaoXinLoiChoThongQua",
    [primaryRoutes.dvc.duThaoXuLyHoSo.boSungChoDuyetThongQua]: "duThaoBoSungChoThongQua",
    [primaryRoutes.dvc.duThaoXuLyHoSo.traLaiXinRutChoDuyetThongQua]: "duThaoTraLaiXinRutChoThongQua",
}
export type NhacViecLinkResponseKey = Extract<keyof NhacViecResponse,  "tiepNhanPhiDiaGioi" | "choTraKetQuaChungThuc" | "choTraBCCITTHCC" | "moiDangKyChungThuc" | "duocTiepNhanChungThuc" | "dangXuLyChungThuc" | "daGuiBoSung" | "duocTiepNhan" | "moiDangKy" | "choTraKetQua" | "choTraBCCI" | "choCongDanBoSung" | "dangXuLy" | "dungXuLy" | "yeuCauThucHienNghiaVuTaiChinh" | "hoSoQuaHan" | "hoSoToiHan" | "daChuyenXuLy" | "daChuyenXuLyCoKetQua" | "choMotCuaBoSung" | "khongDuocTiepNhan" | "hoanThanhBoSung" | "congDanYeuCauRutHoSo" | "duThaoXinLoiChoThongQua" | "duThaoBoSungChoThongQua" | "duThaoTraLaiXinRutChoThongQua">

export const nhacViecLinkMapper: Record<NhacViecLinkResponseKey, string> = {
    "duocTiepNhan": primaryRoutes.dvc.tiepNhanHoSo.moiTiepNhan,
    "tiepNhanPhiDiaGioi": primaryRoutes.dvc.hoSoPhiDiaGioi.dangXuLy,
    "moiDangKy": primaryRoutes.dvc.tiepNhanHoSo.choTiepNhanTrucTuyen,
    "choCongDanBoSung": primaryRoutes.dvc.boSungHoSo.choBoSung,
    "choTraKetQua": primaryRoutes.dvc.traKetQua.choTraTrucTuyen,
    // "choTraTrucTiep": primaryRoutes.dvc.traKetQua.choTraTrucTiep,
    "choTraBCCI": primaryRoutes.dvc.traKetQua.choTraBCCI,
    "dangXuLy": primaryRoutes.dvc.xuLyHoSo.dangXuLy,
    "dungXuLy": primaryRoutes.dvc.xuLyHoSo.dungXuLy,
    "daChuyenXuLy": primaryRoutes.dvc.xuLyHoSo.daChuyenXuLy,
    "yeuCauThucHienNghiaVuTaiChinh": primaryRoutes.dvc.xuLyHoSo.yeuCauThucHienNghiaVuTaiChinh,
    "hoSoQuaHan": primaryRoutes.dvc.theoDoiHoSoTN.hoSoQuaHan,
    "hoSoToiHan": primaryRoutes.dvc.theoDoiHoSoTN.hoSoToiHan,
    "daChuyenXuLyCoKetQua": primaryRoutes.dvc.xuLyHoSo.daChuyenCoKetQua,
    "choMotCuaBoSung": primaryRoutes.dvc.boSungHoSo.yeuCauBoSung,
    "khongDuocTiepNhan": primaryRoutes.dvc.tiepNhanHoSo.tuChoiTiepNhan,
    "hoanThanhBoSung": primaryRoutes.dvc.boSungHoSo.daHoanThanhBoSung,
    "congDanYeuCauRutHoSo": primaryRoutes.dvc.traKetQua.xinRut,
    "daGuiBoSung": primaryRoutes.dvc.boSungHoSo.daBoSung,
    "moiDangKyChungThuc": primaryRoutes.dvc.chungThuc.choTiepNhanTrucTuyen,
    "duocTiepNhanChungThuc": primaryRoutes.dvc.chungThuc.moiTiepNhan,
    "dangXuLyChungThuc": primaryRoutes.dvc.chungThuc.dangXuLy,
    "choTraKetQuaChungThuc": primaryRoutes.dvc.chungThuc.choTraKetQua,
    "choTraBCCITTHCC": primaryRoutes.dvc.traKetQua.choTraBCCITTHCC,
    "duThaoXinLoiChoThongQua": primaryRoutes.dvc.duThaoXuLyHoSo.xinLoiChoDuyetThongQua,
    "duThaoBoSungChoThongQua": primaryRoutes.dvc.duThaoXuLyHoSo.boSungChoDuyetThongQua,
    "duThaoTraLaiXinRutChoThongQua": primaryRoutes.dvc.duThaoXuLyHoSo.traLaiXinRutChoDuyetThongQua,
}

const getLabel = (value: string, suffix: string, link: string) => {
    return <Link to={link}><Badge count={+value} showZero color='#2C62B9' overflowCount={9999} /> <span style={{ fontWeight: 600 }}>{suffix}</span></Link>
}

export const nhacViecLabelMapper: Record<NhacViecLinkResponseKey, (value: string) => JSX.Element> = {
    "duocTiepNhan": (value: string) => getLabel(value, "Hồ sơ mới tiếp nhận", primaryRoutes.dvc.tiepNhanHoSo.moiTiepNhan),
    "tiepNhanPhiDiaGioi": (value: string) => getLabel(value, "Hồ sơ phi địa giới mới tiếp nhận", primaryRoutes.dvc.hoSoPhiDiaGioi.tiepNhan),
    "moiDangKy": (value: string) => getLabel(value, "Hồ sơ chờ tiếp nhận trực tuyến", primaryRoutes.dvc.tiepNhanHoSo.choTiepNhanTrucTuyen),
    "choCongDanBoSung": (value: string) => getLabel(value, "Hồ sơ chờ bổ sung", primaryRoutes.dvc.boSungHoSo.choBoSung),
    // "choTraTrucTuyen": (value: string) => getLabel(value, "Hồ sơ chờ trả trực tuyến", primaryRoutes.dvc.traKetQua.choTraTrucTuyen),
    // "choTraTrucTiep": (value: string) => getLabel(value, "Hồ sơ chờ trả trực tiếp", primaryRoutes.dvc.traKetQua.choTraTrucTiep),
    "choTraKetQua": (value: string) => getLabel(value, "Hồ sơ chờ trả kết quả", primaryRoutes.dvc.traKetQua.choTraKetQua),
    "choTraBCCI": (value: string) => getLabel(value, "Hồ sơ chờ trả BCCI", primaryRoutes.dvc.traKetQua.choTraBCCI),
    "dangXuLy": (value: string) => getLabel(value, "Hồ sơ đang xử lý", primaryRoutes.dvc.xuLyHoSo.dangXuLy),
    "dungXuLy": (value: string) => getLabel(value, "Hồ sơ dừng xử lý", primaryRoutes.dvc.xuLyHoSo.dungXuLy),
    "hoSoToiHan": (value: string) => getLabel(value, "Hồ sơ tới hạn", primaryRoutes.dvc.theoDoiHoSoTN.hoSoToiHan),
    "hoSoQuaHan": (value: string) => getLabel(value, "Hồ sơ quá hạn", primaryRoutes.dvc.theoDoiHoSoTN.hoSoQuaHan),
    "daChuyenXuLy": (value: string) => getLabel(value, "Hồ sơ đã chuyển xử lý", primaryRoutes.dvc.xuLyHoSo.daChuyenXuLy),
    "yeuCauThucHienNghiaVuTaiChinh": (value: string) => getLabel(value, "Yêu cầu thực hiện nghĩa vụ tài chính", primaryRoutes.dvc.xuLyHoSo.yeuCauThucHienNghiaVuTaiChinh),
    "daChuyenXuLyCoKetQua": (value: string) => getLabel(value, "Hồ sơ đã chuyển xử lý có kết quả", primaryRoutes.dvc.xuLyHoSo.daChuyenCoKetQua),
    "choMotCuaBoSung": (value: string) => getLabel(value, "Hồ sơ chờ một cửa bổ sung", primaryRoutes.dvc.boSungHoSo.yeuCauBoSung),
    "khongDuocTiepNhan": (value: string) => getLabel(value, "Hồ sơ không được tiếp nhận", primaryRoutes.dvc.tiepNhanHoSo.tuChoiTiepNhan),
    "congDanYeuCauRutHoSo": (value: string) => getLabel(value, "Công dân yêu cầu rút hồ sơ", primaryRoutes.dvc.traKetQua.xinRut),
    "hoanThanhBoSung": (value: string) => getLabel(value, "Hồ sơ đã hoàn thành bổ sung", primaryRoutes.dvc.traKetQua.xinRut),
    "daGuiBoSung": (value: string) => getLabel(value, "Hồ sơ đã gửi bổ sung", primaryRoutes.dvc.boSungHoSo.daBoSung),
    "duocTiepNhanChungThuc": (value: string) => getLabel(value, "Hồ sơ chứng thực mới tiếp nhận", primaryRoutes.dvc.chungThuc.moiTiepNhan),
    "moiDangKyChungThuc": (value: string) => getLabel(value, "Hồ sơ chứng thực chờ tiếp nhận trực tuyến", primaryRoutes.dvc.chungThuc.choTiepNhanTrucTuyen),
    "dangXuLyChungThuc": (value: string) => getLabel(value, "Hồ sơ chứng thực đang xử lý", primaryRoutes.dvc.chungThuc.dangXuLy),
    "choTraKetQuaChungThuc": (value: string) => getLabel(value, "Hồ sơ chứng thực chờ trả kết quả", primaryRoutes.dvc.chungThuc.choTraKetQua),
    "choTraBCCITTHCC": (value: string) => getLabel(value, "Hồ sơ chờ trả BCCI tại TTHCC", primaryRoutes.dvc.traKetQua.choTraBCCITTHCC),

    "duThaoXinLoiChoThongQua": (value: string) => getLabel(value, "Dự thảo xin lỗi chờ duyệt thông qua", primaryRoutes.dvc.duThaoXuLyHoSo.xinLoiChoDuyetThongQua),
    "duThaoBoSungChoThongQua": (value: string) => getLabel(value, "DỰ thảo bổ sung chờ duyệt thông qua", primaryRoutes.dvc.duThaoXuLyHoSo.boSungChoDuyetThongQua),
    "duThaoTraLaiXinRutChoThongQua": (value: string) => getLabel(value, "Dự thảo trả lại/xin rút chờ duyệt thông qua", primaryRoutes.dvc.duThaoXuLyHoSo.traLaiXinRutChoDuyetThongQua),
}