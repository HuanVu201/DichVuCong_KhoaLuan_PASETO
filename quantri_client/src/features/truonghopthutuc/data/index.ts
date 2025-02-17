import { AntdSelectProps } from "@/lib/antd/components"
import { SelectProps } from "antd"

export const getLoaiThoiGianLamViec = (type: string) => {
    if(type ==="Ngày làm việc"){
        return "Ngày làm việc"
    }
    else{
        return "Ngày"
    }
}

export const LOAITHOIGIANTHUCHIEN_OPTIONS: AntdSelectProps<never>["options"] = [
    { label: "Ngày làm việc", value: "Ngày làm việc" },
    { label: "Ngày", value: "Ngày" },
]
export const LOAIDULIEUKETNOI_QUYTRINH_OPTIONS: AntdSelectProps<never>["options"] = [
    { label: "Liên thông ILIS", value: "LienThongThueILIS" },
]

export const BATBUOCDINHKEM_OPTIONS: SelectProps["options"] = [
    { label: "Có", value: true as any },
    { label: "Không", value: false },
]

export const YEUCAUNOPTRUCTUYEN_OPTIONS: SelectProps["options"] = [
    { label: "Có", value: true as any },
    { label: "Không", value: false },
]
export const KHONGCONGAYHENTRA_OPTIONS: SelectProps["options"] = [
    { label: "Có", value: true as any },
    { label: "Không", value: false },
]

export const CHOCHUYENPHIDIAGIOI_OPTIONS: SelectProps["options"] = [
    { label: "Có", value: true as any },
    { label: "Không", value: false },
]
export const LOAIBAOTROXAHOI_OPTIONS: SelectProps["options"] = [
    { label: "Hỗ trợ mai táng phí", value: "HoTroMaiTangPhi" },
    { label: "Thôi hưởng trợ cấp xã hội", value: "ThoiHuongTroCapXaHoi" },
]

export const KHONGTHUBANGIAY_OPTIONS: SelectProps["options"] = [
    { label: "Có", value: true as any },
    { label: "Không", value: false },
]

export const KHONGNOPTRUCTUYEN_OPTIONS: SelectProps["options"] = [
    { label: "Không nộp", value: true as any },
    { label: "Có nộp", value: false },
]

export const LOAIDULIEUKETNOI_OPTIONS: SelectProps["options"] = [
    { label: "Bằng ô tô", value: "DoiGPLXOto" },
    { label: "Bằng xe máy", value: "DoiGPLXXeMay" },
    { label: "VNeId LLTP", value: "LLTPVneid" },
    { label: "VNeId LLTP ủy quyền", value: "LLTPVneidUyQuyen" },
]