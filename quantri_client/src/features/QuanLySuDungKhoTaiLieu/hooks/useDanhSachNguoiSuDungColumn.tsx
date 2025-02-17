import React, { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined, LinkOutlined, ShareAltOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/lib/redux/Hooks'
import { IBasePagination } from '@/models'
import { AntdSpace } from '@/lib/antd/components'
import { FORMAT_TIME, ID_SEPARATE } from '@/data'
import { callApiAndDisplayFile } from '@/utils'
import { toast } from 'react-toastify'
import { ISearchThongKeNguoiSuDungKho, IThongKeNguoiSuDungKho } from '@/features/portaldvc/HoSoCaNhan/components/KhoTaiLieuCongDan/models'
import dayjs from 'dayjs'
import { khoTaiLieuCongDanApi } from '@/features/portaldvc/HoSoCaNhan/components/KhoTaiLieuCongDan/services'

export const useDanhSachNguoiSuDungColumn = ({ searchParams, setSearchParams, setDetailModalVisible, setRecordId,setIsViewDetail }: {
    searchParams: ISearchThongKeNguoiSuDungKho,
    setSearchParams : React.Dispatch<React.SetStateAction<ISearchThongKeNguoiSuDungKho>>;
    setDetailModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setIsViewDetail: React.Dispatch<React.SetStateAction<boolean>>;
    setRecordId: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
    const dispatch = useAppDispatch()
    const columns = useMemo((): ColumnsType<IThongKeNguoiSuDungKho> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (_, record, idx) => {
                    const pageNumberr = searchParams.pageNumber ?? 1
                    const pageSizee = searchParams.pageSize ?? 10
                    return <>{(pageNumberr - 1) * pageSizee + idx + 1}</>
                },
            },
            {
                title: <p style={{ textAlign: 'center' }}>Số định danh</p>,
                key: "soDinhDanh",
                dataIndex: "soDinhDanh",
            },
            {
                title: <p style={{ textAlign: 'center' }}>Họ và tên</p>,
                key: "fullName",
                dataIndex: "fullName",
            },
            {
                title: <p style={{ textAlign: 'center' }}>Thông tin</p>,
                key: "nguon",
                align: 'left',
                render: (_, record) => {
                    return (<>
                        <p><b>Tổng: {(Math.floor((record.tongDungLuong ?? 0) * 100) / 100).toString()} MB
                        ({record.soLuong} tài liệu):</b></p>
                        <p>- Công dân tải lên: {(Math.floor((record.tongDungLuongCongDanTaiLen ?? 0) * 100) / 100).toString()} MB
                            ({record.soLuongCongDanTaiLen} tài liệu)</p>
                        <p>- Thành phần hồ sơ: {(Math.floor((record.tongDungLuongThanhPhanHoSo ?? 0) * 100) / 100).toString()} MB
                            ({record.soLuongThanhPhanHoSo} tài liệu)</p>
                        <p>- Kết quả giải quyết: {(Math.floor((record.tongDungLuongKetQuaGiaiQuyet ?? 0) * 100) / 100).toString()} MB
                            ({record.soLuongKetQuaGiaiQuyet} tài liệu)</p>
                    </>)
                }
            },

            {
                title: <p style={{ textAlign: 'center' }}>Thời gian tạo kho</p>,
                key: "createdOn",
                align: 'center',
                render: (_, record) => {
                    return (<>
                        {record.createdOn ? dayjs(record.createdOn).format(FORMAT_TIME) : ''}
                    </>)
                }
            },
            {
                title: "Thao tác",
                dataIndex: '',
                width:"10%",
                align:'center',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <EditOutlined style={{color:"cornflowerblue"}} title="Sửa" onClick={() => {
                            setRecordId(record.id)
                            setDetailModalVisible(true)
                            setIsViewDetail(false)

                        }} />
                        <EyeOutlined style={{color:"cornflowerblue"}} title="Xem chi tiết" onClick={() => {
                            setRecordId(record.id)
                            setDetailModalVisible(true)
                            setIsViewDetail(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={async () => {
                                try {
                                    await khoTaiLieuCongDanApi.DeleteKhoLuuTru({forceDelete: false, id: record.id})
                                    setSearchParams((curr) => ({...curr}))
                                    toast.error("Thao tác thành công")
                                } catch (error) {
                                    toast.error("Thao tác không thành công, vui lòng thử lại sau")
                                }
                            }}
                            okText='Xoá'
                            cancelText='Huỷ'
                        >
                            <DeleteOutlined style={{color:"tomato"}}/>
                        </Popconfirm>
                    </Space>
                )
            }
        ]
    }, [searchParams])
    return { columns }
}