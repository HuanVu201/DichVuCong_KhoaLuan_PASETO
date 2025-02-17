import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { IBasePagination } from '@/models'
import { IBaoCaoDonVi } from '@/features/baocaotonghop/model'

export const useColumn = () => {
    const columns = useMemo((): ColumnsType<IBaoCaoDonVi> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            // {
            //     title: "Mã đơn vị",
            //     key: "ma",
            //     dataIndex: "ma",
            // },
            {
                title: "Tên đơn vị",
                key: "tenThongKe",
                dataIndex: "tenThongKe",

            },
            {
                title: "Số hồ sơ nhận giải quyết",
                key: "tongSoHoSoNhanGiaiQuyet",
                children: [
                    {
                        title: "Tổng số",
                        dataIndex: 'tongSo',
                        align: "center",
                        key: 'tongSo',
                        
                    },
                    {
                        title: "Trong đó",
                        key: 'trongDo',
                        children: [
                            {
                                title: "Số mới tiếp nhận trực tuyến",
                                dataIndex: 'tiepNhanQuaMang',
                                align: "center",
                                key: 'tiepNhanQuaMang',
                            },
                            {
                                title: "Số mới tiếp nhận trực tiếp",
                                dataIndex: 'tiepNhanTrucTiep',
                                align: "center",
                                key: 'tiepNhanTrucTiep',
                            },
                            {
                                title: "Số mới tiếp nhận qua BCCI",
                                dataIndex: 'tiepNhanQuaBCCI',
                                align: "center",
                                key: 'tiepNhanQuaBCCI',
                            },
                            {
                                title: "Số kỳ trước chuyển qua",
                                dataIndex: 'tiepNhanKyTruoc',
                                align: "center",
                                key: 'tiepNhanKyTruoc',
                            }
                        ]
                    }
                ]
            },
            {
                title: "Kết quả giải quyết",
                key: "ketQuaGiaiQuyet",
                children : [
                    {
                        title: "Số hồ sơ đã giải quyết",
                        key: 'trongDo',
                        children : [
                            {
                                title: "Tổng số",
                                key: 'tongSoXuLyHoSoDaGiaiQuyet',
                                align: "center",
                                render: (_, record) => {
                                    return <>{record.daXuLyDungHan + record.daXuLyQuaHan}</>
                                }
                            },
                            {
                                title: "Trả đúng thời hạn",
                                dataIndex: 'daXuLyDungHan',
                                align: "center",
                                key: 'daXuLyDungHan',
                            },
                            {
                                title: "Trả quá hạn",
                                dataIndex: 'daXuLyQuaHan',
                                align: "center",
                                key: 'daXuLyQuaHan',
                            }
                        ]
                    },
                    {
                        title: "Số hồ sơ đang giải quyết",
                        key: 'trongDo',
                        children : [
                            {
                                title: "Tổng số",
                                align: "center",
                                key: 'tongSoXuLyHoSoDangGiaiQuyet',
                                render: (_, record) => {
                                    return <>{record.dangXuLyTrongHan + record.dangXuLyQuaHan}</>
                                }
                            },
                            {
                                title: "Chưa đến hạn",
                                dataIndex: 'dangXuLyTrongHan',
                                align: "center",
                                key: 'dangXuLyTrongHan',
                            },
                            {
                                title: "Quá hạn",
                                dataIndex: 'dangXuLyQuaHan',
                                align: "center",
                                key: 'dangXuLyQuaHan',
                            }
                        ]
                    },
                ]
            },
            {
                title: "Chờ bổ sung(lũy kế cả kì trước)",
                key: "tongBoSung",
                align: "center",
                dataIndex: "tongBoSung",
            },
            {
                title: "Trả lại/Rút HS",
                key: "tongTraLai",
                align: "center",
                dataIndex: "tongTraLai",
            },
            {
                title: "Tỷ lệ hài lòng",
                key: "maNHThuHuong",
                dataIndex: "maNHThuHuong",
                align: "center",
            },


        ]
    }, [])
    return { columns }
}