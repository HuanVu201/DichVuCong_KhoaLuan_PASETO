import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { DuLieuTraCuuBTP } from '@/features/hoso/services'

export const useColumn = () => {
    const columns = useMemo(() : ColumnsType<DuLieuTraCuuBTP> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Mã hồ sơ",
                key: "maHoSoMCDT",
                dataIndex: "maHoSoMCDT",
            },
            {
                title: "Mô tả",
                key: "moTa",
                dataIndex: "moTa",
            },
            {
                title: "Thời gian thực hiện",
                key: "thoiGianThucHien",
                dataIndex: "thoiGianThucHien",
            },
            {
                title: "Nội dung chi tiết",
                key: "noiDungChiTiet",
                dataIndex: "noiDungChiTiet",
            },
        ]
    }, [])
    return {columns}
}