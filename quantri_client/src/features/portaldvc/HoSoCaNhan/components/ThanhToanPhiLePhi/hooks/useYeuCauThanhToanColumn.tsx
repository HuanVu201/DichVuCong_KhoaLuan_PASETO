
import { IHoSo } from "@/features/hoso/models"
import { FormInstance, Typography } from "antd"
import { ColumnsType } from "antd/es/table"
import { useMemo } from "react"
import { getCurrency } from "@/utils"
import { IYeuCauThanhToan, YEUCAUTHANHTOAN_TRANGTHAI } from "@/features/yeucauthanhtoan/models"
import { Link, useNavigate } from "react-router-dom"
import { Service } from "@/services"
import { AntdButton } from "@/lib/antd/components"
import dayjs from "dayjs"

export const useYeuCauThanhToan = ({ dataSource }: { dataSource: IYeuCauThanhToan[] | undefined }) => {
    const navigate = useNavigate()
    const columns = useMemo((): ColumnsType<IYeuCauThanhToan> => {
        return [
            {
                title: "Mã hồ sơ",
                key: "maHoSo",
                dataIndex: "maHoSo",
                render: (_, record) => {
                    return <>
                        <p>{record.maHoSo}</p>
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
                title: "Phí/Lệ phí (VNĐ)",
                key: "phiLePhi",
                dataIndex: "phiLePhi",
                render: (_, record, idx) => {
                    const phi = record.phi ?? 0;
                    const lePhi = record.lePhi ?? 0;
                    return <>{getCurrency(phi, ".")}/ {getCurrency(lePhi, ".")}</>
                }
            },
            {
                title: "Tổng tiền",
                key: "tongTien",
                dataIndex: "tongTien",
                render: (_, record, idx) => {
                    return <>{getCurrency(record.soTien)}</>
                }
            },
            {
                title: "Trạng thái thanh toán",
                key: "trangThai",
                dataIndex: "trangThai",
                render: (_, record, idx) => {
                    return <>{record.trangThai}</>
                }
            },
            {
                title: "Người yêu cầu",
                key: "tenNguoiYeuCau",
                dataIndex: "tenNguoiYeuCau",
                render(value, record, index) {
                    return (
                        <>
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                <div
                                    style={{ fontWeight: '500' }}
                                >
                                    {record.tenNguoiYeuCau}
                                </div>
                                <div
                                    style={{ fontWeight: '400' }}
                                >
                                    {dayjs(record.ngayYeuCau).format('DD/MM/YYYY')}
                                </div>
                            </div>

                        </>
                    )
                },
            },
            {
                title: "Thao tác",
                key: "ThaoTac",
                render: (_, record, idx) => {
                    if (record.trangThai == YEUCAUTHANHTOAN_TRANGTHAI["Hủy thanh toán"] || record.trangThai == YEUCAUTHANHTOAN_TRANGTHAI["Đã thanh toán"] || record.trangThai == YEUCAUTHANHTOAN_TRANGTHAI["Đã hoàn phí"]) {
                        return <></>
                    }
                    return <AntdButton onClick={() => {
                        navigate(Service.primaryRoutes.portaldvc.thanhToan + `?maHoSo=${record.maHoSo}`)
                    }} >Thanh toán</AntdButton>
                }
            }
        ]
    }, [dataSource])
    return { columns }
}