import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
// import { DeleteLinhVuc } from '../redux/action'
import { IBasePagination } from '../../../models'
import { useMauPhoiCNHContext } from '../contexts/MauPhoiCNHContext'
import { IMauPhoi, ISearchMauPhoi } from '@/features/quanlymauphoi/models'
import { DeleteMauPhoi, SearchMauPhoi } from '@/features/quanlymauphoi/redux/action'
import { MauPhoiApi } from '@/features/quanlymauphoi/services'
import { toast } from 'react-toastify'
// import { DeleteMauPhoi } from '../redux/action'

export const useMauPhoiCNHColumn = (pagination: IBasePagination, searchParams: ISearchMauPhoi) => {
    const dispatch = useAppDispatch()
    const MauPhoiContext = useMauPhoiCNHContext()
    const columns = useMemo((): ColumnsType<IMauPhoi> => {
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
                title: "Loại phôi",
                key: "loaiPhoi",
                dataIndex: "loaiPhoi",
            },
            {
                title: "Tên mẫu phôi",
                key: "tenMauPhoi",
                dataIndex: "tenMauPhoi",
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
                            MauPhoiContext.setMauPhoiCNHId(record.id)
                            MauPhoiContext.setMauPhoiCNHModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={async() => {
                                const res = await MauPhoiApi.Delete({ id: record.id, forceDelete: false });
                                if (res.status === 200) {
                                    dispatch(SearchMauPhoi({ ...searchParams }))
                                    toast.success('Thao tác thành công!')
                                }
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