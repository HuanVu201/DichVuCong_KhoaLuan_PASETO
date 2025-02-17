import { useMemo } from 'react'
import { IBuocXuLy } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
import { DeleteBuocXuLy } from '../redux/action'
import { IBasePagination } from '../../../models'
import { useBuocXuLyContext } from '../contexts/BuocXuLyContext'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const buocXuLyContext = useBuocXuLyContext()
    const columns = useMemo(() : ColumnsType<IBuocXuLy> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Tên bước",
                key: "tenBuoc",
                dataIndex: "tenBuoc",
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
                            buocXuLyContext.setBuocXuLiId(record.id)
                            buocXuLyContext.setBuocXuLiModalVisibleModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteBuocXuLy({ id: record.id, forceDelete: false }))
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