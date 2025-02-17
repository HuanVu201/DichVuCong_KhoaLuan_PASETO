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
    const { data: user } = useAppSelector(state => state.user)

    useEffect(() => {
        dispatch(SearchCoCauToChuc({ pageSize: 1500, groupCode: user?.officeCode, getAllChildren: true, type: 'don-vi' }))
    }, [])

    const { datas: donVis } = useAppSelector(state => state.cocautochuc)

    const columns = useMemo((): ColumnsType<IPhieuKhaoSat> => {
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
                title: "Mã hồ sơ",
                key: "maHoSo",
                dataIndex: "maHoSo",
                align: "center",
            },
            {
                title: "Đơn vị",
                key: "groupName",
                dataIndex: "groupName",
                align: 'center',
              
            },
            {
                title: "Chỉ số 1",
                key: "chiSo1",
                dataIndex: "chiSo1",
                align: "center",
            },
            {
                title: "Chỉ số 2",
                key: "chiSo2",
                dataIndex: "chiSo2",
                align: "center",
            },
            {
                title: "Chỉ số 3",
                key: "chiSo3",
                dataIndex: "chiSo3",
                align: "center",
            },
            {
                title: "Chỉ số 4",
                key: "chiSo4",
                dataIndex: "chiSo4",
                align: "center",
            },
            {
                title: "Chỉ số 5",
                key: "chiSo5",
                dataIndex: "chiSo5",
                align: "center",
            },
            {
                title: "Chỉ số 6",
                key: "chiSo6",
                dataIndex: "chiSo6",
                align: "center",
            },
            {
                title: "Chỉ số 7",
                key: "chiSo7",
                dataIndex: "chiSo7",
                align: "center",
            },
            {
                title: "Chỉ số 8",
                key: "chiSo8",
                dataIndex: "chiSo8",
                align: "center",
            },
            {
                title: "Chỉ số 9",
                key: "chiSo9",
                dataIndex: "chiSo9",
                align: "center",
            },
            {
                title: "Chỉ số 10",
                key: "chiSo10",
                dataIndex: "chiSo10",
                align: "center",
            },
            {
                title: "Chỉ số 11",
                key: "chiSo11",
                dataIndex: "chiSo11",
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