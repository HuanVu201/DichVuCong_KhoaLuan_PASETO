import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { IBasePagination } from '../../../models'
import { IApiChiaSe } from '@/features/quanLySuDungApi/models'
import dayjs from 'dayjs'
import { FORMAT_TIME } from '@/data'

export const useDanhMucLichSuApiColumn = (pagination: IBasePagination) => {

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
    }, [pagination])
    return { columns }
}