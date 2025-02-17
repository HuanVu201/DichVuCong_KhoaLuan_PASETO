import { useMemo } from 'react'
import { ISoChungThuc, SOCHUNGTHUC_LOAI } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space, Tag } from 'antd'
import { DeleteOutlined, EditOutlined, EyeFilled, EyeOutlined, PrinterOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../../lib/redux/Hooks'
import { DeleteSoChungThuc } from '../redux/action'
import { IBasePagination } from '../../../models'
import { useSoChungThucContext } from '../contexts/SoChungThucContext'
import dayjs from 'dayjs'
import { FORMAT_DATE, FORMAT_DATE_WITHOUT_TIME } from '@/data'
import { thanhPhanHoSoApi } from '@/features/thanhphanhoso/services'
import { HoSoChungThucResponse, hoSoApi } from '@/features/hoso/services'
import { fillSoChungThuc } from '@/utils/common'
import { getCurrency } from '@/utils'

export const useDanhSachGiayToColumn = () => {
   const dispatch = useAppDispatch()
   const { loaiSoChungThuc } = useSoChungThucContext()

   const columns = useMemo((): ColumnsType<HoSoChungThucResponse> => {
      return [
         {
            title: "STT",
            width: "5%",
            align: "center",
            render: (text, record, index) => index + 1,
         },
         {
            title: "Số chứng thực",
            key: "so",
            dataIndex: "so",
            render: (_, record) => {
               return <>{loaiSoChungThuc == SOCHUNGTHUC_LOAI["Điện tử"] ? `${record.so}/ĐT` : record.so}</>
            }
         },
         {
            title: "Ngày, tháng, năm chứng thực",
            key: "ngayChungThuc",
            render: (_, record) => {
               return <>{record.ngayChungThuc ? dayjs(record.ngayChungThuc).format(FORMAT_DATE_WITHOUT_TIME) : null}</>
            },
            align: 'center'
         },
         {
            title: "Họ tên của người yêu cầu chứng thực",
            key: "chuHoSo",
            dataIndex: "chuHoSo",
            align: 'center'

         },
         {
            title: "Tên của bản chính giấy tờ, văn bản",
            key: "tenGiay",
            render: (_, record) => {
               return <>{record?.tenGiayTo} ({record.ten})</>
            }
         },
         // {
         //    title: 'Bản điện tử',
         //    key: 'kyDienTuBanGiay',
         //    dataIndex: 'kyDienTuBanGiay',
         //    render: (_, record, idx) => {
         //      return (
         //        <Tag
         //          style={{ minWidth: 60, textAlign: 'center' }}
         //          color={record.kyDienTuBanGiay ? 'success' : 'magenta'}
         //        >
         //          {record.kyDienTuBanGiay ? 'Có' : 'Không'}
         //        </Tag>
         //      )
         //    },
         //  },

         {
            title: "Họ tên, chức danh người ký chứng thực",
            key: "nguoiChungThuc",
            dataIndex: "nguoiChungThuc"
         },
         {
            title: "Số trang/Số bản",
            key: "soTrang",
            align: "center",
            render: (_, record) => {
               return <>
                  {loaiSoChungThuc == SOCHUNGTHUC_LOAI["Điện tử"] ?
                     `${record.soTrang}/1` : `${record.soTrang}/${record.soBanGiay}`
                  }
               </>
            }
         },
         {
            title: "Lệ phí/ Phí chứng thực",
            key: "soTien",
            render: (_, record) => {
               const tien = loaiSoChungThuc == SOCHUNGTHUC_LOAI["Điện tử"] ? record.soTienDT : record.soTienG;
               return <>{getCurrency(tien, ".")}</>
            }
         },
      ]
   }, [])
   return { columns }
}