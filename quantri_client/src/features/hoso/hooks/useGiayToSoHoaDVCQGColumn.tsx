
import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { LinkOutlined } from '@ant-design/icons'
import { AntdSpace } from '@/lib/antd/components'
import { Typography } from 'antd'
import { useWindowSizeChange } from '@/hooks/useWindowSizeChange'
import { GetDanhSachKetQuaResponse } from '@/features/giaytosohoa/services'

export const useGiayToSoHoaDVCQGColumn = ({columnNameType = "giay-to"} : {columnNameType?: "ho-so" | "giay-to"}) => {
    const {isWindow} = useWindowSizeChange()
    const columns = useMemo((): ColumnsType<GetDanhSachKetQuaResponse> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: columnNameType == "giay-to" ? "Mã/Tên giấy tờ" : "Mã/Tên hồ sơ",
                key: "ten",
                width: "45%",
                dataIndex: "ten",
                render: (_, record) => {
                    return <>
                        <strong>{record.maKetQua}</strong>
                        <Typography.Paragraph
                            ellipsis={{ rows: 3, expandable: true, symbol: 'Xem thêm' }}
                        >
                            {record.tenGiayTo}
                        </Typography.Paragraph>
                    </>
                }
            },
            {
                title: "Số ký hiệu",
                key: "soKyHieu",
                dataIndex: "soKyHieu",
            },
            {
                title: "Cơ quan chủ quản",
                key: "coQuanChuQuan",
                dataIndex: "coQuanChuQuan",
            },
            {
                title: "Đính kèm",
                key: "dinhKem",
                dataIndex: "dinhKem",
                render: (_, record) => {
                    return <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        {record.danhSachTepDinhKem && record.danhSachTepDinhKem.length ? record.danhSachTepDinhKem?.map((item, key) => {
                            return <>
                            <AntdSpace direction="horizontal" >
                                <LinkOutlined style={{ color: "yellowgreen" }} role='button' title={item.tenTep} />
                            </AntdSpace>
                            </>
                        }): null}
                    </div>
                }
            },
        ]
    }, [isWindow, columnNameType])
    return columns
}