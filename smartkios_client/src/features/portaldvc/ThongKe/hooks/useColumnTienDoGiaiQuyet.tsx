import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { IBasePagination } from '@/models'
import { IBaoCaoDonVi, IThongKeTienDoGiaiQuyetElement } from '@/features/baocaotonghop/model'

export const useColumnChiTieuDVC = () => {
    const columns = useMemo((): ColumnsType<IThongKeTienDoGiaiQuyetElement> => {
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
                children: [
                    {
                        title: "Tổng số",
                        dataIndex: '',
                        align: "center",
                        key: '',

                    },
                    {
                        title: "Kỳ trước chuyển sang",
                        dataIndex: '',
                        align: "center",
                        key: '',

                    },
                    {
                        title: "Trong kỳ",
                        key: '',
                        children: [
                            {
                                title: "Tổng số",
                                dataIndex: '',
                                align: "center",
                                key: '',
                            },
                            {
                                title: "Trực tuyến",
                                dataIndex: '',
                                align: "center",
                                key: '',
                            },
                            {
                                title: "Trực tiếp",
                                dataIndex: '',
                                align: "center",
                                key: '',
                            },
                            {
                                title: "BCCI",
                                dataIndex: '',
                                align: "center",
                                key: '',
                            }
                        ]
                    }
                ]
            },
            {
                title: "Đã xử lý (Đã xử lý xong + Đã trả kết quả + Rút)",
                key: "",
                align: 'center',
                children: [
                    {
                        title: "Tổng số",
                        dataIndex: '',
                        align: "center",
                        key: '',
                        
                    },
                    {
                        title: "Trước hạn",
                        dataIndex: '',
                        align: "center",
                        key: '',
                        
                    },
                    {
                        title: "Trong hạn",
                        dataIndex: '',
                        align: "center",
                        key: '',
                        
                    },
                    {
                        title: "Quá hạn",
                        dataIndex: '',
                        align: "center",
                        key: '',
                        
                    },
                    
                ]
            },
            {
                title: "Đang xử lý",
                key: "",
                align: 'center',
                children: [
                    {
                        title: "Tổng số",
                        dataIndex: '',
                        align: "center",
                        key: '',
                        
                    },
                    {
                        title: "Trong hạn",
                        dataIndex: '',
                        align: "center",
                        key: '',
                        
                    },
                    {
                        title: "Quá hạn",
                        dataIndex: '',
                        align: "center",
                        key: '',
                        
                    },
                ]
            },
            {
                title: "Tạm dừng xử lý (Yêu cầu bổ sung, Yêu cầu thực hiện nghĩa vụ tài chính, Dừng xử lý)",
                key: "",
                align: 'center',
                children: [
                    {
                        title: "Tổng số",
                        dataIndex: '',
                        align: "center",
                        key: '',
                        
                    },
                    {
                        title: "Trong hạn",
                        dataIndex: '',
                        align: "center",
                        key: '',
                        
                    },
                    {
                        title: "Quá hạn",
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