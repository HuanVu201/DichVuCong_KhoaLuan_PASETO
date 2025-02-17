import { useMemo } from 'react'
import { ILoaiPhiLePhi } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
import { DeleteLoaiPhiLePhi } from '../redux/action'
import { IBasePagination } from '../../../models'
import { useLoaiPhiLePhiContext } from '../contexts/LoaiPhiLePhiContext'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const loaiPhiLePhiContext = useLoaiPhiLePhiContext()
    const columns = useMemo((): ColumnsType<ILoaiPhiLePhi> => {
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
                title: "Mã",
                key: "ma",
                dataIndex: "ma",
            },
            {
                title: "Tên",
                key: "ten",
                dataIndex: "ten",
            },
            {
                title: "Sử dụng",
                key: "suDung",
                dataIndex: "suDung",
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
                            loaiPhiLePhiContext.setMaPhiLePhiaPhiLePhi(record.id)
                            loaiPhiLePhiContext.setMaPhiLePhiModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteLoaiPhiLePhi({ id: record.id, forceDelete: false }))
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