import { useMemo } from 'react'
import { IQrCodeService } from '../Models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../../lib/redux/Hooks'
import { IBasePagination } from '../../../../models'
import { useQrCodeServiceContext } from '../context/QrCodeService'
import { HOST_PATH } from '@/data'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const QrCodeServiceContext = useQrCodeServiceContext()

    const columns = useMemo((): ColumnsType<IQrCodeService> => {
        return [
            {
                title: "STT",
                width: "10%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Đường dẫn",
                align: "left",
                key: 'link',
                render: (_, record) => `${record.link}`,
            },
            {
                title: "Thao tác",
                dataIndex: '',
                width: "10%",
                align: 'center',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <EyeOutlined style={{ color: "cornflowerblue" }} title="Xem chi tiết" onClick={() => {
                            QrCodeServiceContext.setUrlQrView(`${record.link}`)
                            QrCodeServiceContext.setViewQrCodeService(true)
                        }} />
                    </Space>
                )
            }
        ]
    }, [pagination])
    return { columns }
}