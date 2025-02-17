import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined, FilterFilled, FilterOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
// import { DeleteLinhVuc } from '../redux/action'
import { IBasePagination } from '../../../models'
import { IApiChiaSe } from '../models'
import { useQuanLySuDungAPIContext } from '../contexts'

export const useApiChiaSeColumn = () => {
    const apiChiaSeContext = useQuanLySuDungAPIContext();
    const columns = useMemo((): ColumnsType<IApiChiaSe> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: <p style={{ textAlign: 'center' }}>Mã API</p>,
                key: "maApiChiaSe",
                dataIndex: "maApiChiaSe",
            },
            {
                title: <p style={{ textAlign: 'center' }}>Nội dung</p>,
                key: "noiDung",
                dataIndex: "noiDung",
            },
            {
                title: <p style={{ textAlign: 'center' }}>Giới hạn</p>,
                key: "gioiHan",
                dataIndex: "gioiHan",
                align: 'center',
                render: (text, record, index) =>
                    <div>
                        {record.gioiHan ? `${record.gioiHan} lượt/ngày` : ''}
                    </div>

            },
            {
                title: <p style={{ textAlign: 'center' }}>Đường dẫn</p>,
                key: "duongDan",
                dataIndex: "duongDan",
            },
            {
                title: "Thao tác",
                dataIndex: '',
                width: "10%",
                align: 'center',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <EditOutlined style={{ color: "cornflowerblue" }} title="Xem chi tiết/Sửa" onClick={() => {
                            apiChiaSeContext.setApiId(record.id)
                            apiChiaSeContext.setApiDetailModalVisible(true)
                        }} />
                        <EyeOutlined style={{ color: "black" }} title="Xem lịch sử gọi trong ngày" onClick={() => {
                            apiChiaSeContext.setApiId(record.id)
                            apiChiaSeContext.setLichSuApiModalVisible(true)
                        }} />
                        <FilterOutlined style={{ color: "orange" }} title="Thống kê lịch sử gọi" onClick={() => {
                            apiChiaSeContext.setApiId(record.id)
                            apiChiaSeContext.setFilterLichSuModalVisible(true)
                        }} />

                    </Space>
                )
            }
        ]
    }, [])
    return { columns }
}