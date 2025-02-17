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
                render: (_, record, idx) => {
                    const pageNumber = pagination.pageNumber ?? 1
                    const pageSize = pagination.pageSize ?? 10
                    return <>{(pageNumber - 1) * pageSize + idx + 1}</>
                },
            },
            {
                title: (<p style={{textAlign : 'center'}}>Tên tài liệu</p>),
                key: "tenTaiLieu",
                dataIndex: "tenTaiLieu",
                width : '25%'
            },
            {
                title: (<p style={{textAlign : 'center'}}>Mô tả</p>),
                key: "moTa",
                dataIndex: "moTa",
                width : '35%'
            },
            {
                title: (<p style={{textAlign : 'center'}}>Tài liệu dành cho</p>),
                key: "taiLieuDanhCho",
                dataIndex: "taiLieuDanhCho",
                width : '15%',
                render : (_,record) => record.taiLieuDanhCho == "CongDan" ? "Công dân" : "Cán bộ",
                align : 'center'
            },
            {
                title: (<p style={{textAlign : 'center'}}>Ngày đăng</p>),
                key: "ngayDang",
                dataIndex: "ngayDang",
                width : '25%',
                align : 'center'

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