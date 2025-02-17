import { useEffect, useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../../lib/redux/Hooks'
import { DeleteHoSo } from '../../hoso/redux/action'
import { IBasePagination } from '../../../models'
import { useThayDoiMucDoThuTucContext } from '../contexts/ThayDoiMucDoThuTucContext'
import { DeleteThayDoiMucDoThuTuc } from '../redux/action'
import { IThayDoiMucDoThuTuc } from '../models'
import { SearchThuTuc } from '@/features/thutuc/redux/action'
import { SearchDonVi } from '@/features/donvi/redux/action'
import { SearchLinhVuc } from '@/features/linhvuc/redux/action'
import { SearchCoCauToChuc } from '@/features/cocautochuc/redux/crud'
import dayjs from 'dayjs'
import { FORMAT_DATE_WITHOUT_SECOND } from '@/data'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const thayDoiMucDoThuTucTNContext = useThayDoiMucDoThuTucContext()
    const { datas: thuTucs, count, loading, } = useAppSelector((state) => state.thutuc);
    const { datas: donVis } = useAppSelector((state) => state.cocautochuc);
    const { data: user } = useAppSelector((state) => state.user);
    console.log(user);

    useEffect(() => {
        dispatch(SearchThuTuc({ pageSize: 2000 }))
    }, [])
    useEffect(() => {
        dispatch(SearchCoCauToChuc({}))
    }, [])

    const columns = useMemo((): ColumnsType<IThayDoiMucDoThuTuc> => {
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
                title: "Thủ tục",
                key: "thuTuc",
                dataIndex: "thuTuc",
                render: (text, record) => {
                    const thuTuc = thuTucs?.find(thuTuc => thuTuc.maTTHC === record.thuTuc);
                    if (thuTuc) {
                        return thuTuc.tenTTHC;
                    }
                    return "Không tìm thấy";
                }

            },
            {
                title: "Đơn vị",
                key: "donVi",
                dataIndex: "donVi",
                render: (text, record) => {
                    const linhVuc = donVis?.find(linhVuc => linhVuc.groupCode === record.donVi);
                    if (linhVuc) {
                        return linhVuc.groupName;
                    }
                    return "Không tìm thấy";
                }
            },
            {
                title: "Thời gian",
                key: "thoiGian",
                dataIndex: "thoiGian",
                render: (_, record) => {
                    return <>{record.thoiGian ? dayjs(record.thoiGian).format(FORMAT_DATE_WITHOUT_SECOND) : ""}</>
                },
                align: 'center'
            },
            {
                title: "Mức độ cũ",
                key: "mucDoCu",
                dataIndex: "mucDoCu",
                render: (text) => text == '2' ? 'Dịch vụ công' : text == '3' ? 'Dịch vụ công trực tuyến một phần' : text == '4' ? 'Dịch vụ công trực tuyến toàn trình' : ''

            },
            {
                title: "Mức độ mới",
                key: "mucDoMoi",
                dataIndex: "mucDoMoi",
                render: (text) => text == '2' ? 'Dịch vụ công' : text == '3' ? 'Dịch vụ công trực tuyến một phần' : text == '4' ? 'Dịch vụ công trực tuyến toàn trình' : ''

            },
            {
                title: "Người cập nhật",
                key: "nguoiCapNhat",
                dataIndex: "nguoiCapNhat",
                render: (_, record) => {
                    if (user?.id == record.nguoiCapNhat)
                        return user.fullName
                    return "Không tìm thấy";
                },
            },


            {
                title: "Thao tác",
                dataIndex: '',
                width: "10%",
                align: 'center',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteThayDoiMucDoThuTuc({ id: record.id, forceDelete: false }))
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