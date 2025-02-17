import { useMemo } from 'react'
import { IQuyTrinhXuLy } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space, TableColumnsType, Table } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
import { DeleteQuyTrinhXuLy } from '../redux/action'
import { IBasePagination } from '../../../models'
import { useQuyTrinhXuLyContext } from '../contexts/QuyTrinhXuLyContext'
export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const QuaTrinhXuLyContext = useQuyTrinhXuLyContext()
    const expandedColumns = useMemo(() => {
        const columns: TableColumnsType<IQuyTrinhXuLy> = 
        [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Tên thủ tục",
                key: "tenTTHC",
                dataIndex: "tenTTHC",
            },
            {
                title: "ĐKKQ",
                key: "dkkq",
                render: (_, record) => {
                    return <div>null</div>
                }
            },
            {
                title: "TTPT",
                key: "TTPT",
                render: (_, record) => {
                    return <div>null</div>
                }
            },
            {
                title: "Liên thông",
                key: "lienThong",
                render: (_, record) => {
                    return<></>
                }
            },
            {
                title: "Thao tác",
                width:"10%",
                align:'center',
                key: 'thaotac',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <EditOutlined style={{color:"cornflowerblue"}} title="Xem chi tiết/Sửa" onClick={() => {
                            QuaTrinhXuLyContext.setQuyTrinhXuLyId(record.id)
                            QuaTrinhXuLyContext.setQuyTrinhXuLyModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteQuyTrinhXuLy({ id: record.id, forceDelete: false }))
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
        return columns
    }, [pagination])
    const columns = useMemo(() : ColumnsType<IQuyTrinhXuLy> => {
        return [
            { title: 'Tên lĩnh vực', dataIndex: 'linhVucChinh', key: 'linhVucChinh' },
            { title: 'Mã lĩnh vực', dataIndex: 'maLinhVucChinh', key: 'maLinhVucChinh' },
        ];
    }, [pagination])
    return {expandedColumns, columns}
}