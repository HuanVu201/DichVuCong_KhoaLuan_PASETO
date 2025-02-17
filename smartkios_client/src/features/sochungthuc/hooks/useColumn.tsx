import { useMemo } from 'react'
import { ISoChungThuc, SOCHUNGTHUC_LOAI } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../../lib/redux/Hooks'
import { DeleteSoChungThuc } from '../redux/action'
import { IBasePagination } from '../../../models'
import { useSoChungThucContext } from '../contexts/SoChungThucContext'
import dayjs from 'dayjs'
import { FORMAT_DATE, FORMAT_DATE_WITHOUT_TIME } from '@/data'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const soChungThucContext = useSoChungThucContext()
    const { datas: donVis } = useAppSelector(state => state.cocautochuc)

    const columns = useMemo((): ColumnsType<ISoChungThuc> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Tên số chứng thực",
                key: "tenSo",
                dataIndex: "tenSo",
                align: 'center'

            },
            {
                title: "Đơn vị",
                key: "donVi",
                dataIndex: "donVi",
                align: 'center',
                render: (_, record) => {
                    const donVi = donVis?.find(x => x.groupCode == record.donVi)
                    if (donVi) {
                        return donVi.groupName
                    }
                    return "Không tìm thấy";
                }
            },
            {
                title: "Ngày bắt đầu",
                key: "ngayBatDau",
                dataIndex: "ngayBatDau",
                render: (_, record) => {
                    return <>{record.ngayBatDau ? dayjs(record.ngayBatDau).format(FORMAT_DATE_WITHOUT_TIME) : null}</>
                },
                align: 'center'
            },
            {
                title: "Ngày đóng sổ",
                key: "ngayDongSo",
                dataIndex: "ngayDongSo",
                render: (_, record) => {
                    return <>{record.ngayDongSo ? dayjs(record.ngayDongSo).format(FORMAT_DATE_WITHOUT_TIME) : null}</>
                },
                align: 'center'
            },
            {
                title: "Trạng thái",
                key: "trangThai",
                dataIndex: "trangThai",
                align: 'center',
                render: (text) => text == true ? "Đang mở" : "Đã đóng"
            },
            {
                title: "Loại",
                key: "loai",
                dataIndex: "loai",
                align: 'center',
                render: (_, record) => {
                    return (
                        <>{record.loai ? SOCHUNGTHUC_LOAI[record.loai] : ""}</>
                    )
                }
            },
            {
                title: "Thao tác",
                dataIndex: '',
                width: "10%",
                align: 'center',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <EditOutlined style={{ color: "cornflowerblue" }} title="Xem chi tiết/Sửa" onClick={() => {
                            soChungThucContext.setMaSoChungThuc(record.id)
                            soChungThucContext.setSoChungThucModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteSoChungThuc({ id: record.id, forceDelete: false }))
                            }}
                            okText='Xoá'
                            cancelText='Huỷ'
                        >
                            <DeleteOutlined style={{ color: "tomato" }} />
                        </Popconfirm>
                    </Space>
                )
            }
        ]
    }, [pagination])
    return { columns }
}