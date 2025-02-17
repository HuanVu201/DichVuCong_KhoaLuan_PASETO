import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined, FileDoneOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
// import { DeleteLinhVuc } from '../redux/action'
import { IBasePagination } from '../../../models'
import { useLoaiGiayToKhoLuuTruContext } from '../context/index'
import { ILoaiGiayToKhoLuuTru, ISearchLoaiGiayToKhoLuuTru } from '../models'
import { FORMAT_TIME } from '@/data'
import dayjs from 'dayjs'
import { loaiGiayToKhoLuuTruApi } from '../services'
import { toast } from 'react-toastify'

export const useColumn = ({ pageNumber, pageSize, setSearchParams }: {
    pageNumber: number, pageSize: number, setSearchParams: React.Dispatch<React.SetStateAction<ISearchLoaiGiayToKhoLuuTru>>
}) => {
    const dispatch = useAppDispatch()
    const loaiGiayToKhoLuuTruContext = useLoaiGiayToKhoLuuTruContext()
    const columns = useMemo((): ColumnsType<ILoaiGiayToKhoLuuTru> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (_, record, idx) => {
                    const pageNumberVal = pageNumber ?? 1
                    const pageSizeVal = pageSize ?? 10
                    return <>{(pageNumberVal - 1) * pageSizeVal + idx + 1}</>
                },
            },
            {
                title: <p style={{ textAlign: 'center' }}>Mã</p>,
                key: "ma",
                dataIndex: "ma",
            },
            {
                title: <p style={{ textAlign: 'center' }}>Tên</p>,
                key: "ten",
                dataIndex: "ten",
            },
            {
                title: <p style={{ textAlign: 'center', fontWeight: 600 }}>Thay đổi gần nhất</p>,
                key: "ThoiGianXuLy",
                dataIndex: "ThoiGianXuLy",
                render: (_, record) => (
                    <>{record.lastModifiedOn ? dayjs(record.lastModifiedOn).format(FORMAT_TIME) : ''} </>
                )
            },
            {
                title: <p style={{ textAlign: 'center' }}>Sử dụng</p>,
                key: "suDung",
                align: 'center',
                render: (_, record) => {

                    return record.suDung ? <CheckCircleOutlined style={{ color: 'green' }} /> : <CloseCircleOutlined style={{ color: 'red' }} />
                }
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
                            loaiGiayToKhoLuuTruContext.setLoaiGiayToKhoLuuTruId(record.id)
                            loaiGiayToKhoLuuTruContext.setLoaiGiayToKhoLuuTruModalVisible(true)
                        }} />
                        <FileDoneOutlined title='Cập nhật EForm' onClick={() => {
                            loaiGiayToKhoLuuTruContext.setLoaiGiayToKhoLuuTruId(record.id)
                            loaiGiayToKhoLuuTruContext.setEditEFormModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={async () => {
                                const resDelete = await loaiGiayToKhoLuuTruApi.Delete({
                                    id: record.id,
                                    forceDelete: false
                                })
                                console.log(resDelete)
                                if (resDelete.data.succeeded) {
                                    toast.success("Xóa thành công!")
                                    setSearchParams((cur) => ({ ...cur, reFetch: true }))
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
    }, [{ pageNumber, pageSize }])
    return { columns }
}