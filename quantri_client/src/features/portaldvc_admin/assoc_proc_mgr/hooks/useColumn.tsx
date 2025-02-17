import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/lib/redux/Hooks'
import { IBasePagination } from '@/models'
import { useAssor_Proc_Mgr_Context } from '../contexts'
import { IAssor_Proc_Mgr } from '../model'
import { assor_Proc_Mgr_Api } from '../services'
import { toast } from 'react-toastify'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const assor_Proc_MgrContext = useAssor_Proc_Mgr_Context()
    const columns = useMemo((): ColumnsType<IAssor_Proc_Mgr> => {
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
                title: <p style={{ textAlign: 'center' }}>Tên thủ tục</p>,
                key: "tenThuTuc",
                dataIndex: "tenThuTuc",
            },
            {
                title: <p style={{ textAlign: 'center' }}>Tên thủ tục liên quan</p>,
                key: "tenThuTucLienQuan",
                dataIndex: "tenThuTucLienQuan",
            },
            {
                title: <p style={{ textAlign: 'center' }}>Thứ tự</p>,
                key: "thuTu",
                dataIndex: "thuTu",
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
                            assor_Proc_MgrContext.setAssor_Proc_Mgr_Id(record.id)
                            assor_Proc_MgrContext.setAssor_Proc_Mgr_ModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={async () => {
                                const res = await assor_Proc_Mgr_Api.Delete({ id: record.id, forceDelete: false })
                                if (res.status == 200) {
                                    assor_Proc_MgrContext.setSearchParams({
                                        ...assor_Proc_MgrContext.searchParams,
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