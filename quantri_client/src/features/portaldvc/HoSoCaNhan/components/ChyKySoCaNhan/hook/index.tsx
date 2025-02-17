import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/lib/redux/Hooks'
// import { DeleteLinhVuc } from '../redux/action'
import { IBasePagination } from '@/models'
import { toast } from 'react-toastify'
import { IChuKySoCaNhan } from '../model'
import { useChuKySoCaNhanContext } from '../context'
import { FORMAT_DATE_WITHOUT_TIME, FORMAT_TIME } from '@/data'
import dayjs from 'dayjs'
import { ChuKySoCaNhanApi } from '../service'

export const useChuKySoCaNhanColumn = () => {
    const dispatch = useAppDispatch()
    const chuKySoCaNhanContext = useChuKySoCaNhanContext()
    const columns: ColumnsType<IChuKySoCaNhan> = [
        {
            title: "STT",
            width: "5%",
            align: "center",
            className: 'headerTable',
            render: (text, record, index) => index + 1,
        },
        {
            title: "Mô tả",
            key: "moTa",
            dataIndex: "moTa",
            className: 'headerTable',
            width: '45%'
        },
        {
            title: "Thời gian tạo",
            key: "thoiGianTao",
            dataIndex: "thoiGianTao",
            className: 'headerTable',
            render: (_, record) => {
                return <>
                    {record.thoiGianTao ? dayjs(record.thoiGianTao).format(FORMAT_TIME) : ""}</>
            }
        },
        {
            title: "Thời gian thay đổi",
            key: "thoiGianThayDoi",
            dataIndex: "thoiGianThayDoi",
            className: 'headerTable',
            render: (_, record) => {
                return <>
                    {record.thoiGianThayDoi ? dayjs(record.thoiGianThayDoi).format(FORMAT_TIME) : ""}</>
            }
        },

        {
            title: "Thao tác",
            dataIndex: '',
            width: "10%",
            align: 'center',
            key: '',
            className: 'headerTable',
            render: (_, record) => (
                <Space direction="horizontal">
                    <EyeOutlined style={{ color: "blue" }} title="Xem chi tiết" onClick={() => {
                        chuKySoCaNhanContext.setChuKySoCaNhanItem(record)
                        chuKySoCaNhanContext.setChuKySoCaNhanDetailModalVisible(true)
                    }} />
                    <EditOutlined style={{ color: "cornflowerblue" }} title="Sửa thông tin" onClick={() => {
                        chuKySoCaNhanContext.setChuKySoCaNhanItem(record)
                        chuKySoCaNhanContext.setAddChuKyCaNhanModalVisible(true)
                    }} />
                    <Popconfirm
                        title='Xoá?'
                        onConfirm={() => {
                            (async () => {
                                var res = await ChuKySoCaNhanApi.Delete(
                                    {
                                        id: record.id,
                                        forceDelete: false
                                    }
                                )
                                if (res.status == 200) {
                                    toast.success('Xóa thành công!')
                                    chuKySoCaNhanContext.setReload(!chuKySoCaNhanContext.reload)
                                }
                                else {
                                    toast.error('Thao tác thất bại!')
                                }

                            })()

                        }}
                        okText='Xoá'
                        cancelText='Huỷ'
                    >
                        <DeleteOutlined style={{ color: "tomato" }} />
                    </Popconfirm>
                </Space >
            )
        }
    ]
    return columns
}