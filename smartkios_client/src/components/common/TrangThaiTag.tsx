import { TRANGTHAIHOSO, TRANGTHAISOHOA, TRANGTHAISOHOA_CONST_VALUE, TRANGTHAISOHOA_TYPE, TRANGTHAISOHOA_VALUE } from "@/features/hoso/data/formData"

import { Tag, TagProps } from "antd"

export const TrangThaiTag = (trangThai: string) => {
    const warnIds = ["5", "6", "8"]
    const dangerIds = ["3"]
    const greenIds = ["1", "2", "4", "7","9","10"]
    return <Tag color={greenIds.includes(trangThai) ? "green" : warnIds.includes(trangThai) ? "gold" : dangerIds.includes(trangThai) ? "red" : "default" }>
        {(TRANGTHAIHOSO as any)[trangThai]}
    </Tag>
}
export const TrangThaiSoHoaTag = ({trangThai}: {trangThai: TRANGTHAISOHOA_CONST_VALUE}) => {
    const mapper : Record<string, TagProps["color"]>= {
        [TRANGTHAISOHOA["Chưa số hóa"]] : "cyan",
        [TRANGTHAISOHOA["Được số hóa"]] : "gold",
        [TRANGTHAISOHOA["Tái sử dụng từ kết quả hồ sơ khác"]] : "magenta",
        [TRANGTHAISOHOA["Tái sử dụng"]] : "success",
    }
    return <Tag color={mapper[trangThai]}>
        {(TRANGTHAISOHOA_VALUE as any)[trangThai]}
    </Tag>
}