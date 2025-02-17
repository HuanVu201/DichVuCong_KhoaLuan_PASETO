import { useMemo } from 'react'
import { IQuanLyLienKet } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../../lib/redux/Hooks'
import { DeleteQuanLyLienKet } from '../redux/action'
import { IBasePagination } from '../../../../models'
import { useQuanLyLienKetContext } from '../contexts/QuanLyLienKetContext'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const QuanLyLienKetContext = useQuanLyLienKetContext()
    const columns = useMemo(() : ColumnsType<IQuanLyLienKet> => {
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
                title: "Tên",
                key: "ten",
                dataIndex: "ten",
            },
            {
                title: "Link liên kết",
                key: "linkLienKet",
                dataIndex: "linkLienKet",
            },
            {
                title: "Mã liên kết",
                key: "ma",
                dataIndex: "ma",
            },
            {
                title: "Sử dụng",
                key: "suDung",
                dataIndex: "suDung",
                align: 'center',
                render: (text) => text == true ? <CheckCircleOutlined style={{color : 'green'}}></CheckCircleOutlined> : <CloseCircleOutlined style={{color : 'red'}}></CloseCircleOutlined>
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
                            
                            QuanLyLienKetContext.setMaQuanLyLienKet(record.id)
                            QuanLyLienKetContext.setMaQuanLyLienKetModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteQuanLyLienKet({ id: record.id, forceDelete: false }))
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