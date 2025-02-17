import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined, RetweetOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
// import { DeleteLinhVuc } from '../redux/action'
import { IBasePagination } from '../../../models'
import { ILienThongQLVB } from '../models'
import { useLienThongQLVBContext } from '../context'
import dayjs from 'dayjs'
import axios from 'axios'
import { FORMAT_TIME, HOST_PATH } from '@/data'
import { toast } from 'react-toastify'

export const useVanBanColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const qlvbContext = useLienThongQLVBContext()
    const columns = useMemo((): ColumnsType<ILienThongQLVB> => {


        return [
            {
                title: <p style={{ textAlign: 'center', fontWeight: 600 }}>STT</p>,
                width: "5%",
                align: "center",
                render: (_, record, idx) => {
                    const pageNumber = pagination.pageNumber ?? 1
                    const pageSize = pagination.pageSize ?? 10
                    return <>{(pageNumber - 1) * pageSize + idx + 1}</>
                },
            },
            {
                title: <p style={{ textAlign: 'center', fontWeight: 600 }}>Mã hồ sơ</p>,
                key: "DocId",
                dataIndex: "DocId",
            },
            {
                title: <p style={{ textAlign: 'center', fontWeight: 600 }}>Thời gian tạo</p>,
                key: "Created",
                dataIndex: "Created",
                render: (_, record) => (
                    <>{record.Created ? dayjs(record.Created).format(FORMAT_TIME) : ''}</>
                )
            },
            {
                title: <p style={{ textAlign: 'center', fontWeight: 600 }}>Đơn vị gửi</p>,
                key: "DonViGui",
                dataIndex: "DonViGui",
                render: (_, record) => (
                    <>{record.DonViGui ? record.DonViGui : ''} {record.MaDonViGui ? `(${record.MaDonViGui})` : ''}</>
                )
            },
            {
                title: <p style={{ textAlign: 'center', fontWeight: 600 }}>Thời gian xử lý</p>,
                key: "ThoiGianXuLy",
                dataIndex: "ThoiGianXuLy",
                render: (_, record) => (
                    <>{record.ThoiGianXuLy ? dayjs(record.ThoiGianXuLy).format(FORMAT_TIME) : ''} {record.SoLanXuLy ? `(${record.SoLanXuLy})` : ''}</>
                )
            },
            {
                title: <p style={{ textAlign: 'center', fontWeight: 600 }}>Trạng thái</p>,
                key: "TrangThai",
                dataIndex: "TrangThai",
                render: (_, record) => (
                    <>{record.TrangThai ? record.TrangThai : ''} {record.MaTrangThai ? `(${record.MaTrangThai})` : ''}</>
                )
            },
            {
                title: <p style={{ textAlign: 'center', fontWeight: 600 }}>Thao tác</p>,
                dataIndex: '',
                width: "10%",
                align: 'center',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <EyeOutlined style={{ color: "cornflowerblue" }} title="Xem chi tiết" onClick={() => {
                            qlvbContext.setLienThongQLVBId(record.ID)
                            qlvbContext.setVanBanDetailModalVisible(true)

                        }} />
                        <RetweetOutlined style={{ color: "orange" }} title="Gửi lại gói tin" onClick={() => {

                            (async () => {
                                qlvbContext.setLoading(true)
                                const axiosCustomQlvb = axios.create({
                                    baseURL: HOST_PATH,
                                    headers: {
                                        'Authorization': `Bearer ${qlvbContext.configApiString?.token}`
                                    },
                                })
                                const requestBody = {
                                    MaVanBan: `${record.DocId}`,
                                    TrangThai: "01",
                                    Log: "Check"
                                }

                                try {
                                    const response = await axiosCustomQlvb.post(`${qlvbContext.configApiString?.urlapi}/lienthonghsqlvb/CapNhatTrangThaiVanBan`, requestBody, {
                                        headers: {}
                                    });

                                    if (response.status == 200) {
                                        toast.success("Gửi lại gói tin thành công!")
                                    }

                                } catch (error) {
                                    toast.error("Lỗi thao tác!")
                                    console.error('Error /lienthonghsqlvb/CapNhatTrangThaiVanBan:', error);
                                }
                                qlvbContext.setReload(true)
                                qlvbContext.setLoading(false)
                            })()
                        }} />


                    </Space>
                )
            }
        ]
    }, [pagination])
    return { columns }
}