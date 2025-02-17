import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { IBasePagination } from '@/models'
import { IBaoCaoDonVi, IThongKeChiTieuSoHoaElement } from '@/features/baocaotonghop/model'

export const useColumnChiTieuSoHoa = () => {
    const columns = useMemo((): ColumnsType<IThongKeChiTieuSoHoaElement> => {
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
                title: "Tiếp nhận",
                key: "",
                dataIndex: "",

            },
            {
                title: "Số hóa hồ sơ TTHC khi tiếp nhận	",
                key: "",
                children: [
                    {
                        title: "Chưa số hóa TPHS",
                        dataIndex: '',
                        align: "center",
                        key: '',

                    },
                    {
                        title: "Có số hóa TPHS",
                        dataIndex: '',
                        align: "center",
                        key: '',

                    },
                    {
                        title: "Có tái sử dụng thành phần",
                        dataIndex: '',
                        align: "center",
                        key: '',

                    },
                    {
                        title: "Có tái sử dụng thành phần từ cổng DVC quốc gia",
                        dataIndex: '',
                        align: "center",
                        key: '',

                    },

                ]
            },
            {
                title: "Đã giải quyết",
                key: "",
                dataIndex: "",

            },
            {
                title: "Số hóa kết quả giải quyết",
                key: "",
                children: [
                    {
                        title: "Chưa số hóa",
                        dataIndex: '',
                        align: "center",
                        key: '',
                    },
                    {
                        title: "Đã số hóa",
                        dataIndex: '',
                        align: "center",
                        key: '',
                    },

                ]
            },
        ]
    }, [])
    return { columns }
}