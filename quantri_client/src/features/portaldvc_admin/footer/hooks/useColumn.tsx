import { useMemo } from 'react'
import { IFooter } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../../lib/redux/Hooks'
import { DeleteFooter } from '../redux/action'
import { IBasePagination } from '../../../../models'
import { useFooterContext } from '../contexts/FooterContext'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const footerContext = useFooterContext()
    const columns = useMemo(() : ColumnsType<IFooter> => {
        return [
            {
                title: "STT",
                key: 'STT',
                width:"5%",
                render: (_, record, idx) => {
                  const pageNumber = pagination.pageNumber ?? 1
                  const pageSize = pagination.pageSize ?? 10
                  return <>{(pageNumber - 1) * pageSize + idx + 1}</>
                },
              },
            {
                title: "Tiêu đề",
                key: "tieuDe",
                dataIndex: "tieuDe",
            },
            {
                title: "Nội dung",
                key: "noiDung",
                dataIndex: "noiDung",
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
                            footerContext.setMaFooter(record.id)
                            footerContext.setMaFooterModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteFooter({ id: record.id, forceDelete: false }))
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