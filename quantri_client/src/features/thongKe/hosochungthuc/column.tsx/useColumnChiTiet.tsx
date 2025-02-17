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
import { ISoChungThuc, IThongKeHoSoChungThuc, IThongKeHoSoChungThucChiTiet, } from '@/features/sochungthuc/models'

export const useColumnChiTiet = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const thongKeSoChungThucContext = useThongKeHoSoChungThucContext()
    const { publicModule } = useAppSelector(state => state.config)


    const columns = useMemo((): ColumnsType<IThongKeHoSoChungThucChiTiet> => {
        return [
            {
                title: "STT",
                width:"5%",
                key: 'STT',
                render: (_, record, idx) => {
                  const pageNumber = pagination.pageNumber ?? 1
                  const pageSize = pagination.pageSize ?? 10
                  return <>{(pageNumber - 1) * pageSize + idx + 1}</>
                },
            },
            {
                title: "Mã hồ sơ",
                key: "maHoSo",
                dataIndex: "maHoSo",

            },
            {
                title: "Chủ hồ sơ",
                key: "chuHoSo",
                dataIndex: "chuHoSo",
            },
            {
                title: "Tên giấy tờ",
                key: "tenGiayTo",
                dataIndex: "tenGiayTo",
            },
        ]
    }, [pagination])
    return { columns }
}