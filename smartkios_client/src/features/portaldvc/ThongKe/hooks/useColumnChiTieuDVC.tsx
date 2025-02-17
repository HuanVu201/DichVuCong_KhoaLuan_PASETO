import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { IBasePagination } from '@/models'
import { IBaoCaoDonVi, IThongKeChiTieuDVCElement } from '@/features/baocaotonghop/model'

export const useColumnChiTieuDVC = () => {
    const columns = useMemo((): ColumnsType<IThongKeChiTieuDVCElement> => {
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
                title: "Cung cấp DVC trực tuyến",
                key: "",
                children: [
                    {
                        title: "Tổng số thủ tục",
                        dataIndex: '',
                        align: "center",
                        key: '',

                    },
                    {
                        title: "DVC trực tuyến",
                        key: '',
                        children: [
                            {
                                title: "Tổng số",
                                dataIndex: '',
                                align: "center",
                                key: '',
                            },
                            {
                                title: "Toàn trình",
                                dataIndex: '',
                                align: "center",
                                key: '',
                            },
                            {
                                title: "Một phần",
                                dataIndex: '',
                                align: "center",
                                key: '',
                            }
                        ]
                    }
                ]
            },
            {
                title: "Phát sinh hồ sơ",
                key: "",
                children: [
                    {
                        title: "Tổng",
                        key: '',
                        children: [
                            {
                                title: "Số thủ tục phát sinh hồ sơ",
                                key: '',
                                align: "center",
                                // render: (_, record) => {
                                //     return <>{record}</>
                                // }
                            },
                            {
                                title: "Số hồ sơ phát sinh cả trực tuyến và trực tiếp",
                                dataIndex: '',
                                align: "center",
                                key: '',
                            },
                            {
                                title: "Số thủ tục trực tuyến phát sinh hồ sơ",
                                dataIndex: '',
                                align: "center",
                                key: '',
                            },
                            {
                                title: "Số hồ sơ phát sinh cả trực tuyến và trực tiếp trong các thủ tục trực tuyến",
                                dataIndex: '',
                                align: "center",
                                key: '',
                            },
                            {
                                title: "Số hồ sơ phát sinh trực tuyến",
                                dataIndex: '',
                                align: "center",
                                key: '',
                            },
                            
                        ]
                    },
                    {
                        title: "Toàn trình",
                        key: '',
                        children: [
                            {
                                title: "Số thủ tục",
                                dataIndex: '',
                                align: "center",
                                key: '',
                            },
                            {
                                title: "Số hồ sơ phát sinh cả trực tuyến và trực tiếp",
                                dataIndex: '',
                                align: "center",
                                key: '',
                            },
                            {
                                title: "Số hồ sơ phát sinh trực tuyến",
                                dataIndex: '',
                                align: "center",
                                key: '',
                            },
                        ]
                    },
                    {
                        title: "Một phần",
                        key: '',
                        children: [
                            {
                                title: "Số thủ tục",
                                dataIndex: '',
                                align: "center",
                                key: '',
                            },
                            {
                                title: "Số hồ sơ phát sinh cả trực tuyến và trực tiếp",
                                dataIndex: '',
                                align: "center",
                                key: '',
                            },
                            {
                                title: "Số hồ sơ phát sinh trực tuyến",
                                dataIndex: '',
                                align: "center",
                                key: '',
                            },
                        ]
                    },
                    {
                        title: "Dịch vụ công",
                        key: '',
                        children: [
                            {
                                title: "Số thủ tục",
                                align: "center",
                                key: '',
                                // render: (_, record) => {
                                //     return <>{record.dangXuLyTrongHan + record.dangXuLyQuaHan}</>
                                // }
                            },
                            {
                                title: "Số thủ tục phát sinh hồ sơ",
                                dataIndex: '',
                                align: "center",
                                key: '',
                            },
                            {
                                title: "Số hồ sơ phát sinh",
                                dataIndex: '',
                                align: "center",
                                key: '',
                            }
                        ]
                    },
                ]
            },



        ]
    }, [])
    return { columns }
}