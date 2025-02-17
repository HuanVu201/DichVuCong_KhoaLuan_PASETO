import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
// import { DeleteLinhVuc } from '../redux/action'
import { IBasePagination } from '../../../models'
import { useMauPhoiContext } from '../context/MauPhoiContext'
import { IMauPhoi } from '../models'
import { DeleteMauPhoi } from '../redux/action'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const MauPhoiContext = useMauPhoiContext()
    const columns = useMemo(() : ColumnsType<IMauPhoi> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Loại phôi",
                key: "loaiPhoi",
                dataIndex: "loaiPhoi",
            },
            {
                title: "Tên mẫu phôi",
                key: "tenMauPhoi",
                dataIndex: "tenMauPhoi",
            },
            {
                title: "Thao tác",
                dataIndex: '',
                width:"10%",
                align:'center',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <EditOutlined style={{color:"cornflowerblue"}} title="Xem chi tiết/Sửa" onClick={() => {
                            MauPhoiContext.setMauPhoiId(record.id)
                            MauPhoiContext.setMauPhoiModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteMauPhoi({ id: record.id, forceDelete: false }))
                            } }
                            okText='Xoá'
                            cancelText='Huỷ'
                        >
                            <DeleteOutlined style={{color:"tomato"}}/>
                        </Popconfirm>
                    </Space>
                )
            }
        ]
    }, [pagination])
    return {columns}
}