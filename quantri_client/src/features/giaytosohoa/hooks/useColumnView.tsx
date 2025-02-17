import { ColumnsType } from "antd/es/table"
import { IGiayToSoHoa, ISearchGiayToSoHoa } from "../models"
import { useMemo } from "react"
import { Popconfirm, Space, Typography } from "antd"
import { CheckOutlined, DeleteOutlined, EditOutlined, EyeOutlined, LinkOutlined, StopOutlined } from "@ant-design/icons"
import { FORMAT_DATE_WITHOUT_TIME, ID_SEPARATE } from "@/data"
import { callApiAndDisplayFile } from "@/utils"
import { AntdSpace } from "@/lib/antd/components"
import { useAppDispatch } from "@/lib/redux/Hooks"
import dayjs from "dayjs"
import { GIAYTOSOHOA_LOAISOHOA } from "@/features/hoso/data/formData"
import { useGiayToSoHoaContext } from "../contexts/GiayToSoHoaProvider"
import { giayToHoSoApi } from "@/features/giaytohoso/service"
import { toast } from "react-toastify"
import { giayToSoHoaApi } from "../services"


export const useViewGiayToSoHoaColumns = (searchParams: ISearchGiayToSoHoa, setSearchParams: React.Dispatch<React.SetStateAction<ISearchGiayToSoHoa>>) => {
  const columns = useMemo((): ColumnsType<IGiayToSoHoa> => {
    const trangThaiSoHoa12 = searchParams.trangThaiSoHoa == "1" || searchParams.trangThaiSoHoa == "2"
    return [
      {
        title: "STT",
        key: 'STT',
        width: "5%",
        render: (_, record, idx) => {
          const pageNumber = searchParams.pageNumber ?? 1
          const pageSize = searchParams.pageSize ?? 10
          return <>{(pageNumber - 1) * pageSize + idx + 1}</>
        },
      },
      {
        title: <p style={{ textAlign: 'center' }}>Mã/Tên giấy tờ</p>,
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
        hidden: trangThaiSoHoa12
      },
      {
        title: <p style={{ textAlign: 'center' }}>Chủ hồ sơ</p>,
        key: "chuHoSo",
        dataIndex: "chuHoSo",
      },
      {
        title: <p style={{ textAlign: 'center' }}>Ngày thực hiện số hóa</p>,
        key: "thoiGianSoHoa",
        dataIndex: "thoiGianSoHoa",
        align: 'center',
        render: (_, record) => {
          return <>
            <p><span style={{ fontWeight: 500 }}>{record.thoiGianSoHoa ? dayjs(record.thoiGianSoHoa).format(FORMAT_DATE_WITHOUT_TIME) : ""}</span></p>
          </>
        },
        hidden: trangThaiSoHoa12
      },
      {
        title: <p style={{ textAlign: 'center' }}>Người số hóa</p>,
        key: "fullName",
        dataIndex: "fullName"
      },
      {
        title: <p style={{ textAlign: 'center' }}>Đơn vị</p>,
        key: "groupName",
        dataIndex: "groupName"
      },
      {
        title: <p style={{ textAlign: 'center' }}>Thời hạn</p>,
        key: "thoiGianSoHoa",
        dataIndex: "thoiGianSoHoa",
        render: (_, record) => {
          return <>
            <p>- Ngày số hóa: <span style={{ fontWeight: 500 }}>{record.thoiGianSoHoa ? dayjs(record.thoiGianSoHoa).format(FORMAT_DATE_WITHOUT_TIME) : ""}</span></p>
            <p>- Ngày hết hạn: <span style={{ fontWeight: 500 }}>{record.thoiHanHieuLuc ? dayjs(record.thoiHanHieuLuc).format(FORMAT_DATE_WITHOUT_TIME) : ""}</span></p>
          </>
        },
        hidden: trangThaiSoHoa12
      },
      {
        title: <p style={{ textAlign: 'center' }}>Loại số hóa</p>,
        key: "loaiSoHoa",
        dataIndex: "loaiSoHoa",
        render: (_, record) => {
          return <>{record.loaiSoHoa ? (GIAYTOSOHOA_LOAISOHOA as any)[record.loaiSoHoa] : ""}</>
        },
      },
      {
        title: <p style={{ textAlign: 'center' }}>Đính kèm</p>,
        key: "dinhKem",
        dataIndex: "dinhKem",
        align: 'center',
        render: (_, record) => {
          return <>
            {record.dinhKem?.split(ID_SEPARATE).map((dinhKem, idx) =>
              <AntdSpace direction="horizontal" onClick={() => callApiAndDisplayFile(dinhKem)} key={idx}>
                <LinkOutlined role='button' title={dinhKem.substring(dinhKem.lastIndexOf("/") + 1)} />
              </AntdSpace>
            )}
          </>
        },
      },

    ]
  }, [searchParams])
  return { columns }
} 