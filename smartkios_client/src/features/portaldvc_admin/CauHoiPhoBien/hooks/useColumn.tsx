import { useMemo } from 'react'
import { ICauHoiPhoBien } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../../lib/redux/Hooks'
import { DeleteCauHoiPhoBien } from '../redux/action'
import { IBasePagination } from '../../../../models'
import { useCauHoiPhoBienContext } from '../context/CauHoiPhoBienContext'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const CauHoiPhoBienContext = useCauHoiPhoBienContext()
    const columns = useMemo(() : ColumnsType<ICauHoiPhoBien> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Tiêu đề",
                key: "tieuDe",
                dataIndex: "tieuDe",
                width : '30%'
            },
            {
                title: "Nội dung",
                key: "noiDungCauHoi",
                dataIndex: "noiDungCauHoi",
                width : '70%'

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
                            CauHoiPhoBienContext.setCauHoiPhoBienId(record.id)
                            CauHoiPhoBienContext.setCauHoiPhoBienVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteCauHoiPhoBien({ id: record.id, forceDelete: false }))
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