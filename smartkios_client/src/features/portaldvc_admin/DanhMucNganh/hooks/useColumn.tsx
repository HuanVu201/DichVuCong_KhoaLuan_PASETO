import { useMemo } from 'react'
import { IDanhMucNganh } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../../lib/redux/Hooks'
import { DeleteDanhMucNganh } from '../redux/action'
import { IBasePagination } from '../../../../models'
import { useDanhMucNganhContext } from '../contexts/DanhMucNganhContext'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const DanhMucNganhContext = useDanhMucNganhContext()
    const columns = useMemo((): ColumnsType<IDanhMucNganh> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Tên Danh mục",
                key: "tenDanhMuc",
                dataIndex: "tenDanhMuc",
            },
            {
                title: "Sử dụng",
                key: "active",
                dataIndex: "active",
                align: 'center',
                render: (text) => text == true ? <CheckCircleOutlined style={{ color: 'green' }}></CheckCircleOutlined> : <CloseCircleOutlined style={{ color: 'red' }}></CloseCircleOutlined>
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
                            DanhMucNganhContext.setMaDanhMucNganh(record.id)
                            DanhMucNganhContext.setMaDanhMucNganhModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteDanhMucNganh({ id: record.id, forceDelete: false }))
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