import { useEffect, useMemo, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Dropdown, MenuProps, Space, Tag, Typography } from 'antd'
import {
  BorderOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  LinkOutlined,
  MailOutlined,
  PhoneOutlined,
} from '@ant-design/icons'

import dayjs from 'dayjs'
import {
  FORMAT_DATE,
  FORMAT_DATE_WITHOUT_SECOND,
  FORMAT_DATE_WITHOUT_TIME,
  ID_SEPARATE,
} from '@/data'
import { AntdSpace } from '@/lib/antd/components'

import { TrangThaiTag } from '@/components/common'
import { callApiAndDisplayFile, getCurrency } from '@/utils'
import { IBasePagination } from '@/models'
import { useButtonActionContext } from '@/features/hoso/contexts/ButtonActionsContext'
import { IHoSo, TRANGTHAITHUPHI } from '@/features/hoso/models'
import { KENH_THUC_HIEN_LOWERCASE, TRANGTHAIHOSO } from '@/features/hoso/data/formData'

export type HoSoTableActions = {
  icon: React.ReactNode
}

export const useHoSoToiHanColumn = (
  pagination: IBasePagination,
  items: HoSoTableActions[]
) => {
  const buttonActionContext = useButtonActionContext()

  const [useViTriHoSo, setUseViTriHoSo] = useState<boolean>(false)
  useEffect(() => {
    if (items) {
      if (items.filter((x: any) => x.key == 'viTriLuuHoSo').length > 0)
        setUseViTriHoSo(true)
    }
  }, [items])


  const onViewDetail = (hoSoId: string) => {
    buttonActionContext.setSelectedHoSos([hoSoId])
    buttonActionContext.setChiTietHoSoModalVisible(true)
  }

  const columns = useMemo((): ColumnsType<
    IHoSo & { daHetHanBoSung?: boolean }
  > => {
    return [
      {
        title: <p style={{ fontSize: 16, textAlign: 'center' }}>STT</p>,
        width: '5%',
        align: 'center',
        render: (text, record, index) => index + 1,
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
              {record.ngayTiepNhan
                ? dayjs(record.ngayTiepNhan).format(FORMAT_DATE_WITHOUT_SECOND)
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
                  marginBottom: '8px'
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
                style={{ fontWeight: '400', marginBottom: 0 }}
                ellipsis={{ rows: 2, expandable: true, symbol: 'Xem thêm' }}
              >
                - {record.trichYeuHoSo}
              </Typography.Paragraph>
              <Typography.Paragraph
                style={{ fontWeight: '400', marginBottom: 0 }}
                ellipsis={{ rows: 2, expandable: true, symbol: 'Xem thêm' }}
              >
                - Trạng thái hồ sơ : {record.trangThaiHoSoId ? TRANGTHAIHOSO[record.trangThaiHoSoId] : ""}
              </Typography.Paragraph>
              {/* <div style={{fontWeight: '500'}}> - Ngày tạo: {record.ngayTiepNhan ? dayjs(record.ngayTiepNhan).format(FORMAT_DATE) : ""}</div> */}
              {record.trangThaiHoSoId == '1' ? gioDangKy : gioTiepNhan}
              <div style={{ fontWeight: '500' }}>
                {record.danhGia ? (
                  <>
                    <div>
                      - Đánh giá:
                      {record.danhGia == 'RẤT HÀI LÒNG' ? (
                        <button
                          className="btn sohappy"
                          style={{
                            backgroundColor: '#903938',
                            color: '#fff',
                            cursor: 'default',
                            fontSize: '12px',
                            padding: '3px 10px',
                            marginLeft: '5px',
                          }}
                        >
                          <i
                            className="fa-solid fa-thumbs-up"
                            style={{ color: '#fff', marginRight: '5px' }}
                          ></i>
                          <span>RẤT HÀI LÒNG</span>
                        </button>
                      ) : record.danhGia == 'HÀI LÒNG' ? (
                        <button
                          className="btn happy"
                          style={{
                            backgroundColor: '#67A99F',
                            color: '#fff',
                            cursor: 'default',
                            fontSize: '12px',
                            padding: '3px 10px',
                            marginLeft: '5px',
                          }}
                        >
                          <i
                            className="fa-solid fa-thumbs-up"
                            style={{ color: '#fff', marginRight: '5px' }}
                          ></i>
                          <span>HÀI LÒNG</span>
                        </button>
                      ) : (
                        <button
                          className="btn nohappy"
                          style={{
                            backgroundColor: '#8F969C',
                            color: '#fff',
                            cursor: 'default',
                            fontSize: '12px',
                            padding: '3px 10px',
                            marginLeft: '5px',
                          }}
                        >
                          <i
                            className="fa-solid fa-thumbs-down"
                            style={{ color: '#fff', marginRight: '5px' }}
                          ></i>
                          <span>KHÔNG HÀI LÒNG</span>
                        </button>
                      )}
                    </div>
                    {record.noiDungDanhGia ? (
                      <div>- Nội dung đánh giá: {record.noiDungDanhGia}</div>
                    ) : (
                      ''
                    )}
                  </>
                ) : (
                  <></>
                )}
              </div>
              {/* <div style={{fontWeight: '500'}}> - Đăng ký nhận kết quả: </div> */}
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
              <div style={{ fontWeight: '500', marginBottom: '6px' }}>
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
        title: <p style={{ fontSize: 16, textAlign: 'center' }}>Phí, lệ phí</p>,
        key: "trangThaiPhiLePhi",
        dataIndex: "trangThaiPhiLePhi",
        filters: [
          {
            text: 'Chờ thanh toán',
            value: 'Chờ thanh toán',
          },
          {
            text: 'Đã thanh toán',
            value: 'Đã thanh toán',
          },
        ],
        filterMultiple: false,
        filterMode: 'menu',
        // filterSearch: true,
        align: 'center',
        render: (text, record) => {
          let trangThai = record?.trangThaiThuPhi
          let trangThais = trangThai?.split(ID_SEPARATE)
          let displayTrangThai = ''
          // if (trangThais && trangThais?.length > 0) {
          // const trangThaiConLai = trangThais.filter(
          //   (x) => x != TRANGTHAITHUPHI['Đã thanh toán']
          // )
          // displayTrangThai =
          //   trangThaiConLai && trangThaiConLai.length > 0
          //     ? trangThaiConLai[0]
          //     : trangThais[0]
          // }
          if (trangThais?.includes(TRANGTHAITHUPHI["Chờ thanh toán"])) {
            displayTrangThai = TRANGTHAITHUPHI["Chờ thanh toán"]
          } else if (trangThais?.includes(TRANGTHAITHUPHI["Chưa thanh toán"])) {
            displayTrangThai = TRANGTHAITHUPHI["Chưa thanh toán"]
          } else if (trangThais?.includes(TRANGTHAITHUPHI["Đã thanh toán"])) {
            displayTrangThai = TRANGTHAITHUPHI["Đã thanh toán"]
          } else if (trangThais?.includes(TRANGTHAITHUPHI["Hủy thanh toán"])) {
            displayTrangThai = TRANGTHAITHUPHI["Hủy thanh toán"]
          } else if (trangThais?.includes(TRANGTHAITHUPHI["Hoàn phí"])) {
            displayTrangThai = TRANGTHAITHUPHI["Hoàn phí"]
          }
          return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {displayTrangThai ? <Tag color={displayTrangThai == TRANGTHAITHUPHI["Đã thanh toán"] ? "green-inverse" : displayTrangThai == TRANGTHAITHUPHI["Chờ thanh toán"] ? "orange-inverse" : "default"}>{displayTrangThai}</Tag> : null}
              <div style={{ marginTop: '5px' }}>
                {text == true ? <CheckCircleOutlined style={{ color: 'green' }}></CheckCircleOutlined> : <CloseCircleOutlined style={{ color: 'red' }}></CloseCircleOutlined>}
              </div>
            </div>
          )
        },
        width: '10%',
      },
      // {
      //   title: <p style={{ fontSize: 16, textAlign: 'center' }}>Kết quả</p>,
      //   key: "ketQua",
      //   render: (_, record) => {
      //     return (
      //       <>

      //         <div style={{ fontWeight: '500' }}>
      //           - Số ký hiệu: {record.soKyHieuKetQua}
      //         </div>
      //         {record.trichYeuKetQua ?
      //           <div style={{ display: 'flex', flexDirection: 'row' }}>
      //             {/* <span>- </span> */}
      //             <Typography.Paragraph
      //               style={{ fontWeight: '500', marginBottom: 0 }}
      //               ellipsis={{ rows: 2, expandable: true, symbol: 'Xem thêm' }}
      //             >
      //               - {record.trichYeuKetQua}
      //             </Typography.Paragraph>
      //           </div> : null
      //         }

      //         <div style={{ display: 'flex', flexDirection: 'row', fontWeight: '500', alignItems: 'center' }}>
      //           <span>- Đính kèm:</span>
      //           {record.dinhKemKetQua?.split(ID_SEPARATE).map((dinhKem, idx) =>
      //             <AntdSpace direction="horizontal" onClick={() => callApiAndDisplayFile(dinhKem)} key={idx}>
      //               {''} <LinkOutlined style={{ color: "yellowgreen" }} role='button' title={dinhKem.substring(dinhKem.lastIndexOf("/") + 1)} />
      //             </AntdSpace>
      //           )}
      //         </div>


      //       </>
      //     )
      //   }
      // },
      {
        title: <p style={{ display: `${useViTriHoSo}` }}>Vị trí hồ sơ</p>,
        key: "viTriDeHoSo",
        dataIndex: "viTriDeHoSo",
        align: 'center',
        hidden: !useViTriHoSo

      },
      {
        title: <p style={{ fontSize: 16, textAlign: 'center' }}>Người xử lý</p>,
        key: 'nguoiXuLyTiep',
        dataIndex: 'nguoiXuLyTiep',
        render: (_, record) => {
          return (
            <div
              style={{
                display: 'flex',
                alignSelf: 'flex-start',
                flexDirection: 'column',
              }}
            >
              <div>
                <span style={{ fontWeight: '500' }}>{record.nguoiXuLyTiep}</span>
              </div>
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
        render: (_, record) => {
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
              {/* <Dropdown menu={{ items }} trigger={['click']}>
                            <a onClick={(e) => {
                                e.preventDefault()
                                buttonActionContext.setSelectedHoSos([record.id])
                            }}>
                                <Space>
                                    Chức năng
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown> */}
            </Space>
          )
        },
      },
    ]
  }, [pagination])
  return { columns }
}
