import { useMemo } from 'react'
import { IHoSo, TRANGTHAITHUPHI } from '@/features/hoso/models'
import { ColumnsType } from 'antd/es/table'
import { Dropdown, MenuProps, Space, Tag, Typography } from 'antd'
import {
    BorderOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
    DownOutlined,
    EditOutlined,
    MailOutlined,
    PhoneOutlined,
} from '@ant-design/icons'
import { IBasePagination } from '@/models'
import dayjs from 'dayjs'
import {
    FORMAT_DATE,
    FORMAT_DATE_WITHOUT_SECOND,
    FORMAT_DATE_WITHOUT_TIME,
    ID_SEPARATE,
} from '@/data'
import { useButtonActionContext } from '@/features/hoso/contexts/ButtonActionsContext'
import { AntdSpace } from '@/lib/antd/components'
import {
    KENH_THUC_HIEN,
    KENH_THUC_HIEN_LOWERCASE,
    TRANGTHAIHOSO,
    TRANGTHAITHANHTOAN,
} from '@/features/hoso/data/formData'
import { TrangThaiTag } from '@/components/common'
import { getCurrency } from '@/utils'

export type HoSoTableActions = {
    icon: React.ReactNode
}

export const useHoSoChoBoSungColumn = (
    pagination: IBasePagination,
    items: HoSoTableActions[]
) => {
    const buttonActionContext = useButtonActionContext()

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
                render: (_, record, idx) => {
                    const pageNumber = pagination.pageNumber ?? 1
                    const pageSize = pagination.pageSize ?? 10
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
            // {
            //     title: <p style={{ fontSize: 16, textAlign: 'center' }}>Lý do Trả lại/Rút hồ sơ</p>,
            //     key: "lyDoTuChoi",
            //     dataIndex: "lyDoTuChoi",
            // },
            {
                title: <p style={{ fontSize: 16, textAlign: 'center' }}>Phí, Lệ phí</p>,
                key: "trangThaiPhiLePhi",
                dataIndex: "trangThaiPhiLePhi",
                align: 'center',
                render: (text, record) => {
                    let trangThai = record?.trangThaiThuPhi
                    let trangThais = trangThai?.split(ID_SEPARATE)
                    let displayTrangThai = ''
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
                           
                        </Space>
                    )
                },
            },
        ]
    }, [pagination])
    return { columns }
}
