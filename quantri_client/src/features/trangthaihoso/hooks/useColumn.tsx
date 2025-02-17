import { useMemo } from 'react'
import { ITrangThaiHoSo } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
import { DeleteTrangThaiHoSo } from '../redux/action'
import { IBasePagination } from '../../../models'
import { useTrangThaiHoSoContext } from '../contexts/TrangThaiHoSoContext'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const TrangThaiHoSoContext = useTrangThaiHoSoContext()
    const columns = useMemo(() : ColumnsType<ITrangThaiHoSo> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (_, record, idx) => {
                    const pageNumber = pagination.pageNumber ?? 1
                    const pageSize = pagination.pageSize ?? 10
                    return <>{(pageNumber - 1) * pageSize + idx + 1}</>
                  },
            },
            {
                title: "Tên trạng thái",
                key: "ten",
                dataIndex: "ten",
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
                            TrangThaiHoSoContext.setTrangThaiHoSoId(record.id)
                            TrangThaiHoSoContext.setTrangThaiHoSoModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteTrangThaiHoSo({ id: record.id, forceDelete: false }))
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