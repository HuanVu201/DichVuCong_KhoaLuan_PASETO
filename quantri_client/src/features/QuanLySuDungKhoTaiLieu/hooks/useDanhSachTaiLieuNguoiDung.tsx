import { ITaiLieuLuuTruCongDan } from "@/features/portaldvc/HoSoCaNhan/components/KhoTaiLieuCongDan/models"
import { IBasePagination } from "@/models"
import { DeleteOutlined, LinkOutlined } from "@ant-design/icons"
import { Popconfirm, Space } from "antd"
import { ColumnsType } from "antd/es/table"
import { useMemo } from "react"
import { callApiAndDisplayFile, getFileName } from '@/utils'
import { ID_SEPARATE } from "@/data"
import { AntdSpace } from "@/lib/antd/components"

export const useDanhSachTaiLieuNguoiDung = ({pagination}: {pagination: IBasePagination}) => {
    const columns = useMemo((): ColumnsType<ITaiLieuLuuTruCongDan> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (_, record, idx) => {
                    const pageNumberr = pagination.pageNumber ?? 1
                    const pageSizee = pagination.pageSize ?? 10
                    return <>{(pageNumberr - 1) * pageSizee + idx + 1}</>
                },
            },
            {
                title: <p style={{ textAlign: 'center' }}>Tên giấy tờ</p>,
                key: "tenGiayTo",
                dataIndex: "tenGiayTo",
            },
            {
                title: <p style={{ textAlign: 'center' }}>Dung lượng</p>,
                key: "dungLuong",
                render: (record) => {
                    if (record.dungLuong < 1) {
                        const dungLuongKB = Math.trunc((record.dungLuong * 1024 * 100) / 100)
                        return <>{dungLuongKB.toString()} KB</>;
                    }
                    const dungLuongMB = Math.trunc(Math.floor((record.dungLuong ?? 0) * 100) / 100);
                    return <>{dungLuongMB.toString()} MB</>;
                }
            },
            {
                title: <p style={{ textAlign: 'center' }}>Dung lượng</p>,
                key: "duongDan",
                render: (_, record) => {
                    return (
                        <>
                            {record.duongDan?.split(ID_SEPARATE).map((dinhKem, idx) =>
                                <AntdSpace direction="horizontal" onClick={() => callApiAndDisplayFile(dinhKem)} key={idx}>
                                    {''} <LinkOutlined style={{ color: "yellowgreen" }} role='button' title={getFileName(dinhKem)} />
                                </AntdSpace>
                            )}
                        </>
                    )
                }
            },
            {
                title: <p style={{ textAlign: 'center' }}>Số lần tái sử dụng</p>,
                key: "soLuotTaiSuDung",
                dataIndex: "soLuotTaiSuDung",
                
            }
        ]
    }, [pagination])
    return columns
}
