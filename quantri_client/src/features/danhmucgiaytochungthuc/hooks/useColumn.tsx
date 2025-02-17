import { useMemo } from 'react'
import { IDanhMucGiayToChungThuc } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../../lib/redux/Hooks'
import { DeleteDanhMucGiayToChungThuc } from '../redux/action'
import { IBasePagination } from '../../../models'
import { useDanhMucGiayToChungThucContext } from '../contexts/DanhMucGiayToChungThucContext'
import dayjs from 'dayjs'
import { FORMAT_DATE, FORMAT_DATE_WITHOUT_TIME } from '@/data'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const DanhMucGiayToChungThucContext = useDanhMucGiayToChungThucContext()
    const { datas: donVis } = useAppSelector(state => state.cocautochuc)

    const columns = useMemo((): ColumnsType<IDanhMucGiayToChungThuc> => {
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
                title: "Mã giấy tờ",
                key: "ma",
                dataIndex: "ma",
                align: 'center'
            },
            {
                title: "Tên giấy tờ",
                key: "ten",
                dataIndex: "ten",
                align: 'center'
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
                            DanhMucGiayToChungThucContext.setMaDanhMucGiayToChungThuc(record.id)
                            DanhMucGiayToChungThucContext.setDanhMucGiayToChungThucModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteDanhMucGiayToChungThuc({ id: record.id, forceDelete: false }))
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