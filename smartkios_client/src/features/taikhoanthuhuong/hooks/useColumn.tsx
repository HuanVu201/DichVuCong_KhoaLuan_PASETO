import { useMemo } from 'react'
import { ITaiKhoanThuHuong } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
import { DeleteTaiKhoanThuHuong } from '../redux/action'
import { IBasePagination } from '../../../models'
import { useTaiKhoanThuHuongContext } from '../contexts/TaiKhoanThuHuongContext'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const taiKhoanThuHuongContext = useTaiKhoanThuHuongContext()
    const columns = useMemo(() : ColumnsType<ITaiKhoanThuHuong> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Tài khoản thụ hưởng",
                key: "tkThuHuong",
                dataIndex: "tkThuHuong",
            },
            {
                title: "Mã ngân hàng thụ hưởng",
                key: "maNHThuHuong",
                dataIndex: "maNHThuHuong",
            },
            {
                title: "Tên tài khoản thụ hưởng",
                key: "tenTKThuHuong",
                dataIndex: "tenTKThuHuong",
            },
            {
                title: "Mô tả",
                key: "moTa",
                dataIndex: "moTa",
            },        
            {
                title: "Thao tác",
                dataIndex: '',
                width:"10%",
                align:'center',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <EditOutlined style={{color:"cornflowerblue"}} title="Xem chi tiết/Sửa" onClick={() => {
                            taiKhoanThuHuongContext.setMaTaiKhoanThuHuong(record.id)
                            taiKhoanThuHuongContext.setTaiKhoanThuHuongModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteTaiKhoanThuHuong({ id: record.id, forceDelete: false }))
                            } }
                            okText='Xoá'
                            cancelText='Huỷ'
                        >
                            <DeleteOutlined style={{color:"tomato"}}/>
                        </Popconfirm>
                    </Space>
                )
            }
        ]
    }, [pagination])
    return {columns}
}