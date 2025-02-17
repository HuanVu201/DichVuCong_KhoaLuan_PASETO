import { useMemo } from 'react'
import { INgayNghi } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
import { DeleteNgayNghi } from '../redux/action'
import { IBasePagination } from '../../../models'
import { useNgayNghiContext } from '../context/NgayNghiContext'
import { useSearchParams } from 'react-router-dom'
import { FORMAT_DATE } from '@/data'
import dayjs from 'dayjs'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const ngayNghiContext = useNgayNghiContext()
    let [searchRouterParams] = useSearchParams();

    const columns = useMemo((): ColumnsType<INgayNghi> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => (
                    index + 1
                ),
            },
            {
                title: 'Ngày nghỉ',
                key: "date",
                dataIndex: "date",
                render: (_,record) => {
                    return <>{record.date ? dayjs(record.date).format('DD/MM/YYYY') : ""}</>
                }
                    
            },
            {
                title: 'Mô tả',
                key: "description",
                dataIndex: "description",
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
                            ngayNghiContext.setNgayNghiId(record.id)
                            ngayNghiContext.setNgayNghiModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteNgayNghi({ id: record.id, forceDelete: false }))
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