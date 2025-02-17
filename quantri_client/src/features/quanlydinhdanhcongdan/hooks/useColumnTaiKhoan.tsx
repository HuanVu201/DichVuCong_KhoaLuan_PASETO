import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { AuditOutlined, DeleteOutlined, EditOutlined, EyeOutlined, FileOutlined, StopOutlined, UndoOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
// import { DeleteLinhVuc } from '../redux/action'
import { IBasePagination } from '../../../models'
import { useQuanLyDinhDanhContext } from '../context/quanLyDinhDanhCongDanContext'
import { IQuanLyTaiKhoanDinhDanh } from '../models/QuanLyTaiKhoanModel'
import { DeleteDinhDanhUser, ToggleLockoutUser } from '../redux/action'
import { toast } from 'react-toastify'

export const useColumnTaiKhoan = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const quanLyDinhDanhCongDanContext = useQuanLyDinhDanhContext()
    const columns = useMemo((): ColumnsType<IQuanLyTaiKhoanDinhDanh> => {
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
                title: <p style={{textAlign: 'center'}}>Email</p>,
                key: "email",
                dataIndex: "email",
            },
            {
                title: <p style={{textAlign: 'center'}}>Số điện thoại</p>,
                key: "phoneNumber",
                dataIndex: "phoneNumber",
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
                title: <p style={{textAlign: 'center'}}>Trạng thái</p>,
                key: "lockoutEnabled",
                dataIndex: "lockoutEnabled",
                render: (text, record, index) =>
                    <div>
                        {record.lockoutEnabled ? "Chặn sử dụng" : "Sử dụng"}
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
                        <EyeOutlined style={{ color: "cornflowerblue" }} title="Xem lịch sử truy cập" onClick={() => {
                            quanLyDinhDanhCongDanContext.setUserName(record.userName)
                            quanLyDinhDanhCongDanContext.setDetailThongKeModalVisible(true)
                        }} />
                        {!record.lockoutEnabled
                            ?
                            <StopOutlined style={{ color: "red" }} title="Chặn tài khoản" onClick={async () => {
                                const res = await dispatch(ToggleLockoutUser({ id: record.id }))
                                if (res) {
                                    toast.success("Thao tác thành công!")
                                    quanLyDinhDanhCongDanContext.setReload(!quanLyDinhDanhCongDanContext.reload)
                                }
                            }} />
                            :
                            <UndoOutlined style={{ color: "green" }} title="Bỏ chặn tài khoản" onClick={async () => {
                                const res = await dispatch(ToggleLockoutUser({ id: record.id }))
                                if (res) {
                                    toast.success("Thao tác thành công!")
                                    quanLyDinhDanhCongDanContext.setReload(!quanLyDinhDanhCongDanContext.reload)
                                }
                            }} />
                        }
                        {record.soDinhDanh && record.suDungKhoTaiLieuDienTu
                            ?
                            <AuditOutlined style={{ color: "brown" }} title="Quản lý kho tài liệu điện tử" onClick={async () => {
                                quanLyDinhDanhCongDanContext.setSoDinhDanh(record.soDinhDanh)
                                quanLyDinhDanhCongDanContext.setKhoTaiLieuDienTuModalVisible(true)
                            }} />
                            : null
                        }

                        <Popconfirm
                            title='Xóa số định danh?'
                            onConfirm={async () => {
                                const res = await dispatch(DeleteDinhDanhUser({ id: record.id }))
                                if (res) {
                                    toast.success("Thao tác thành công!")
                                    quanLyDinhDanhCongDanContext.setReload(!quanLyDinhDanhCongDanContext.reload)
                                }
                            }}
                            okText='Xoá'
                            cancelText='Huỷ'
                        >
                            <DeleteOutlined style={{ color: "tomato", display: `${record.soDinhDanh ? 'block' : 'none'}` }} />
                        </Popconfirm>
                    </Space>
                )
            }
        ]
    }, [pagination])
    return { columns }
}