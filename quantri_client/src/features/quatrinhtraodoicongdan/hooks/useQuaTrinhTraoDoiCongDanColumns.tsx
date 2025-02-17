import { useMemo } from 'react'
import { IQuaTrinhTraoDoiCongDan, ISearchQuaTrinhTraoDoiCongDan } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space, Tag } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
import { IBasePagination } from '../../../models'
import { useThuTucContext } from '@/features/thutuc/contexts/ThuTucContext'
import { useQuaTrinhTraoDoiCongDanContext } from '../contexts/QuaTrinhTraoDoiCongDanProvider'
import { quaTrinhTraoDoiCongDanService } from '../services'
import dayjs from 'dayjs'
import { FORMAT_DATE_WITHOUT_TIME } from '@/data'
import { AntdSpace } from '@/lib/antd/components'

export const useQuaTrinhTraoDoiCongDanColumns = (pagination: IBasePagination, setSearchParams: React.Dispatch<React.SetStateAction<ISearchQuaTrinhTraoDoiCongDan>> ) => {
    const dispatch = useAppDispatch()
    const quaTrinhTraoDoiCongDanContext = useQuaTrinhTraoDoiCongDanContext()
    const columns = useMemo((): ColumnsType<IQuaTrinhTraoDoiCongDan> => {
        return [
            {
                title: "STT",
                width:"5%",
                key: 'STT',
                render: (_, record, idx) => {
                  const pageNumber = pagination.pageNumber ?? 1
                  const pageSize = pagination.pageSize ?? 10
                  return <>{(pageNumber - 1) * pageSize + idx + 1}</>
                },
            },
            {
                title: "Người gửi",
                key: "fullName",
                dataIndex: "fullName",
            },
            {
                title: "Hình thức trao đổi",
                key: "hinhThucTraoDoi",
                render: (_, record) => {
                    return <AntdSpace direction="horizontal">
                        {record.email ? <Tag color="green" key={1}>Qua Email</Tag> : null}
                        {record.sms ? <Tag color="orange" key={2}>Qua SMS</Tag> : null}
                        {record.zalo ? <Tag color="cyan" key={3}>Qua Zalo</Tag> : null}
                    </AntdSpace>
                }
            },
            {
                title: "Nội dung trao đổi",
                key: "noiDungTraoDoi",
                dataIndex: "noiDungTraoDoi",
            },
            {
                title: "Ngày gửi",
                key: "ngayGui",
                render: (_, record) => {
                    return <>{record.ngayGui ? dayjs(record.ngayGui).format(FORMAT_DATE_WITHOUT_TIME) : ""}</>
                }
            },
            // {
            //     title: "Thao tác",
            //     dataIndex: '',
            //     width: "10%",
            //     align: 'center',
            //     key: '',
            //     render: (_, record) => (
            //         <Space direction="horizontal">
            //             <EditOutlined style={{ color: "cornflowerblue" }} title="Xem chi tiết/Sửa" onClick={() => {
            //                 quaTrinhTraoDoiCongDanContext.setMaQuaTrinhTraoDoiCongDan(record.id)
            //                 quaTrinhTraoDoiCongDanContext.setQuaTrinhTraoDoiCongDanModalVisible(true)
            //             }} />
            //             <Popconfirm
            //                 title='Xoá?'
            //                 onConfirm={async () => {
            //                     await QuaTrinhTraoDoiCongDanService.Delete(record.id)
            //                     setSearchParams(cur => ({ ...cur, maTTHC: record.maTTHC }))
            //                 }}
            //                 okText='Xoá'
            //                 cancelText='Huỷ'
            //             >
            //                 <DeleteOutlined style={{ color: "tomato" }} />
            //             </Popconfirm>
            //         </Space>
            //     )
            // }
        ]
    }, [pagination])
    return { columns }
}