import { useMemo } from 'react'
import { IQuanLyVanBan } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../../lib/redux/Hooks'
import { DeleteQuanLyVanBan } from '../redux/action'
import { IBasePagination } from '../../../../models'
import { useQuanLyVanBanContext } from '../contexts/QuanLyVanBanContext'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const QuanLyVanBanContext = useQuanLyVanBanContext()
    const columns = useMemo((): ColumnsType<IQuanLyVanBan> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Số ký hiệu",
                key: "soKyHieu",
                dataIndex: "soKyHieu",
            },
            {
                title: "Cơ quan ban hành",
                key: "coQuanBanHanh",
                dataIndex: "coQuanBanHanh",
            },
            {
                title: "Loại văn bản",
                key: "loaiVanBan",
                dataIndex: "loaiVanBan",
                render: (text) => text == 'huyen-xa' ? 'Quyết định TTHC Cấp Huyện - Xã' : text == 'tinh' ? 'Quyết định TTHC Cấp Tỉnh' : text == 'lien-thong' ? 'Quyết định TTHC Cấp Tỉnh Liên thông' : ''

            },

            {
                title: "Công khai",
                key: "congKhai",
                dataIndex: "congKhai",
                align: 'center',
                render: (text) => text == true ? <CheckCircleOutlined style={{ color: 'green' }}></CheckCircleOutlined> : <CloseCircleOutlined style={{ color: 'red' }}></CloseCircleOutlined>
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

                            QuanLyVanBanContext.setMaQuanLyVanBan(record.id)
                            QuanLyVanBanContext.setMaQuanLyVanBanModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteQuanLyVanBan({ id: record.id, forceDelete: false }))
                            }}
                            okText='Xoá'
                            cancelText='Huỷ'
                        >
                            <DeleteOutlined style={{ color: "tomato" }} />
                        </Popconfirm>
                    </Space>
                )
            }
        ]
    }, [pagination])
    return { columns }
}