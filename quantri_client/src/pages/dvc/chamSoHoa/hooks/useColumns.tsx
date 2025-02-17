import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Space, Typography } from 'antd'
import {
  MailOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'
import {
  FORMAT_DATE_WITHOUT_SECOND,
} from '@/data'

import { useButtonActionContext } from '@/features/hoso/contexts/ButtonActionsContext'
import { IHoSo, ISearchHoSo } from '@/features/hoso/models'
import { KENH_THUC_HIEN_LOWERCASE } from '@/features/hoso/data/formData'

export type HoSoTableActions = {
  icon: React.ReactNode
}

export const useColumns = (
  searchParams: ISearchHoSo,
  items: HoSoTableActions[],
  setSoHoaModal: (hoSoId: string) => void,
) => {
  const buttonActionContext = useButtonActionContext()

  const onViewDetail = (hoSoId: string) => {
    setSoHoaModal(hoSoId)
  }

  const columns = useMemo((): ColumnsType<
    IHoSo & { daHetHanBoSung?: boolean }
  > => {
    return [
      {
        title: <p style={{ fontSize: 16, textAlign: 'center' }}>STT</p>,
        width: '5%',
        align: 'center',
        render: (_, record, idx) => {
          const pageNumber = searchParams.pageNumber ?? 1
          const pageSize = searchParams.pageSize ?? 10
          return <>{(pageNumber - 1) * pageSize + idx + 1}</>
        },
      },
      {
        title: (
          <p style={{ fontSize: 16, textAlign: 'center' }}>Thông tin hồ sơ</p>
        ),
        key: 'thongTinHoSo',
        render: (_, record) => {
          const gioTiepNhan = (
            <div style={{ fontWeight: '500' }}>
              {' '}
              - Tiếp nhận{' '}
              {(KENH_THUC_HIEN_LOWERCASE as any)[record.kenhThucHien]}:{' '}
              {record.ngayNopHoSo
                ? dayjs(record.ngayNopHoSo).format(FORMAT_DATE_WITHOUT_SECOND)
                : ''}
              , hẹn trả:{' '}
              {record.ngayHenTra
                ? dayjs(record.ngayHenTra).format(FORMAT_DATE_WITHOUT_SECOND)
                : ''}
            </div>
          )
          const gioDangKy = (
            <div style={{ fontWeight: '500' }}>
              {' '}
              - Ngày nộp hồ sơ:{' '}
              {record.ngayNopHoSo
                ? dayjs(record.ngayNopHoSo).format(FORMAT_DATE_WITHOUT_SECOND)
                : ''}
            </div>
          )
          return (
            <>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div
                  style={{ fontWeight: '500', color: '#2C62B9' }}
                  role="button"
                  onClick={() => onViewDetail(record.id)}
                >
                  {record.maHoSo}
                </div>
              </div>
              <Typography.Paragraph
                style={{ marginBottom: 0 }}
                ellipsis={{ rows: 2, expandable: true, symbol: 'Xem thêm' }}
              >
                - {record.trichYeuHoSo}
              </Typography.Paragraph>
              {/* <div style={{fontWeight: '500'}}> - Ngày tạo: {record.ngayTiepNhan ? dayjs(record.ngayTiepNhan).format(FORMAT_DATE) : ""}</div> */}
              {record.trangThaiHoSoId == '1' ? gioDangKy : gioTiepNhan}
            </>
          )
        },
      },
      {
        title: <p style={{ fontSize: 16, textAlign: 'center' }}>Chủ hồ sơ</p>,
        key: 'chuHoSo',
        render: (_, record) => {
          return (
            <div
              style={{
                display: 'flex',
                alignSelf: 'flex-start',
                flexDirection: 'column',
              }}
            >
              <div style={{ fontWeight: '500' }}>
                {record.chuHoSo} ({record.soGiayToChuHoSo})
              </div>
              {record.soDienThoaiChuHoSo ? (
                <div
                  style={{
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  role="button"
                  title="Số điện thoại"
                  onClick={() =>
                    window.open(`tel:+${record.soDienThoaiChuHoSo}`)
                  }
                >
                  {' '}

                  <i className="fa-solid fa-phone-volume" style={{ marginRight: 5, color: 'rgba(245, 158, 11, 1)' }}></i> {' '}
                  <span>{record.soDienThoaiChuHoSo}</span>
                </div>
              ) : null}
              {record.diaChiChuHoSo ? (
                <div
                  style={{
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                  }}
                  role="button"
                  title="Số điện thoại"
                >
                  {" "}
                  <i
                    className="fa-solid fa-map-marker-alt"
                    style={{ marginRight: 5, color: "rgba(245, 158, 11, 1)" }}
                  ></i>{" "}
                  <span>{record.diaChiChuHoSo}</span>

                </div>
              ) : null}
              {record.emailChuHoSo ? (
                <div
                  style={{
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  role="button"
                  onClick={() => window.open(`mailto:${record.emailChuHoSo}`)}
                >
                  {' '}
                  <MailOutlined title="Email" style={{ marginRight: 5, color: 'rgba(245, 158, 11, 1)' }} />{' '}
                  <span>{record.emailChuHoSo}</span>
                </div>
              ) : null}
            </div>
          )
        },
      },
      {
        title: <p style={{ fontSize: 16, textAlign: 'center' }}>Thao tác</p>,
        dataIndex: '',
        width: '10%',
        align: 'center',
        key: '',
        hidden: searchParams.trangThaiSoHoa == "2",

        render: (_, record) => {
          console.log(searchParams.trangThaiSoHoa);
          
          return (
            <Space direction="horizontal">
              {items?.map((item, index) => {
                return (
                  <span
                    key={index}
                    onClick={(e) => {
                      e.preventDefault()
                      buttonActionContext.setSelectedHoSos([record.id])
                    }}
                  >
                    {item.icon}
                  </span>
                )
              })}

            </Space>
          )
        },
      },
    ]
  }, [searchParams])
  return { columns }
}
