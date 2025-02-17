import { useMemo } from 'react'
import { ITrangThai } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../../lib/redux/Hooks'
import { DeleteTrangThai } from '../redux/action'
import { IBasePagination } from '../../../../models'
import { useTrangThaiContext } from '../contexts/TrangThaiContext'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const trangThaiContext = useTrangThaiContext()
    const columns = useMemo((): ColumnsType<ITrangThai> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Thứ tự",
                key: "thuTu",
                dataIndex: "thuTu",
                align : 'center'
            },
            {
                title: "Tên trạng thái",
                key: "tenTrangThai",
                dataIndex: "tenTrangThai",
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
                            trangThaiContext.setMaTrangThai(record.id)
                            trangThaiContext.setMaTrangThaiModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteTrangThai({ id: record.id, forceDelete: false }))
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