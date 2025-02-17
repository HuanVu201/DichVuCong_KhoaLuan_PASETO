import { ColumnsType } from "antd/es/table"
import { useMemo } from "react"
import { IMenuKetQuaThuTuc } from "../models"
import { IBasePagination } from "../../../models"
import { useAppDispatch } from "../../../lib/redux/Hooks"
import { Popconfirm, Space } from "antd"
import { DeleteMenuKetQuaThuTuc } from "../redux/action"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { useMenuKetQuaThuTucContext } from "../contexts/MenuKetQuaThuTucContext"
import { IThuTuc } from "@/features/thutuc/models"

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const menuContext = useMenuKetQuaThuTucContext()
    const columns = useMemo((): ColumnsType<IMenuKetQuaThuTuc> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Tên menu",
                dataIndex: "tenMenu",
                key: "tenMenu"
            },
            {
                title: "Tên đơn vị",
                dataIndex: "tenDonVi",
                key: "tenDonVi"
            },
            {
                title: "Mã TTHC",
                dataIndex: "maTTHC",
                key: "maTTHC"
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
                            menuContext.setMenuKetQuaThuTucId(record.id)
                            menuContext.setMenuKetQuaThuTucModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteMenuKetQuaThuTuc({ id: record.id, forceDelete: false }))
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