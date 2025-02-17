import { useMemo } from 'react'
import { ITinBai } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../../lib/redux/Hooks'
import { DeleteTinBai } from '../redux/action'
import { IBasePagination } from '../../../../models'
import dayjs from 'dayjs'
import { useTinBaiContext } from '../contexts/TinBaiContext'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const tinBaiContext = useTinBaiContext()
    const columns = useMemo((): ColumnsType<ITinBai> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Tiêu đề",
                key: "tieuDe",
                dataIndex: "tieuDe",
            },
            // {
            //     title: "Ảnh đại diện",
            //     key: "anhDaiDien",
            //     dataIndex: "anhDaiDien",
            // },
            {
                title: "Ngày ban hành",
                key: "ngayBanHanh",
                dataIndex: "ngayBanHanh",
                render(value, { ngayBanHanh }, index) {
                    return <>{dayjs(ngayBanHanh).format("DD/MM/YYYY")}</>
                },
            },
            {
                title: "Trích yếu",
                key: "trichYeu",
                dataIndex: "trichYeu",
            },
            // {
            //     title: "Tên trạng thái",
            //     key: "tenTrangThai",
            //     dataIndex: "tenTrangThai",
            // },
            {
                title: "Thao tác",
                dataIndex: '',
                width: "10%",
                align: 'center',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <EditOutlined style={{ color: "cornflowerblue" }} title="Xem chi tiết/Sửa" onClick={() => {
                            tinBaiContext.setMaTinBai(record.id)
                            tinBaiContext.setMaTinBaiModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteTinBai({ id: record.id, forceDelete: false }))
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