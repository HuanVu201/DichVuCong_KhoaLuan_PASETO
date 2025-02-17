import { IHoSoBoSung } from "@/features/bosunghoso/models"
import { ColumnsType } from "antd/es/table"
import { useMemo } from "react"
import dayjs from 'dayjs'
import { FORMAT_DATE } from "@/data"
export const useBoSungHoSoColumn = () => {
    const columns = useMemo(() : ColumnsType<IHoSoBoSung> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Người yêu cầu",
                key: "nguoiYeuCauBoSungFullName",
                dataIndex: "nguoiYeuCauBoSungFullName",
            },
            {
                title: "Người tiếp nhận",
                key: "nguoiTiepNhanBoSungFullName",
                dataIndex: "nguoiTiepNhanBoSungFullName",
            },
            {
                title: "Ngày hẹn trả trước",
                key: "ngayHenTraTruoc",
                dataIndex: "ngayHenTraTruoc",
                render: (_, record) => {
                    return <>{record.ngayHenTraTruoc ? dayjs(record.ngayHenTraTruoc).format(FORMAT_DATE) : null}</>
                }
            },
            {
                title: "Ngày hẹn trả mới",
                key: "ngayHenTraMoi",
                dataIndex: "ngayHenTraMoi",
                render: (_, record) => {
                    return <>{record.ngayHenTraMoi ? dayjs(record.ngayHenTraMoi).format(FORMAT_DATE) : ""}</>
                }
            },
            {
                title: "Trạng thái",
                key: "trangThaiBoSung",
                dataIndex: "trangThaiBoSung",
            },
        ]
    }, [])
    return columns
}