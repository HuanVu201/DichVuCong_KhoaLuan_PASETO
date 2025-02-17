import { AntdSelectProps } from "@/lib/antd/components"
import { SelectProps } from "antd"

export const getLoaiThoiGianLamViec = (type: string) => {
    if(type ==="ngay-lam-viec"){
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

export const BATBUOCDINHKEM_OPTIONS: SelectProps["options"] = [
    { label: "Có", value: true as any },
    { label: "Không", value: false },
]

export const YEUCAUNOPTRUCTUYEN_OPTIONS: SelectProps["options"] = [
    { label: "Có", value: true as any },
    { label: "Không", value: false },
]