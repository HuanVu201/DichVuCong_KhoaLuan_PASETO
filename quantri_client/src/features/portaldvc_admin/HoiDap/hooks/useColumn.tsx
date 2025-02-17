import { useMemo } from 'react'
import { IHoiDap } from '../../../portaldvc/HoiDap/models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../../lib/redux/Hooks'
import { DeleteHoiDap } from '../../../portaldvc/HoiDap/redux/action'
import { IBasePagination } from '../../../../models'
import { useHoiDapContext } from '../contexts/HoiDapContext'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const HoiDapContext = useHoiDapContext()
    const columns = useMemo(() : ColumnsType<IHoiDap> => {
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
                title: "Tiêu đề",
                key: "tieuDe",
                dataIndex: "tieuDe",
            },
            {
                title: "Tên người gửi",
                key: "hoTen",
                dataIndex: "hoTen",
            },
            {
                title: "Ngày gửi",
                key: "ngayGui",
                dataIndex: "ngayGui",
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
                            
                            HoiDapContext.sethoiDapId(record.id)
                            HoiDapContext.setHoiDapVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteHoiDap({ id: record.id, forceDelete: false }))
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