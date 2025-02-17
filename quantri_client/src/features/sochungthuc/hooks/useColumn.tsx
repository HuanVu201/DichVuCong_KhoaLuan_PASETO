import { useMemo } from 'react'
import { ISoChungThuc, SOCHUNGTHUC_LOAI } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined, EyeFilled, EyeOutlined, PrinterOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../../lib/redux/Hooks'
import { DeleteSoChungThuc } from '../redux/action'
import { IBasePagination } from '../../../models'
import { useSoChungThucContext } from '../contexts/SoChungThucContext'
import dayjs from 'dayjs'
import { FORMAT_DATE, FORMAT_DATE_WITHOUT_TIME, YEAR } from '@/data'
import { thanhPhanHoSoApi } from '@/features/thanhphanhoso/services'
import { hoSoApi } from '@/features/hoso/services'
import { fillSoChungThuc } from '@/utils/common'
import { getCurrency, leading0 } from '@/utils'
import { toast } from 'react-toastify'

export const useColumn = ({ pagination, setSearchParams }: { pagination: IBasePagination, setSearchParams: any }) => {
    const dispatch = useAppDispatch()
    const soChungThucContext = useSoChungThucContext()
    const { datas: donVis } = useAppSelector(state => state.cocautochuc)
    const { publicModule } = useAppSelector(state => state.config)
    const tenTinhThanh = useMemo(() => {
        return publicModule?.find(x => x.code == "ten-don-vi-lowercase")?.content ?? "......"
    }, [publicModule])

    const columns = useMemo((): ColumnsType<ISoChungThuc> => {
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
                title: "Tên số chứng thực",
                key: "tenSo",
                dataIndex: "tenSo",
                align: 'center'

            },
            {
                title: "Đơn vị",
                key: "groupName",
                dataIndex: "groupName",
                align: 'center',

            },
            {
                title: "Số hiện tại",
                key: "soBatDauHienTai",
                render: (_, record) => {
                    return <>{record.soHienTai - 1}</>
                },
                align: 'center'
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
                        <EyeOutlined style={{ fontSize: '15px' }} title="Xem danh sách giấy tờ" onClick={() => {
                            soChungThucContext.setMaSoChungThuc(record.id)
                            soChungThucContext.setDanhSachGiayToModalVisible(true)
                            soChungThucContext.setLoaiSoChungThuc(record.loai)
                        }} >

                        </EyeOutlined>

                        <EditOutlined style={{ color: "cornflowerblue", fontSize: '15px' }} title="Xem chi tiết/Sửa" onClick={() => {
                            soChungThucContext.setMaSoChungThuc(record.id)
                            soChungThucContext.setSoChungThucModalVisible(true)
                        }} />

                        <Popconfirm
                            title='Xác nhận in sổ chứng thực?'
                            onConfirm={async () => {
                                const res = await hoSoApi.SearchHoSoChungThuc({ soChungThucId: record.id, pageNumber: 1 })
                                if(!res.data.data){
                                    toast.info("Chưa có dữ liệu");
                                }
                                let TongSoTrang : number = 0
                                let TongSoBanGiay : number = 0; 
                                let TongSoTien :number = 0;
                                const formatData = res.data.data.map((item) => {
                                    const tien = soChungThucContext.loaiSoChungThuc == SOCHUNGTHUC_LOAI["Điện tử"] ? item.soTienDT : item.soTienG;
                                    TongSoTien += tien;
                                    TongSoBanGiay += item.soBanGiay;
                                    TongSoTrang += item.soTrang;
                                    return {
                                        ...item,
                                        ngayChungThuc: dayjs(item.ngayChungThuc).format(FORMAT_DATE_WITHOUT_TIME), soTien: getCurrency(tien, "."),
                                    }
                                })

                                const wrapperData = {
                                    data: formatData,
                                    TenDonVi: record.groupName,
                                    TenSoChungThuc: record.tenSo,
                                    FromDate: record.ngayBatDau ? leading0(dayjs(record.ngayBatDau).date()) : ".......",
                                    ToDate: record.ngayDongSo ? leading0(dayjs(record.ngayDongSo).date()) : ".......",
                                    FromMonth: record.ngayBatDau ? leading0(dayjs(record.ngayBatDau).get("month") + 1) : ".......",
                                    ToMonth: record.ngayDongSo ? leading0(dayjs(record.ngayDongSo).get("month") + 1) : ".......",
                                    FromYear: record.ngayBatDau ? leading0(dayjs(record.ngayBatDau).get("year")) : ".......",
                                    ToYear: record.ngayDongSo ? leading0(dayjs(record.ngayDongSo).get("year")) : ".......",
                                    Year: YEAR,
                                    TinhThanh: tenTinhThanh ?? "......",
                                    TongSo: leading0(formatData.length),
                                    TongSoTrang,
                                    TongSoBanGiay,
                                    TongSoTien: getCurrency(TongSoTien, ".")
                                    
                                }
                                const fillData = await fillSoChungThuc(import.meta.env.VITE_PUBLIC_PHOI_SOCHUNGTHUC, wrapperData)

                            }}
                            okText='Đồng ý'
                            cancelText='Huỷ'
                        >
                            <PrinterOutlined style={{ fontSize: '15px' }} title="In sổ chứng thực" />
                        </Popconfirm>
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={async () => {
                                await dispatch(DeleteSoChungThuc({ id: record.id, forceDelete: false })).unwrap()
                                setSearchParams((cur: any) => ({ ...cur }))

                            }}
                            okText='Xoá'
                            cancelText='Huỷ'
                        >
                            <DeleteOutlined style={{ color: "tomato", fontSize: '15px' }} />
                        </Popconfirm>

                    </Space>
                )
            }
        ]
    }, [pagination])
    return { columns }
}