import { useMemo, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space, TableColumnsType, Tag, Tooltip, Typography } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, DownloadOutlined, EditOutlined, EyeOutlined, LinkOutlined, MailOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
import { IBasePagination } from '../../../models'
import { DEFAULT_TABLE_CELL_LOAD_MORE_LENGTH, ID_SEPARATE } from '@/data'
import { IHoSo } from '@/features/hoso/models'
import { useTheoDoiHoSoChungThucContext } from '../contexts/TheoDoiHoSoChungThucContext'
import dayjs from "dayjs"
import { useButtonActionContext } from '@/features/hoso/contexts/ButtonActionsContext'
import { AntdSpace } from '@/lib/antd/components'
import { DownloadAndSaveFile } from '@/utils/common'
import { callApiAndDisplayFile } from '@/utils'
import { hoSoApi } from '@/features/hoso/services'
import { toast } from 'react-toastify'


export const useTheoDoiHoSoChungThucColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const theoDoiHoSoChungThucContext = useTheoDoiHoSoChungThucContext()
    const buttonActionContext = useButtonActionContext()
    const columns = useMemo((): TableColumnsType<IHoSo> => {
        return [
            {
                title: "STT",
                key: 'STT',
                width:"5%",
                render: (_, record, idx) => {
                  const pageNumber = pagination.pageNumber ?? 1
                  const pageSize = pagination.pageSize ?? 10
                  return <>{(pageNumber - 1) * pageSize + idx + 1}</>
                },
            },
            {
                title: <p style={{ textAlign: 'center' }}> Mã hồ sơ</p>,
                key: "maChungThuc",
                dataIndex: "maChungThuc",
            },
            {
                title: <p style={{ textAlign: 'center' }}> Số chứng thực giấy</p>,
                key: "soChungThucGiay",
                dataIndex: "soChungThucGiay",
                align: 'center'

            },
            {
                title: <p style={{ textAlign: 'center' }}> Số chứng thực điện tử</p>,
                key: "soChungThucDienTu",
                dataIndex: "soChungThucDienTu",
                align: 'center'
            },
            {
                title: <p style={{ textAlign: 'center' }}>Tên đối tượng đăng ký</p>,
                key: "tenDoiTuongDangKy",
                dataIndex: "tenDoiTuongDangKy",
            },
            {
                title: <p style={{ textAlign: 'center' }}> Số CMT/CCCD</p>,
                key: "soGiayTo",
                dataIndex: "soGiayTo",
                align: 'center',

            },
            {
                title: <p style={{ textAlign: 'center' }}> Ngày đăng ký</p>,
                key: "ngayDangKy",
                dataIndex: "ngayDangKy",
                align: 'center',
                render(value, record, index) {
                    return (
                        <>
                            <div
                                style={{ fontWeight: '400' }}
                            >
                                {dayjs(record.ngayDangKy).format('DD/MM/YYYY')}
                            </div>
                        </>
                    )
                },
            },
            {
                title: <p style={{ textAlign: 'center' }}> Trạng thái</p>,
                key: "tenTrangThaiHoSo",
                dataIndex: "tenTrangThaiHoSo",
            },
            {
                title: <p style={{ textAlign: 'center' }}> Đính kèm</p>,
                key: "dinhKem",
                dataIndex: "dinhKem",
                render: (_, record) => {
                    return <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        {record.dinhKem?.split(ID_SEPARATE).map((dinhKem, idx) =>
                            <AntdSpace direction="horizontal" onClick={() => callApiAndDisplayFile(dinhKem)} key={idx}>
                                <LinkOutlined style={{ color: "yellowgreen",fontSize : '15px' }} role='button' title={dinhKem.substring(dinhKem.lastIndexOf("/") + 1)} />
                            </AntdSpace>
                        )}

                    </div>
                }
            },
            {
                title: "Thao tác",
                dataIndex: '',
                width: "10%",
                align: 'center',
                fixed: 'right',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <EyeOutlined style={{ color: "cornflowerblue",fontSize : '15px' }} title="Xem chi tiết" onClick={(e) => {
                            buttonActionContext.setChiTietHoSoModalVisible(true)
                            buttonActionContext.setSelectedHoSos([record.id])

                        }} />
                        {record.dinhKem?.split(ID_SEPARATE).map((dinhKem, idx) =>
                            <AntdSpace direction="horizontal" key={idx}>
                                <DownloadOutlined style={{ color: "darkorchid",fontSize : '15px' }} title="Tải về" onClick={async () => {
                                    DownloadAndSaveFile(dinhKem)
                                }} />
                            </AntdSpace>
                        )}
                        {record.trangThaiHoSoId == "10" ?
                            <Popconfirm
                                title='Yêu cầu gửi Email?'
                                onConfirm={async () => {
                                    const res = await hoSoApi.GuiEmailTheoDoiHoSoChungThuc({ id: record.id })
                                    if (res.status == 200) {
                                        toast.success("Yêu cầu gửi email thành công")
                                    }
                                    else {
                                        toast.error("Có lỗi khi yêu cầu gửi email")
                                    }
                                }}
                                okText='Yêu cầu'
                                cancelText='Huỷ'
                            >
                                <MailOutlined title="Yêu cầu gửi lại Email" style={{ color: "brown",fontSize : '15px' }} />
                            </Popconfirm> : null
                        }

                    </Space>
                )
            }
        ]
    }, [pagination])
    return { columns }
}