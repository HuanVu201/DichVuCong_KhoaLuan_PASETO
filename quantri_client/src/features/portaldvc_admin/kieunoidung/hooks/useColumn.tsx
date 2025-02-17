import { useMemo } from 'react'
import { IKieuNoiDung } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../../lib/redux/Hooks'
import { DeleteKieuNoiDung } from '../redux/action'
import { IBasePagination } from '../../../../models'
import { useKieuNoiDungContext } from '../contexts/KieuNoiDungContext'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const kieuNoiDungContext = useKieuNoiDungContext()
    const columns = useMemo((): ColumnsType<IKieuNoiDung> => {
        return [
            {
                title: "STT",
                key: 'STT',
                width:"5%",
                render: (_, record, idx) => {
                  const pageNumber = pagination.pageNumber ?? 1
                  const pageSize = pagination.pageSize ?? 10
                  return <>{(pageNumber - 1) * pageSize + idx + 1}</>
                },
            },
            {
                title: "Tên nội dung",
                key: "tenNoiDung",
                dataIndex: "tenNoiDung",
            },
            {
                title: "Cho phép nhập nội dung",
                key: "choPhepNhapNoiDung",
                dataIndex: "choPhepNhapNoiDung",
                align: 'center',
                render: (text) => text == true ? <CheckCircleOutlined style={{ color: 'green' }}></CheckCircleOutlined> : <CloseCircleOutlined style={{ color: 'red' }}></CloseCircleOutlined>
            },
            {
                title: "Cho phép nhập loại liên kết",
                key: "choPhepNhapLoaiLienKet",
                dataIndex: "choPhepNhapLoaiLienKet",
                align: 'center',
                render: (text) => text == true ? <CheckCircleOutlined style={{ color: 'green' }}></CheckCircleOutlined> : <CloseCircleOutlined style={{ color: 'red' }}></CloseCircleOutlined>
            },
            {
                title: "Cho phép thêm tin bài",
                key: "choPhepThemTinBai",
                dataIndex: "choPhepThemTinBai",
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
                            kieuNoiDungContext.setMaKieuNoiDung(record.id)
                            kieuNoiDungContext.setMaKieuNoiDungModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteKieuNoiDung({ id: record.id, forceDelete: false }))
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