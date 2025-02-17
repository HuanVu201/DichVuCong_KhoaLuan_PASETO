import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { IBasePagination } from '@/models'
import { IBaoCaoDonVi, IThongKeTTTTElement } from '@/features/baocaotonghop/model'

export const useColumnThanhToanTrucTuyen = () => {
    const columns = useMemo((): ColumnsType<IThongKeTTTTElement> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Đơn vị",
                key: "",
                dataIndex: "",

            },
            {
                title: "Số lượng thủ tục có phí, lệ phí",
                key: "",
                dataIndex: "",

            },
            {
                title: "Số lượng thủ tục có phí, lệ phí phát sinh hồ sơ",
                key: "",
                dataIndex: "",

            },
            {
                title: "Số lượng thủ tục có phát sinh thanh toán",
                key: "",
                dataIndex: "",

            },
            {
                title: "Số lượng thủ tục có phát sinh thanh toán trực tuyến	",
                key: "",
                dataIndex: "",

            },
            {
                title: "Tổng số hồ sơ thuộc các thủ tục có phí, lệ phí",
                key: "",
                dataIndex: "",

            },
            {
                title: "Số hồ sơ được thanh toán trực tuyến thuộc các thủ tục có phí, lệ phí",
                key: "",
                dataIndex: "",

            },
        ]
    }, [])
    return { columns }
}