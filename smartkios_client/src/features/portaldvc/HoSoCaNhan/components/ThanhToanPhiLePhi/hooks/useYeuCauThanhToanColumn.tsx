                        
import { IHoSo } from "@/features/hoso/models"
import { FormInstance } from "antd"
import { ColumnsType } from "antd/es/table"
import { useMemo } from "react"
import { getCurrency } from "@/utils"
import { IYeuCauThanhToan, YEUCAUTHANHTOAN_TRANGTHAI } from "@/features/yeucauthanhtoan/models"
import { Link, useNavigate } from "react-router-dom"
import { Service } from "@/services"
import { AntdButton } from "@/lib/antd/components"

export const useYeuCauThanhToan = ({ dataSource }: { dataSource: IYeuCauThanhToan[] | undefined }) => {
    const navigate = useNavigate()
    const columns = useMemo((): ColumnsType<IYeuCauThanhToan> => {
        return [
            {
                title: "Mã hồ sơ",
                key: "maHoSo",
                dataIndex: "maHoSo",
            },
            {
                title: "Phí/Lệ phí",
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
            },
            {
                title: "Thao tác",
                key:"ThaoTac",
                render: (_, record, idx) => {
                    if(record.trangThai == YEUCAUTHANHTOAN_TRANGTHAI["Hủy thanh toán"] || record.trangThai == YEUCAUTHANHTOAN_TRANGTHAI["Đã thanh toán"]){
                        return <></>
                    }
                    return <AntdButton onClick={() => {
                        navigate(Service.primaryRoutes.portaldvc.thanhToan + `?maHoSo=${record.maHoSo}`)
                    }} >Thanh toán</AntdButton>
                }
            }
        ]
    }, [dataSource])
    return {columns}
}