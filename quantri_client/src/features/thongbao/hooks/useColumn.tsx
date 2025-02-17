import { useMemo } from 'react'
import { IThongBao } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
import { DeleteThongBao } from '../redux/action'
import { IBasePagination } from '../../../models'
import { useThongBaoContext } from '../contexts/ThongBaoContext'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const thongBaoContext = useThongBaoContext()
    const columns = useMemo((): ColumnsType<IThongBao> => {
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
                title: "Tiêu đề",
                key: "tieuDe",
                dataIndex: "tieuDe",
            },
            {
                title: "Đơn vị",
                key: "donViId",
                dataIndex: "donViId",
            },
            {
                title: "Toàn hệ thống",
                key: "toanHeThong",
                dataIndex: "toanHeThong",
                align: 'center',
                render: (text) => text == true ? <CheckCircleOutlined style={{color : 'green'}}></CheckCircleOutlined> : <CloseCircleOutlined style={{color : 'red'}}></CloseCircleOutlined>
            },
            {
                title: "Quan trọng",
                key: "quanTrong",
                dataIndex: "quanTrong",
                align: 'center',
                render: (text) => text == true ? <CheckCircleOutlined style={{color : 'green'}}></CheckCircleOutlined> : <CloseCircleOutlined style={{color : 'red'}}></CloseCircleOutlined>
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
                width: "10%",
                align: 'center',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <EditOutlined style={{ color: "cornflowerblue" }} title="Xem chi tiết/Sửa" onClick={() => {
                            thongBaoContext.setThongBaoId(record.id)
                            thongBaoContext.setThongBaoModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteThongBao({ id: record.id, forceDelete: false }))
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