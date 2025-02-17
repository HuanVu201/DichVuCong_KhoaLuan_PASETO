import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined, FilterFilled, FilterOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
// import { DeleteLinhVuc } from '../redux/action'
import { IBasePagination } from '../../../models'
import { IApiChiaSe } from '../models'
import { useQuanLySuDungAPIContext } from '../contexts'
import dayjs from 'dayjs'
import { FORMAT_DATE_WITHOUT_TIME, FORMAT_TIME } from '@/data'

export const useLichSuApiColumn = () => {
    const columns = useMemo((): ColumnsType<IApiChiaSe> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: <p style={{ textAlign: 'center' }}>IP truy cập</p>,
                key: "ip",
                dataIndex: "ip",
            },
            {
                title: <p style={{ textAlign: 'center' }}>Thời gian</p>,
                key: "createdOn",
                dataIndex: "createdOn",
                render: (text, record, index) =>
                    <div>
                        {record.createdOn ? dayjs(record.createdOn).format(FORMAT_TIME) : ''}
                    </div>

            },

        ]
    }, [])
    return { columns }
}