import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined, StopOutlined, UndoOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/lib/redux/Hooks'
// import { DeleteLinhVuc } from '../redux/action'
import { IBasePagination } from '@/models'
import { toast } from 'react-toastify'
import { useThongKeKhoTaiLieuContext } from '../contexts'
import { IThongKeKhoTaiLieuDienTu } from '../models'

export const useThongKeFilterColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const thongKeKhoTaiLieuContext = useThongKeKhoTaiLieuContext()
    const columns = useMemo((): ColumnsType<IThongKeKhoTaiLieuDienTu> => {
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
                title: <p style={{textAlign: 'center'}}>Họ và tên</p>,
                key: "fullName",
                dataIndex: "fullName",
            },
            {
                title: <p style={{textAlign: 'center'}}>Tài khoản</p>,
                key: "userName",
                dataIndex: "userName",
            },
            {
                title: <p style={{textAlign: 'center'}}>Số định danh</p>,
                key: "soDinhDanh",
                dataIndex: "soDinhDanh",
                render: (text, record, index) =>
                    <div>
                        {record.soDinhDanh ? record.soDinhDanh : "Không có"}
                    </div>

            },
            {
                title: <p style={{textAlign: 'center'}}>Số điện thoại</p>,
                key: "phoneNumber",
                dataIndex: "phoneNumber",
                align: 'center'
            },
            {
                title: <p style={{textAlign: 'center'}}>Số lượng kho</p>,
                key: "soLuongKho",
                dataIndex: "soLuongKho",
                align: 'center'
            },
            {
                title: <p style={{textAlign: 'center'}}>Số lượng giấy tờ</p>,
                key: "soLuongGiayTo",
                dataIndex: "soLuongGiayTo",
                align: 'center'
            },
            {
                title: <p style={{textAlign: 'center'}}>Tổng dung lượng</p>,
                key: "tongDungLuong",
                dataIndex: "tongDungLuong",
                align: 'center',
                render: (text, record, index) =>
                    <div>
                        {record.tongDungLuong ? record.tongDungLuong.toFixed(2) : 0} MB
                    </div>
            },

            {
                title: "Thao tác",
                dataIndex: '',
                width: "10%",
                align: 'center',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <EyeOutlined style={{ color: "cornflowerblue" }} title="Xem thông tin" onClick={() => {
                            thongKeKhoTaiLieuContext.setSoDinhDanh(record.soDinhDanh)
                            thongKeKhoTaiLieuContext.setKhoTaiLieuDienTuModalVisible(true)
                        }} />
                       
                    </Space>
                )
            }
        ]
    }, [pagination])
    return { columns }
}