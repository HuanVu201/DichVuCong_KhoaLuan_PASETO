import { useMemo } from 'react'
import { IPhanAnhKienNghi } from '../../../portaldvc/PhanAnhKienNghi/models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined, SendOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../../lib/redux/Hooks'
import { DeletePhanAnhKienNghi } from '../../../portaldvc/PhanAnhKienNghi/redux/action'
import { IBasePagination } from '../../../../models'
import { usePhanAnhKienNghiContext } from '../contexts/PhanAnhKienNghiContext'
import dayjs from 'dayjs'
import { FORMAT_DATE_WITHOUT_TIME } from '@/data'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const PhanAnhKienNghiContext = usePhanAnhKienNghiContext()
    const columns = useMemo((): ColumnsType<IPhanAnhKienNghi> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Tiêu đề",
                key: "tieuDe",
                dataIndex: "tieuDe",
            },
            {
                title: "Tên người gửi",
                key: "hoTen",
                dataIndex: "hoTen",
            },
            {
                title: "Ngày gửi",
                key: "ngayGui",
                render: (text, record, index) => {
                    return (dayjs(record.ngayGui).format(FORMAT_DATE_WITHOUT_TIME))
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
                        {record.trangThai == '1'
                            ?
                            <EditOutlined style={{ color: "cornflowerblue" }} title="Xem chi tiết/Sửa" onClick={() => {

                                PhanAnhKienNghiContext.setPhanAnhKienNghiId(record.id)
                                PhanAnhKienNghiContext.setPhanAnhKienNghiVisible(true)
                            }} />
                            :
                            <SendOutlined style={{ color: "cornflowerblue" }} title="Trả lời" onClick={() => {

                                PhanAnhKienNghiContext.setPhanAnhKienNghiId(record.id)
                                PhanAnhKienNghiContext.setPhanAnhKienNghiVisible(true)
                            }} />
                        }

                        {/* <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeletePhanAnhKienNghi({ id: record.id, forceDelete: false }))
                            } }
                            okText='Xoá'
                            cancelText='Huỷ'
                        >
                            <DeleteOutlined style={{color:"tomato"}}/>
                        </Popconfirm> */}
                    </Space>
                )
            }
        ]
    }, [pagination])
    return { columns }
}