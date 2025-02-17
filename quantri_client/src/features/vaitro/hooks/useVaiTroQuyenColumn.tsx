import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { IBasePagination } from '../../../models'
import { ISearchVaiTro, IVaiTro } from '@/features/vaitro/models'
import { useAppDispatch } from '@/lib/redux/Hooks'
import { DeleteVaiTro } from '../redux/action'
import { useVaiTroModalContext } from '../contexts/VaiTroModalContext'

export const useRolePermissions = (pagination: ISearchVaiTro) => {
    const vaiTroModalContext = useVaiTroModalContext()
    const dispatch = useAppDispatch()
    const columns = useMemo(() : ColumnsType<IVaiTro> => {
        return [
            {
                title: "STT",
                width:"5%",
                key: 'STT',
                render: (_, record, idx) => {
                  const pageNumber = pagination.pageNumber ?? 1
                  const pageSize = pagination.pageSize ?? 10
                  return <>{(pageNumber - 1) * pageSize + idx + 1}</>
                },
            },
            {
                title: "Quyền",
                key: "claimValue",
                dataIndex: "claimValue",
            },
            {
                title: "Thao tác",
                dataIndex: '',
                width:"10%",
                align:'center',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteVaiTro({ id: record.id, forceDelete: false }))
                            }}
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
    return columns
}