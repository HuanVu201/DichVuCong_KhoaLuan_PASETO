import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Dropdown, MenuProps, Space, Tag, Typography } from 'antd'
import {
    BorderOutlined,
    DeleteOutlined,
    DownOutlined,
    EditOutlined,
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
import { getCurrency } from '@/utils'
import { IBasePagination } from '@/models'
import { useButtonActionContext } from '@/features/hoso/contexts/ButtonActionsContext'
import { IHoSo, TRANGTHAITHUPHI } from '@/features/hoso/models'
import { KENH_THUC_HIEN_LOWERCASE, TRANGTHAIHOSO } from '@/features/hoso/data/formData'

export type HoSoTableActions = {
    icon: React.ReactNode
}

export const useHoSoChuyenTaiKHoanColumn = (
    pagination: IBasePagination,
) => {

    const columns = useMemo((): ColumnsType<
        IHoSo & { daHetHanBoSung?: boolean }
    > => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
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
                            {record.ngayNopHoSo
                                ? dayjs(record.ngayNopHoSo).format(FORMAT_DATE_WITHOUT_SECOND)
                                : ''}

                            {record.ngayHenTra
                                ? ', hẹn trả ' + dayjs(record.ngayHenTra).format(FORMAT_DATE_WITHOUT_SECOND)
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
                            <Typography.Paragraph
                                style={{ fontWeight: '400', marginBottom: 0 }}
                                ellipsis={{ rows: 2, expandable: true, symbol: 'Xem thêm' }}
                            >
                                - Trạng thái hồ sơ : {record.trangThaiHoSoId ? TRANGTHAIHOSO[record.trangThaiHoSoId] : ""}
                            </Typography.Paragraph>
                            {record.trangThaiHoSoId == '1' ? gioDangKy : gioTiepNhan}

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
                                    {' '}
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
        ]
    }, [pagination])
    return { columns }
}
