
import { IHoSo } from "@/features/hoso/models"
import { FormInstance, Popconfirm, Space, Typography } from "antd"
import { ColumnsType } from "antd/es/table"
import { useMemo } from "react"
import { getCurrency } from "@/utils"
import { IYeuCauThanhToan, YEUCAUTHANHTOAN_TRANGTHAI } from "@/features/yeucauthanhtoan/models"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { Service } from "@/services"
import { AntdButton } from "@/lib/antd/components"
import dayjs from "dayjs"
import { IHoSoNhap } from "@/features/hosonhap/models"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { useHoSoLuuTruContext } from "../contexts/HoSoLuuTruContext"
import { useAppDispatch } from "@/lib/redux/Hooks"
import { DeleteHoSoNhap } from "@/features/hosonhap/redux/action"

export const useHoSoLuuTruColumn = () => {
    const hoSoNhapContext = useHoSoLuuTruContext()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [searchParams,setSearchParams] = useSearchParams()
    
    const columns : ColumnsType<IHoSoNhap> = [
            {
                title: <p style={{ textAlign: 'center' }}>Chủ hồ sơ</p>,
                key: "chuHoSo",
                dataIndex: "chuHoSo",
                width: '15%'

            },
            {
                title: <p style={{ textAlign: 'center' }}>Đơn vị</p>,
                key: "tenDonVi",
                dataIndex: "tenDonVi",

            },
            {
                title: <p style={{ textAlign: 'center' }}>Trích yếu hồ sơ</p>,
                key: "trichYeuHoSo",
                dataIndex: "trichYeuHoSo",
                render: (_, record) => {
                    return <>
                        <Typography.Paragraph
                            style={{ fontWeight: '500', marginBottom: 0 }}
                            ellipsis={{ rows: 2, expandable: true, symbol: 'Xem thêm' }}
                        >
                            {(record as any).trichYeuHoSo}
                        </Typography.Paragraph>
                    </>
                }
            },
            {
                title: <p style={{ textAlign: 'center' }}>Ngày tạo</p>,
                key: "ngayTao",
                dataIndex: "ngayTao",
                render: (_, record) => {
                    return <>
                        {dayjs(record.ngayTao).format('DD/MM/YYYY')}
                    </>
                }
            },
            {
                title: <p style={{ textAlign: 'center' }}>Thao tác</p>,
                dataIndex: '',
                width: "10%",
                align: 'center',
                key: '',
                render: (_, record) => {
                    return (
                        <Space direction="horizontal">

                            <EditOutlined style={{ color: "cornflowerblue" }} title="Xem chi tiết/Sửa" onClick={() => {
                                hoSoNhapContext.setHoSoLuuTruModalVisible(true)
                                // navigate(`?id=${record.id}`)
                                setSearchParams({
                                    id : record.id,
                                    maTTHC : record.maTTHC,
                                    maTruongHop : record.maTruongHop,
                                    donViId : record.donViId,
                                }) 
                                hoSoNhapContext.setMaHoSoLuuTru(record.id)
                                hoSoNhapContext.setMaTruongHop(record.maTruongHop)
                                hoSoNhapContext.setDonViId(record.donViId)
                                hoSoNhapContext.setMaTTHCHoSoLuuTru(record.maTTHC)
                            }} />
                            <Popconfirm
                                title='Xoá?'
                                onConfirm={() => {
                                    dispatch(DeleteHoSoNhap({ ids: [record.id], lyDoXoa: "", forceDelete: false }))
                                }}
                                okText='Xoá'
                                cancelText='Huỷ'
                            >
                                <DeleteOutlined style={{ color: "tomato" }} />
                            </Popconfirm>
                        </Space>
                    )
                }
            }
        ]
    return columns
}