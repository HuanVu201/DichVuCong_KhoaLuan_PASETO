import { useEffect, useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../../lib/redux/Hooks'
import { IBasePagination } from '../../../models'
import { IPhieuKhaoSat } from '@/features/hoso/components/actions/traKetQuaVaDanhGiaHaiLong/models'
import { useThongKeDanhGiaHaiLongContext } from '../contexts/ThongKeDanhGiaHaiLongContext'
import { DeletePhieuKhaoSat } from '@/features/hoso/components/actions/traKetQuaVaDanhGiaHaiLong/redux/action'
import dayjs from 'dayjs'
import { SearchCoCauToChuc } from '@/features/cocautochuc/redux/crud'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const thongKeDanhGiaHaiLongContext = useThongKeDanhGiaHaiLongContext()
    useEffect(() => {
        dispatch(SearchCoCauToChuc({ pageSize: 1500 }))
    }, [])

    const { datas: donVis } = useAppSelector(state => state.cocautochuc)

    const columns = useMemo((): ColumnsType<IPhieuKhaoSat> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,

            },

            // {
            //     title: "Đơn vị",
            //     key: "donVi",
            //     dataIndex: "donVi",
            //     align: 'center',
            //     render: (_, record) => {
            //         const tenDonVi = donVis?.find(x => x.groupCode == record.donVi)
            //         if (tenDonVi)
            //             return tenDonVi.groupName;

            //         return "Đơn vị không tồn tại"
            //     }
            // },
            {
                title: "Mã hồ sơ",
                key: "maHoSo",
                dataIndex: "maHoSo",
                align: "center",
            },
            {
                title: "Câu 1",
                key: "traLoi1",
                dataIndex: "traLoi1",
                align: "center",
            },
            {
                title: "Câu 2",
                key: "traLoi2",
                dataIndex: "traLoi2",
                align: "center",
            },
            {
                title: "Câu 3",
                key: "traLoi3",
                dataIndex: "traLoi3",
                align: "center",
            },
            {
                title: "Câu 4",
                key: "traLoi4",
                dataIndex: "traLoi4",
                align: "center",
            },
            {
                title: "Câu 5",
                key: "traLoi5",
                dataIndex: "traLoi5",
                align: "center",
            },
            {
                title: "Câu 6",
                key: "traLoi6",
                dataIndex: "traLoi6",
                align: "center",
            },
            {
                title: "Câu 7",
                key: "traLoi7",
                dataIndex: "traLoi7",
                align: "center",
            },
            {
                title: "Câu 8",
                key: "traLoi8",
                dataIndex: "traLoi8",
                align: "center",
            },
            {
                title: "Câu 9",
                key: "traLoi9",
                dataIndex: "traLoi9",
                align: "center",
            },
            {
                title: "Ngày đánh giá",
                key: "ngayTao",
                dataIndex: "ngayTao",
                render: (_, record) => {
                    return <>{record.ngayTao ? dayjs(record.ngayTao).format('DD/MM/YYYY') : ""}</>
                },
                align: "center",

            },



            {
                title: "Thao tác",
                dataIndex: '',
                width: "10%",
                align: 'center',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <EyeOutlined style={{ color: "cornflowerblue" }} title="Xem chi tiết/Sửa" onClick={() => {
                            thongKeDanhGiaHaiLongContext.setThongKeDanhGiaHaiLongId(record.id)
                            thongKeDanhGiaHaiLongContext.setThongKeDanhGiaHaiLongModalVisible(true)
                        }} />
                    </Space>
                )
            }
        ]
    }, [pagination])
    return { columns }
}