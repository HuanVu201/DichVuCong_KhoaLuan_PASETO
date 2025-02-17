import { useMemo } from 'react'
import { IDuThaoXuLyHoSo, ISearchDuThaoXuLyHoSoResponse } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space, Typography } from 'antd'
import { DeleteOutlined, EditOutlined, LinkOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
import { DeleteDuThaoXuLyHoSo } from '../redux/action'
import { IBasePagination } from '../../../models'
import { HoSoTableActions } from '@/features/hoso/hooks/useHoSoColumn'
import { useButtonActionContext } from '@/features/hoso/contexts/ButtonActionsContext'
import { KENH_THUC_HIEN_LOWERCASE } from '@/features/hoso/data/formData'
import { FORMAT_DATE_WITHOUT_SECOND, ID_SEPARATE } from '@/data'
import dayjs from 'dayjs'
import { AntdSpace } from '@/lib/antd/components'
import { callApiAndDisplayFile } from '@/utils'
import { toast } from 'react-toastify'
import { useDuThaoXuLyHoSoContext } from '../contexts/DuThaoXuLyHoSoContext'
// import { useDuThaoXuLyHoSoContext } from '../contexts/DuThaoXuLyHoSoContext'

export const useColumn = (pagination: IBasePagination, items: HoSoTableActions[]) => {
    const buttonActionContext = useButtonActionContext()
    const duThaoContext = useDuThaoXuLyHoSoContext()
    const onViewDetail = (hoSoId: string,) => {
        buttonActionContext.setSelectedHoSos([hoSoId])
        buttonActionContext.setChiTietHoSoModalVisible(true)
    }
    const columns = useMemo((): ColumnsType<ISearchDuThaoXuLyHoSoResponse> => {
        return [
            {
                title: <p style={{ fontSize: 16, textAlign: "center" }}>STT</p>,
                width: "5%",
                align: "center",
                render: (_, record, idx) => {
                  const pageNumber = pagination.pageNumber ?? 1
                  const pageSize = pagination.pageSize ?? 10
                  return <>{(pageNumber - 1) * pageSize + idx + 1}</>
                },
            },
            {
                title: <p style={{ fontSize: 16, textAlign: "center" }}>Thông tin hồ sơ</p>,
                key: "thongTinHoSo",
                render: (_, record) => {
                    const gioTiepNhan = <div style={{ fontWeight: '500' }}> - Tiếp nhận {(KENH_THUC_HIEN_LOWERCASE as any)[record.kenhThucHien]}: {record.ngayNopHoSo ? dayjs(record.ngayNopHoSo).format(FORMAT_DATE_WITHOUT_SECOND) : ""}, hẹn trả: {record.ngayHenTra ? dayjs(record.ngayHenTra).format(FORMAT_DATE_WITHOUT_SECOND) : ""}</div>
                    const gioDangKy = <div style={{ fontWeight: '500' }}> - Ngày nộp hồ sơ: {record.ngayNopHoSo ? dayjs(record.ngayNopHoSo).format(FORMAT_DATE_WITHOUT_SECOND) : ""}</div>
                    return <>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div style={{ fontWeight: '500', color: "#2C62B9" }} role='button' onClick={() => onViewDetail(record.id)}>{record.maHoSo}</div>
                        </div>
                        <Typography.Paragraph style={{ fontWeight: '500', marginBottom: 0 }} ellipsis={{ rows: 2, expandable: true, symbol: "Xem thêm" }}>- {record.tenTTHC}</Typography.Paragraph>
                        {/* <div style={{fontWeight: '500'}}> - Ngày tạo: {record.ngayTiepNhan ? dayjs(record.ngayTiepNhan).format(FORMAT_DATE) : ""}</div> */}
                        {record.trangThaiHoSoId == "1" ? gioDangKy : gioTiepNhan}
                        {/* <div style={{fontWeight: '500'}}> - Đăng ký nhận kết quả: </div> */}
                    </>
                }
            },
            {
                title: <p style={{ fontSize: 16, textAlign: "center" }}>Chủ hồ sơ</p>,
                key: "chuHoSo",
                render: (_, record) => {
                    return <div style={{ display: "flex", alignSelf: "flex-start", flexDirection: "column" }}>
                        <div style={{ fontWeight: '500' }}>{record.chuHoSo} ({record.soGiayToChuHoSo})</div>
                        {record.soDienThoaiChuHoSo ? <div style={{ fontWeight: '500', display: "flex", alignItems: "center" }} role='button' onClick={() => window.open(`tel:+${record.soDienThoaiChuHoSo}`)}>                   <i className="fa-solid fa-phone-volume" style={{ marginRight: 5, color: 'rgba(245, 158, 11, 1)' }}></i> {' '}
                            <span>{record.soDienThoaiChuHoSo}</span></div> : null}
                        {record.emailChuHoSo ? <div style={{ fontWeight: '500', display: "flex", alignItems: "center" }} role='button' onClick={() => window.open(`mailto:${record.emailChuHoSo}`)}> <MailOutlined title="Email" style={{ marginRight: 3 }} /> <span>{record.emailChuHoSo}</span></div> : null}
                    </div>
                }
            },

            {
                title: <p style={{ fontSize: 16, textAlign: "center" }}>Người trình ký</p>,
                key: "tenNguoiXuLy",
                dataIndex: "tenNguoiXuLy"
            },
            {
                title: <p style={{ fontSize: 16, textAlign: "center" }}>Lãnh đạo ký</p>,
                key: "tenLanhDaoKy",
                dataIndex: "tenLanhDaoKy"
            },
            {
                title: <p style={{ fontSize: 16, textAlign: "center" }}>Trích yếu</p>,
                key: "trichYeu",
                dataIndex: "trichYeu"
            },
            {
                title: <p style={{ fontSize: 16, textAlign: "center" }}>Đính kèm</p>,
                key: "fileDinhKem",
                render: (_, record) => {
                    return <>
                        {record.fileDinhKem?.split(ID_SEPARATE).map((dinhKem, idx) =>
                            <AntdSpace direction="horizontal" onClick={() => callApiAndDisplayFile(dinhKem)} key={idx}>
                                {''} <LinkOutlined style={{ color: "yellowgreen" }} role='button' title={dinhKem.substring(dinhKem.lastIndexOf("/") + 1)} />
                            </AntdSpace>
                        )}
                    </>
                }
            },
            {
                title: <p style={{ fontSize: 16, textAlign: "center" }}>Trạng thái</p>,
                key: "trangThai",
                dataIndex: "trangThai"
            },
            {
                title: <p style={{ fontSize: 16, textAlign: "center" }}>Thao tác</p>,
                dataIndex: '',
                // width: "10%",
                align: 'center',
                key: '',
                render: (_, record) => {
                    return <Space direction="horizontal">
                        {items?.map((item, index) => {
                            return <span key={index} onClick={(e) => {

                                e.preventDefault()
                                buttonActionContext.setSelectedHoSos([record.hoSoId])
                            }}>{item.icon}</span>
                        })}

                        <EditOutlined style={{ color: "cornflowerblue" }} title="Cập nhật dự thảo" onClick={() => {
                            duThaoContext.setDuThaoId(record.id)
                            duThaoContext.setDuThaoXuLyHoSoModalVisible(true)
                        }} />


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
                }
            }
        ]
    }, [pagination])
    return { columns }
}