import { useEffect, useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../../lib/redux/Hooks'
import { IBasePagination } from '../../../models'
import { IPhieuKhaoSat } from '@/features/hoso/components/actions/traKetQuaVaDanhGiaHaiLong/models'
import { DeletePhieuKhaoSat } from '@/features/hoso/components/actions/traKetQuaVaDanhGiaHaiLong/redux/action'
import dayjs from 'dayjs'
import { SearchCoCauToChuc } from '@/features/cocautochuc/redux/crud'
import { useLogThongKeDGHLCongDanContext } from '../contexts/useLogDGHLCongDan'
import { ILogThongKeDGHLCongDan } from '../models'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const thongKeDanhGiaHaiLongContext = useLogThongKeDGHLCongDanContext()
    const { data: user } = useAppSelector(state => state.user)

    useEffect(() => {
        dispatch(SearchCoCauToChuc({ pageSize: 1500, groupCode: user?.officeCode, getAllChildren: true, type: 'don-vi' }))
    }, [])

    const { datas: donVis } = useAppSelector(state => state.cocautochuc)

    const columns = useMemo((): ColumnsType<ILogThongKeDGHLCongDan> => {
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
                key: "traLoi1",
                dataIndex: "traLoi1",
                align: "center",
            },
            {
                title: "Chỉ số 2",
                key: "traLoi2",
                dataIndex: "traLoi2",
                align: "center",
            },
            {
                title: "Chỉ số 3",
                key: "traLoi3",
                dataIndex: "traLoi3",
                align: "center",
            },
            {
                title: "Chỉ số 4",
                key: "traLoi4",
                dataIndex: "traLoi4",
                align: "center",
            },
            {
                title: "Chỉ số 5",
                key: "traLoi5",
                dataIndex: "traLoi5",
                align: "center",
            },
            {
                title: "Chỉ số 6",
                key: "traLoi6",
                dataIndex: "traLoi6",
                align: "center",
            },
            {
                title: "Chỉ số 7",
                key: "traLoi7",
                dataIndex: "traLoi7",
                align: "center",
            },
            {
                title: "Chỉ số 8",
                key: "traLoi8",
                dataIndex: "traLoi8",
                align: "center",
            },
            {
                title: "Chỉ số 9",
                key: "traLoi9",
                dataIndex: "traLoi9",
                align: "center",
            },
            {
                title: "Chỉ số 10",
                key: "traLoi10",
                dataIndex: "traLoi10",
                align: "center",
            },
            {
                title: "Chỉ số 11",
                key: "traLoi11",
                dataIndex: "traLoi11",
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
                        <EyeOutlined style={{ color: "cornflowerblue" }} title="Xem chi tiết" onClick={() => {
                            thongKeDanhGiaHaiLongContext.setLogThongKeDGHLCongDanId(record.id)
                            thongKeDanhGiaHaiLongContext.setLogThongKeDGHLCongDanModalVisible(true)
                        }} />
                    </Space>
                )
            }
        ]
    }, [pagination])
    return { columns }
}