import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/lib/redux/Hooks'
import { IBasePagination } from '@/models'
import { useThuTucThietYeuContext } from '../contexts'
import { IThuTucThietYeu } from '../model'
import { thuTucThietYeuApi } from '../services'
import { toast } from 'react-toastify'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const thuTucThietYeuContext = useThuTucThietYeuContext()
    const columns = useMemo((): ColumnsType<IThuTucThietYeu> => {
        return [
            {
                title: <p style={{ textAlign: 'center' }}>STT</p>,
                width: "5%",
                align: "center",
                render: (_, record, idx) => {
                    const pageNumber = pagination.pageNumber ?? 1
                    const pageSize = pagination.pageSize ?? 10
                    return <>{(pageNumber - 1) * pageSize + idx + 1}</>
                },
            },
            {
                title: <p style={{ textAlign: 'center' }}>Mã thủ tục</p>,
                key: "maTTHC",
                dataIndex: "maTTHC",
            },
            {
                title: <p style={{ textAlign: 'center' }}>Tên thủ tục</p>,
                key: "tenTTHC",
                dataIndex: "tenTTHC",
            },
            {
                title: <p style={{ textAlign: 'center' }}>Đường dẫn DVC</p>,
                key: "linkDVC",
                dataIndex: "linkDVC",
            },
            {
                title: <p style={{ textAlign: 'center' }}>Thao tác</p>,
                dataIndex: '',
                width: "10%",
                align: 'center',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <EditOutlined style={{ color: "cornflowerblue" }} title="Xem chi tiết/Sửa" onClick={() => {
                            thuTucThietYeuContext.setThuTucThietYeuId(record.id)
                            thuTucThietYeuContext.setThuTucThietYeuModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={async () => {
                                const res = await thuTucThietYeuApi.Delete({ id: record.id, forceDelete: false })
                                if (res.status == 200) {
                                    thuTucThietYeuContext.setSearchParams({
                                        ...thuTucThietYeuContext.searchParams,
                                        reFetch: true
                                    })
                                    toast.success("Thao tác thành công!")
                                } else {
                                    toast.error('Thao tác thất bại!')
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