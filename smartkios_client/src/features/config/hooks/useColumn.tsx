import { useMemo, useState } from 'react'
import { IConfig } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space, TableColumnsType, Tag } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
import { DeleteConfig } from '../redux/action'
import { IBasePagination } from '../../../models'
import { useConfigContext } from '../contexts/ConfigContext'
import { DEFAULT_TABLE_CELL_LOAD_MORE_LENGTH } from '@/data'


export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const configContext = useConfigContext()
    
    const columns = useMemo((): TableColumnsType<IConfig> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Tên cấu hình",
                key: "ten",
                dataIndex: "ten",
            },
            {
                title: "Mã cấu hình",
                key: "code",
                dataIndex: "code",
            },
            {
                title: "Module",
                key: "module",
                dataIndex: "module",
                width: 150,
            },
            {
                title: "Nội dung",
                key: "content",
                dataIndex: "content",
            },

            {
                title: "Thao tác",
                dataIndex: '',
                width: "10%",
                align: 'center',
                fixed: 'right',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <EditOutlined style={{ color: "cornflowerblue" }} title="Xem chi tiết/Sửa" onClick={() => {
                            configContext.setConfigId(record.id)
                            configContext.setConfigModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteConfig({ id: record.id, forceDelete: false }))
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