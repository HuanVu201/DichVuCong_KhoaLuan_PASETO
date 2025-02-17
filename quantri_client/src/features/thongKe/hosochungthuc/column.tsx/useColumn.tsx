import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, DesktopOutlined, EditOutlined, EyeFilled, EyeOutlined, PrinterOutlined, SnippetsOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { FORMAT_DATE, FORMAT_DATE_WITHOUT_TIME, YEAR } from '@/data'
import { thanhPhanHoSoApi } from '@/features/thanhphanhoso/services'
import { hoSoApi } from '@/features/hoso/services'
import { fillSoChungThuc } from '@/utils/common'
import { getCurrency, leading0 } from '@/utils'
import { IBasePagination } from '@/models'
import { useAppDispatch, useAppSelector } from '@/lib/redux/Hooks'
import { useThongKeHoSoChungThucContext } from '../contexts/ThongKeHSCTContext'
import { ISoChungThuc, IThongKeHoSoChungThuc, } from '@/features/sochungthuc/models'
import { Link } from 'react-router-dom'

export const useColumn = (pagination: IBasePagination,) => {
    const dispatch = useAppDispatch()
    const thongKeSoChungThucContext = useThongKeHoSoChungThucContext()
    const { publicModule } = useAppSelector(state => state.config)


    const columns = useMemo((): ColumnsType<IThongKeHoSoChungThuc> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: <p style={{ textAlign: 'center' }}>Đơn vị</p>,
                key: "tenDonVi",
                dataIndex: "tenDonVi",
            },
            {
                title: "Tổng số bản chứng thực",
                key: "tongSoHoSo",
                dataIndex: "tongSoHoSo",
                align: 'center'
            },
            {
                title: "Tổng số bản giấy",
                key: "banGiay",
                dataIndex: "banGiay",
                align: 'center',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <div role="button" title="Xem chi tiết bản giấy" onClick={() => {
                            thongKeSoChungThucContext.setMaThongKeHoSoChungThuc(record.donViId)
                            thongKeSoChungThucContext.setThongKeHoSoChungThucModalVisible(true)
                            thongKeSoChungThucContext.setLaHoSoDienTu(false)
                        }} >
                            {record.banGiay ?
                                <Link to="">{getCurrency(record.banGiay)}</Link> : record.banGiay
                            }
                        </div >
                    </Space>
                )
            },
            {
                title: "Tổng số bản điện tử",
                key: "banDienTu",
                dataIndex: "banDienTu",
                align: 'center',
                render: (_, record) => (
                    <Space direction="horizontal">

                        <div role="button" title="Xem chi tiết bản điện tử" onClick={() => {
                            thongKeSoChungThucContext.setMaThongKeHoSoChungThuc(record.donViId)
                            thongKeSoChungThucContext.setThongKeHoSoChungThucModalVisible(true)
                            thongKeSoChungThucContext.setLaHoSoDienTu(true)
                        }} >
                            {record.banDienTu ?
                                <Link to="">{getCurrency(record.banDienTu)}</Link> : record.banDienTu
                            }
                        </div  >
                    </Space>

                )
            },

        ]
    }, [pagination])
    return { columns }
}