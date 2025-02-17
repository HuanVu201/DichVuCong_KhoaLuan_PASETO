import { ColumnsType } from "antd/es/table"
import React, { useMemo } from "react"
import { Popconfirm, Space, Typography } from "antd"
import { DeleteOutlined, EditOutlined, EyeOutlined, LinkOutlined } from "@ant-design/icons"
import { IGiayToSoHoa, ISearchGiayToSoHoa } from "@/features/giaytosohoa/models"
import { AntdSpace } from "@/lib/antd/components"
import { FORMAT_DATE, FORMAT_DATE_WITHOUT_TIME, ID_SEPARATE } from "@/data"
import { GIAYTOSOHOA_LOAISOHOA } from "@/features/hoso/data/formData"
import dayjs from 'dayjs'
import { callApiAndDisplayFile, getFileName } from "@/utils"
import { DeleteGiayToSoHoa } from "@/features/giaytosohoa/redux/action"
import { useDanhSachGiayToContext } from "../contexts/DanhSachGiayToProvider"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { ITaiLieuLuuTruCongDan } from "@/features/portaldvc/HoSoCaNhan/components/KhoTaiLieuCongDan/models"
import { khoTaiLieuCongDanApi, SearchDanhSachTaiLieuCongDan } from "@/features/portaldvc/HoSoCaNhan/components/KhoTaiLieuCongDan/services"
import { toast } from "react-toastify"

export const useColumns = (searchParams: SearchDanhSachTaiLieuCongDan, setSearchParams: React.Dispatch<React.SetStateAction<SearchDanhSachTaiLieuCongDan>>) => {
    const danhSachGiayToContext = useDanhSachGiayToContext()
    const dispatch = useAppDispatch()
    const columns = useMemo((): ColumnsType<ITaiLieuLuuTruCongDan> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (_, record, idx) => {
                    const pageNumberr = searchParams.pageNumber ?? 1
                    const pageSizee = searchParams.pageSize ?? 10
                    return <>{(pageNumberr - 1) * pageSizee + idx + 1}</>
                },
            },
            {
                title: <p style={{ textAlign: 'center' }}>Tên giấy tờ</p>,
                key: "tenGiayTo",
                dataIndex: "tenGiayTo",
            },
            {
                title: <p style={{ textAlign: 'center' }}>Dung lượng</p>,
                key: "dungLuong",
                render: (record) => {
                    if (record.dungLuong < 1) {
                        const dungLuongKB = Math.trunc((record.dungLuong * 1024 * 100) / 100)
                        return <>{dungLuongKB.toString()} KB</>;
                    }
                    const dungLuongMB = Math.trunc(Math.floor((record.dungLuong ?? 0) * 100) / 100);
                    return <>{dungLuongMB.toString()} MB</>;
                }
            },
            {
                title: <p style={{ textAlign: 'center' }}>Dung lượng</p>,
                key: "duongDan",
                render: (_, record) => {
                    return (
                        <>
                            {record.duongDan?.split(ID_SEPARATE).map((dinhKem, idx) =>
                                <AntdSpace direction="horizontal" onClick={() => callApiAndDisplayFile(dinhKem)} key={idx}>
                                    {''} <LinkOutlined style={{ color: "yellowgreen" }} role='button' title={getFileName(dinhKem)} />
                                </AntdSpace>
                            )}
                        </>
                    )
                }
            },
            {
                title: <p style={{ textAlign: 'center' }}>Ngày đồng bộ</p>,
                key: "createdOn",
                render: (_, record) => {
                    return <>{record.createdOn ? dayjs(record.createdOn).format(FORMAT_DATE) : undefined}</>
                }
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
                            danhSachGiayToContext.setGiayToSoHoaId(record.id)
                            danhSachGiayToContext.setViewMode("view")
                        }} />
                        {/* <EditOutlined style={{color:"cornflowerblue"}} title="Sửa" onClick={() => {
                            danhSachGiayToContext.setGiayToSoHoaId(record.id)
                            danhSachGiayToContext.setViewMode("edit")
                        }} /> */}
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={async () => {
                                if(record.khoLuuTruId == null){
                                    toast.warn("Không có dữ liệu kho lưu trữ công dân, vui lòng thử lại sau")
                                    return
                                }
                                const res = await khoTaiLieuCongDanApi.AdminDeleteTaiLieu({id: record.id, forceDelete: false, khoLuuTruId: record.khoLuuTruId})
                                if(res.data.succeeded){
                                    setSearchParams((curr) => ({...curr}))
                                }
                            }}
                            okText='Xoá'
                            cancelText='Huỷ'
                        >
                            <DeleteOutlined size={30} style={{color:"tomato"}}/>
                        </Popconfirm>

                    </Space>
                )
            }
        ]
    }, [searchParams])
    return { columns }
} 