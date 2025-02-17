import { useMemo } from 'react'
import { ILinhVuc } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space, Tag } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
import { DeleteLinhVuc } from '../redux/action'
import { IBasePagination } from '../../../models'
import { useLinhVucContext } from '../contexts/LinhVucContext'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const LinhVucContext = useLinhVucContext()
    const columns = useMemo((): ColumnsType<ILinhVuc> => {
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
                title: "Tên lĩnh vực",
                key: "ten",
                dataIndex: "ten",
            },
            {
                title: "Mã lĩnh vực",
                key: "ma",
                dataIndex: "ma",
            },
            {
                title: "Mã ngành",
                key: "maNganh",
                dataIndex: "maNganh",
            },
            {
                title: "Sử dụng",
                key: "suDung",
                dataIndex: "suDung",
                width: '5%',
                render: (_, record) => {
                    return <Tag color={record.suDung ? "green" : "red"} style={{ display: 'flex', justifyContent: 'center' }}>
                        {record.suDung ? "Có" : "Không"}
                    </Tag>
                }
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
                            LinhVucContext.setLinhVucId(record.id)
                            LinhVucContext.setLinhVucModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteLinhVuc({ id: record.id, forceDelete: false }))
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