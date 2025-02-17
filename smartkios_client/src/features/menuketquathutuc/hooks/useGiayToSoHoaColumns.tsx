import { ColumnsType } from "antd/es/table"
import { useMemo } from "react"
import { IMenuKetQuaThuTuc } from "../models"
import { IBasePagination } from "../../../models"
import { useAppDispatch } from "../../../lib/redux/Hooks"
import { Popconfirm, Space } from "antd"
import { DeleteMenuKetQuaThuTuc } from "../redux/action"
import { DeleteOutlined, EditOutlined, LinkOutlined } from "@ant-design/icons"
import { useMenuKetQuaThuTucContext } from "../contexts/MenuKetQuaThuTucContext"
import { IThuTuc } from "@/features/thutuc/models"
import { IGiayToSoHoa } from "@/features/giaytosohoa/models"
import { AntdSpace } from "@/lib/antd/components"
import { FORMAT_DATE, FORMAT_DATE_WITHOUT_TIME, ID_SEPARATE } from "@/data"
import { GIAYTOSOHOA_LOAISOHOA } from "@/features/hoso/data/formData"
import dayjs from 'dayjs'
import { callApiAndDisplayFile } from "@/utils"

export const useGiayToSoHoaColumns = (pagination: IBasePagination) => {
    const menuKetQuaThuTucContext = useMenuKetQuaThuTucContext()
    const dispatch = useAppDispatch()
    const columns = useMemo((): ColumnsType<IGiayToSoHoa> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Tên giấy tờ",
                key: "ten",
                width:"35%",
                dataIndex: "ten",
            },
            {
                title: "Mã giấy tờ",
                key: "ma",
                dataIndex: "ma",
            },
            {
                title: "Người số hóa",
                key: "fullName",
                dataIndex: "fullName",
            },
            {
                title: "Đơn vị",
                key: "groupName",
                dataIndex: "groupName",
            },
            {
                title: "Thời hạn",
                key: "thoiGianSoHoa",
                dataIndex: "thoiGianSoHoa",
                render: (_, record) => {
                    return <>
                        <p>- Ngày số hóa: <span style={{fontWeight:500}}>{record.thoiGianSoHoa ? dayjs(record.thoiGianSoHoa).format(FORMAT_DATE_WITHOUT_TIME) : ""}</span></p>
                        <p>- Ngày hết hạn: <span style={{fontWeight:500}}>{record.thoiHanHieuLuc ? dayjs(record.thoiHanHieuLuc).format(FORMAT_DATE_WITHOUT_TIME) : ""}</span></p>
                    </>
                }
            },
            {
                title: "Loại số hóa",
                key: "loaiSoHoa",
                dataIndex: "loaiSoHoa",
                render: (_, record) => {
                    return <>{record.loaiSoHoa ? (GIAYTOSOHOA_LOAISOHOA as any)[record.loaiSoHoa] : ""}</>
                }
            },
            {
                title: "Đính kèm",
                key: "dinhKem",
                dataIndex: "dinhKem",
                render: (_, record) => {
                    return <>
                    {record.dinhKem.split(ID_SEPARATE).map((dinhKem, idx) => 
                       <AntdSpace direction="horizontal" onClick={() => callApiAndDisplayFile(dinhKem)} key={idx}>
                            <LinkOutlined role='button' title={dinhKem.substring(dinhKem.lastIndexOf("/") + 1)}/>
                        </AntdSpace>
                    )}
                    </>
                }
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
                            menuKetQuaThuTucContext.setGiayToSoHoaId(record.id)
                            menuKetQuaThuTucContext.setGiayToSoHoaModalVisible(true)
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