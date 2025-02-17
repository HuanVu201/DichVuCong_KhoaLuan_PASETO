import { ColumnsType } from "antd/es/table"
import { useMemo } from "react"
import { ICauHinhHeThong } from "../models"
import { IBasePagination } from "../../../models"
import { useAppDispatch } from "../../../lib/redux/Hooks"
import { Popconfirm, Space } from "antd"
import { DeleteCauHinhHeThong } from "../redux/action"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { useCauHinhHeThongContext } from "../contexts/CauHinhHeThongContext"

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const cauHinhHeThongContext = useCauHinhHeThongContext()
    const columns = useMemo((): ColumnsType<ICauHinhHeThong> => {
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
                dataIndex: "ten",
                key: "ten"
            },
            {
                title: "Nội dung",
                dataIndex: "content",
                key: "content"
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
                            cauHinhHeThongContext.setCauHinhHeThongId(record.id)
                            cauHinhHeThongContext.setCauHinhHeThongModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteCauHinhHeThong({ id: record.id, forceDelete: false }))
                            } }
                            okText='Xoá'
                            cancelText='Huỷ'
                        >
                            <DeleteOutlined size={30} style={{color:"tomato"}}/>
                        </Popconfirm>

                    </Space>
                )
            }
        ]
    }, [pagination])
    return { columns }
} 