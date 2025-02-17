import { useMemo } from 'react'
import { IDSTaiLieuHDSD } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../../lib/redux/Hooks'
import { DeleteDSTaiLieuHDSD } from '../redux/action'
import { IBasePagination } from '../../../../models'
import { useDSTaiLieuHDSDContext } from '../contexts/DSTaiLieuHDSDContext'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const DSTaiLieuHDSDContext = useDSTaiLieuHDSDContext()
    const columns = useMemo(() : ColumnsType<IDSTaiLieuHDSD> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Tên tài liệu",
                key: "tenTaiLieu",
                dataIndex: "tenTaiLieu",
                width : '25%'
            },
            {
                title: "Mô tả",
                key: "moTa",
                dataIndex: "moTa",
                width : '50%'
            },
            {
                title: "Ngày đăng",
                key: "ngayDang",
                dataIndex: "ngayDang",
                width : '25%'

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
                            DSTaiLieuHDSDContext.setDSTaiLieuHDSDId(record.id)
                            DSTaiLieuHDSDContext.setDSTaiLieuHDSDVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteDSTaiLieuHDSD({ id: record.id, forceDelete: false }))
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