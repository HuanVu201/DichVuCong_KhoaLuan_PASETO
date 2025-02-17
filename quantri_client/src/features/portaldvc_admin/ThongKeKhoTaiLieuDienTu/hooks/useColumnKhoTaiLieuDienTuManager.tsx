import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/lib/redux/Hooks'
// import { DeleteLinhVuc } from '../redux/action'
import { IBasePagination } from '@/models'
import { toast } from 'react-toastify'
import { useKhoTaiLieuDienTuManagerContext } from '../contexts/KhoTaiLieuDienTuManagerContext'
import { IKhoTaiLieuDienTu } from '@/features/portaldvc/HoSoCaNhan/components/KhoTaiLieuDienTu/models/KhoTaiLieuDienTuModel'
import { KhoTaiLieuDienTuApi } from '@/features/portaldvc/HoSoCaNhan/components/KhoTaiLieuDienTu/services/KhoTaiLieuDienTuService'


export const useColumnKhoTaiLieuDienTuManager = () => {
    const dispatch = useAppDispatch()
    const khoTaiLieuDienTuContext = useKhoTaiLieuDienTuManagerContext()
    const columns: ColumnsType<IKhoTaiLieuDienTu> = [
        {
            title: "STT",
            width: "5%",
            align: "center",
            className: 'headerTable',
            render: (text, record, index) => index + 1,
        },
        {
            title: "Tên kho tài liệu",
            key: "tenKhoTaiLieu",
            dataIndex: "tenKhoTaiLieu",
            className: 'headerTable'
        },
        {
            title: "Mô tả",
            key: "moTa",
            dataIndex: "moTa",
            className: 'headerTable'
        },
        {
            title: "Dung lượng",
            key: "dungLuong",
            dataIndex: "dungLuong",
            width: "10%",
            align: 'center',
            render: (_, record) => (
                <>{record.dungLuong ? record.dungLuong.toFixed(2) : 0} MB</>
            )
        },
        {
            title: "Số lượng",
            key: "soLuong",
            dataIndex: "soLuong",
            width: "10%",
            align: 'center',
            className: 'headerTable'
        },
        {
            title: "Thao tác",
            dataIndex: '',
            width: "10%",
            align: 'center',
            key: '',
            className: 'headerTable',
            render: (_, record) => (
                <Space direction="horizontal">
                    <EyeOutlined style={{ color: "cornflowerblue" }} title="Xem chi tiết" onClick={() => {
                        khoTaiLieuDienTuContext.setLoading(true)
                        khoTaiLieuDienTuContext.setKhoTaiLieuDienTuId(record.id)
                        khoTaiLieuDienTuContext.setDanhSachGiayToTrongKhoModalVisible(true)
                    }} />
                    <EditOutlined style={{ color: "cornflowerblue" }} title="Sửa thông tin" onClick={() => {
                        khoTaiLieuDienTuContext.setKhoTaiLieuDienTuId(record.id)
                        khoTaiLieuDienTuContext.setDetailKhoTaiLieuModalVisible(true)
                    }} />
                    <Popconfirm
                        title='Xoá?'
                        onConfirm={() => {
                            (async () => {
                                var res = await KhoTaiLieuDienTuApi.Delete(
                                    {
                                        id: record.id,
                                        forceDelete: false
                                    }
                                )
                                if (res.status == 200) {
                                    toast.success('Xóa thành công!')
                                    khoTaiLieuDienTuContext.setReload(!khoTaiLieuDienTuContext.reload)
                                }
                                else {
                                    toast.error('Thao tác thất bại!')
                                }

                            })()

                        }}
                        okText='Xoá'
                        cancelText='Huỷ'
                    >
                        <DeleteOutlined style={{ color: "tomato" }} />
                    </Popconfirm>
                </Space >
            )
        }
    ]
    return columns
}