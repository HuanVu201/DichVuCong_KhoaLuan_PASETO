import { useMemo } from 'react'
import { INguoiTiepNhanThuTuc } from '../../thutuc/models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
import { IBasePagination } from '../../../models'
import { useThuTucContext } from '../../thutuc/contexts/ThuTucContext'
import { useSearchParams } from 'react-router-dom'
import { FORMAT_DATE } from '@/data'
import dayjs from 'dayjs'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const nguoiTiepNhanThuTucContext = useThuTucContext()

    const columns = useMemo((): ColumnsType<INguoiTiepNhanThuTuc> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => (
                    index + 1
                ),
            },
            {
                title: 'Mã',
                key: "maTTHC",
                dataIndex: "maTTHC",
            },
            {
                title: 'Thủ tục',
                key: "tenTTHC",
                width: "50%",
                dataIndex: "tenTTHC",
            },
            {
                title: 'Cán bộ tiếp nhận',
                key: "nguoiTiepNhan",
                dataIndex: "nguoiTiepNhan",
            },
            {
                title: 'Mức độ',
                key: "mucDo",
                dataIndex: "mucDo",
                width : '14%',
                render : (text) => text == '2' ? 'Dịch vụ công' : text == '3' ? 'Dịch vụ công trực tuyến một phần' : text == '4' ? 'Dịch vụ công trực tuyến toàn trình' : ''
            },
            {
                title: "Thao tác",
                dataIndex: '',
                width: "5%",
                align: 'center',
                key: '',
                render: (_, record) => (    
                    <Space direction="horizontal">
                        <EyeOutlined style={{ color: "cornflowerblue" }} title="Xem chi tiết/Sửa" onClick={() => {
                            nguoiTiepNhanThuTucContext.setThuTucId(record.id)
                            nguoiTiepNhanThuTucContext.setThuTucModalVisible(true)
                        }} />
                    </Space>
                )
            }
        ]
    }, [pagination])
    return { columns }
}