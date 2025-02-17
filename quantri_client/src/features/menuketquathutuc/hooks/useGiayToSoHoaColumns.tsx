import { ColumnsType } from "antd/es/table"
import React, { useMemo } from "react"
import { IMenuKetQuaThuTuc } from "../models"
import { IBasePagination } from "../../../models"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { Popconfirm, Space, Typography } from "antd"
import { DeleteMenuKetQuaThuTuc } from "../redux/action"
import { DeleteOutlined, EditOutlined, EyeInvisibleOutlined, EyeOutlined, LinkOutlined } from "@ant-design/icons"
import { useMenuKetQuaThuTucContext } from "../contexts/MenuKetQuaThuTucContext"
import { IThuTuc } from "@/features/thutuc/models"
import { IGiayToSoHoa, ISearchGiayToSoHoa } from "@/features/giaytosohoa/models"
import { AntdSpace } from "@/lib/antd/components"
import { FORMAT_DATE, FORMAT_DATE_WITHOUT_TIME, ID_SEPARATE } from "@/data"
import { GIAYTOSOHOA_LOAISOHOA } from "@/features/hoso/data/formData"
import dayjs from 'dayjs'
import { callApiAndDisplayFile } from "@/utils"
import { DeleteGiayToSoHoa } from "@/features/giaytosohoa/redux/action"

export const useGiayToSoHoaColumns = (searchParams: ISearchGiayToSoHoa, setSearchParams: React.Dispatch<React.SetStateAction<ISearchGiayToSoHoa>>) => {
    const menuKetQuaThuTucContext = useMenuKetQuaThuTucContext()
    const {data: user} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const columns = useMemo((): ColumnsType<IGiayToSoHoa> => {
        return [
            {
                title: "STT",
                key: 'STT',
                width:"5%",
                render: (_, record, idx) => {
                  const pageNumber = searchParams.pageNumber ?? 1
                  const pageSize = searchParams.pageSize ?? 10
                  return <>{(pageNumber - 1) * pageSize + idx + 1}</>
                },
              },
            {
                title:<p style={{textAlign : 'center'}}>Mã/Tên giấy tờ</p>,
                key: "ten",
                dataIndex: "ten",
                render: (_, record) => {
                    return <>
                        <strong>{record.ma}</strong>
                         <Typography.Paragraph
                            ellipsis={{ rows: 3, expandable: true, symbol: 'Xem thêm' }}
                        >
                            {record.ten}
                        </Typography.Paragraph>
                    </>
                },
                hidden: searchParams.groupByUser
            },
            {
                title:<p style={{textAlign : 'center'}}>Chủ hồ sơ</p>,
                key: "chuHoSo",
                render: (_, record) => {
                    return <>{record.chuGiayTo || record.chuHoSo}</>
                }
            },
            {
                title:<p style={{textAlign : 'center'}}>Ngày thực hiện số hóa</p>,
                key: "thoiGianSoHoa",
                dataIndex: "thoiGianSoHoa",
                align : 'center',
                render: (_, record) => {
                    return <>
                        <p><span style={{fontWeight:500}}>{record.thoiGianSoHoa ? dayjs(record.thoiGianSoHoa).format(FORMAT_DATE_WITHOUT_TIME) : ""}</span></p>
                    </>
                },
                hidden: searchParams.groupByUser
            },
            {
                title:<p style={{textAlign : 'center'}}>Người số hóa</p>,
                key: "fullName",
                dataIndex: "fullName",
                hidden: searchParams.groupByUser
            },
            {
                title:<p style={{textAlign : 'center'}}>Đơn vị</p>,
                key: "groupName",
                dataIndex: "groupName",
                hidden: searchParams.groupByUser || (user?.maDinhDanh === "" || user?.maDinhDanh == undefined)
            },
            {
                title:<p style={{textAlign : 'center'}}>Thời hạn</p>,
                key: "thoiGianSoHoa",
                dataIndex: "thoiGianSoHoa",
                render: (_, record) => {
                    return <>
                        <p>- Ngày số hóa: <span style={{fontWeight:500}}>{record.thoiGianSoHoa ? dayjs(record.thoiGianSoHoa).format(FORMAT_DATE_WITHOUT_TIME) : ""}</span></p>
                        <p>- Ngày hết hạn: <span style={{fontWeight:500}}>{record.thoiHanVinhVien ? "Vô thời hạn" : record.thoiHanHieuLuc ? dayjs(record.thoiHanHieuLuc).format(FORMAT_DATE_WITHOUT_TIME) : ""}</span></p>
                    </>
                },
                hidden: searchParams.groupByUser
            },
            {
                title:<p style={{textAlign : 'center'}}>Loại số hóa</p>,
                key: "loaiSoHoa",
                dataIndex: "loaiSoHoa",
                render: (_, record) => {
                    return <>{record.loaiSoHoa ? (GIAYTOSOHOA_LOAISOHOA as any)[record.loaiSoHoa] : ""}</>
                },
                hidden: searchParams.groupByUser
            },
            {
                title:<p style={{textAlign : 'center'}}>Đính kèm</p>,
                key: "dinhKem",
                dataIndex: "dinhKem",
                align : 'center',
                render: (_, record) => {
                    return <>
                    {record.dinhKem?.split(ID_SEPARATE).map((dinhKem, idx) => 
                       <AntdSpace direction="horizontal" onClick={() => callApiAndDisplayFile(dinhKem)} key={idx}>
                            <LinkOutlined role='button' title={dinhKem.substring(dinhKem.lastIndexOf("/") + 1)}/>
                        </AntdSpace>
                    )}
                    </>
                },
                hidden: searchParams.groupByUser
            },
            {
                title: "Thao tác",
                dataIndex: '',
                width:"6%",
                align:'center',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <EyeOutlined title="Xem chi tiết" onClick={() => {
                            menuKetQuaThuTucContext.setGiayToSoHoaId(record.id)
                            menuKetQuaThuTucContext.setViewMode("view")
                        }} />
                        <EditOutlined style={{color:"cornflowerblue"}} title="Sửa" onClick={() => {
                            menuKetQuaThuTucContext.setGiayToSoHoaId(record.id)
                            menuKetQuaThuTucContext.setViewMode("edit")
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={async () => {
                                const res = await dispatch(DeleteGiayToSoHoa({ id: record.id, forceDelete: false })).unwrap()
                                if(res.succeeded){
                                    setSearchParams((curr) => ({...curr}))
                                }
                            }}
                            okText='Xoá'
                            cancelText='Huỷ'
                        >
                            <DeleteOutlined size={30} style={{color:"tomato"}}/>
                        </Popconfirm>

                    </Space>
                ),
                hidden: searchParams.groupByUser
            }
        ]
    }, [searchParams])
    return { columns }
} 