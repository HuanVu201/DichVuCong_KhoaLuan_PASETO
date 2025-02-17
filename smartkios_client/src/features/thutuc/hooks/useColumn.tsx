import { useMemo, useState } from 'react'
import { IThuTuc } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space, TableColumnsType, Table } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, ForkOutlined, EyeOutlined, UnorderedListOutlined, MoneyCollectOutlined, EditOutlined, DollarOutlined, AppstoreAddOutlined, MoreOutlined, SwapOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
import { DeleteThuTuc, UpdateThuTuc } from '../redux/action'
import { IBasePagination } from '../../../models'
import { useThuTucContext } from '../contexts/ThuTucContext'
import { usePhiLePhiContext } from '@/features/philephi/contexts/PhiLePhiContext'
export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const thuTucContext = useThuTucContext()

    const expandedColumns = useMemo(() => {
        const columns: TableColumnsType<IThuTuc> =
            [
                {
                    title: "STT",
                    width: "5%",
                    align: "center",
                    render: (text, record, index) => index + 1,
                },
                {
                    title: "Mã thủ tục",
                    key: "maTTHC",
                    dataIndex: "maTTHC",
                },
                {
                    title: "Tên thủ tục",
                    key: "tenTTHC",
                    dataIndex: "tenTTHC",
                },
                // {
                //     title: "ĐKKQ",
                //     key: "dkkq",
                //     render: (_, record) => {
                //         return <div>null</div>
                //     }
                // },
                {
                    title: "Có phí, lệ phí",
                    key: "trangThaiPhiLePhi",
                    dataIndex: "trangThaiPhiLePhi",
                    align: 'center',
                    render: (text) => text == true ? <CheckCircleOutlined style={{ color: 'green' }}></CheckCircleOutlined> : <CloseCircleOutlined style={{ color: 'red' }}></CloseCircleOutlined>
                },
                {
                    title: "Sử dụng",
                    key: "suDung",
                    dataIndex: "suDung",
                    align: 'center',
                    render: (text, record) =>
                    (
                        <Space style={{ cursor: 'pointer' }} direction='horizontal'>
                            <Popconfirm
                                title='Cập nhật?'
                                onConfirm={() => {
                                    dispatch(UpdateThuTuc({ id: record.id, data: { ...record, suDung: !record.suDung, linhVucId: "", goiTinThuTucQG: null as any, ngayCapNhat: record.ngayCapNhat } }))
                                }}
                                okText='OK'
                                cancelText='Huỷ'
                            >
                                {text == true ? <CheckCircleOutlined style={{ color: 'green' }}></CheckCircleOutlined> : <CloseCircleOutlined style={{ color: 'red' }}></CloseCircleOutlined>}
                            </Popconfirm>
                        </Space>
                    )

                },
                {
                    title: "Liên thông",
                    key: "lienThong",
                    align: 'center',
                    render: (_, record) => {

                        return record.lienThong ? <CheckCircleOutlined style={{ color: 'green' }} /> : <CloseCircleOutlined style={{ color: 'red' }} />
                    }
                },
                {
                    title: "Thao tác",
                    width: "10%",
                    align: 'center',
                    key: 'thaotac',
                    render: (_, record) => (
                        <Space direction="horizontal">
                            <EditOutlined style={{ color: "cornflowerblue" }} title="Xem chi tiết thủ tục" onClick={() => {
                                thuTucContext.setThuTucId(record.id)
                                thuTucContext.setThuTucModalVisible(true)
                            }} />
                            <DollarOutlined title='Phí,lệ phí' onClick={() => {
                                thuTucContext.setThuTucId(record.maTTHC)
                                thuTucContext.setPhiLePhiModalVisible(true)
                            }}>
                            </DollarOutlined>
                            <AppstoreAddOutlined title='Kết quả thủ tục' onClick={() => {
                                thuTucContext.setThuTucId(record.maTTHC)
                                thuTucContext.setKetQuaThuTucModalVisible(true)
                            }} />
                            <UnorderedListOutlined title='Xem danh sách trường hợp thủ tục' onClick={() => {
                                // console.log(record.id);
                                thuTucContext.setThuTucId(record.maTTHC)
                                thuTucContext.setTruongHopThuTucModalVisible(true)
                            }} />
                            <ForkOutlined title='Danh sách đơn vị thực hiện' onClick={() => {
                                thuTucContext.setThuTucId(record.maTTHC)
                                thuTucContext.setDonViThuTucModalVisible(true)
                                thuTucContext.setTenThuTuc(record.tenTTHC)
                            }}>
                            </ForkOutlined>
                            {/* <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteThuTuc({ id: record.id, forceDelete: false }))
                            } }
                            okText='Xoá'
                            cancelText='Huỷ'
                        >
                            <DeleteOutlined style={{color:"tomato"}}/>
                        </Popconfirm> */}
                        </Space>
                    )
                }
            ]
        return columns
    }, [pagination])
    // const columns = useMemo((): ColumnsType<IThuTuc> => {
    //     return [
    //         { title: 'Tên lĩnh vực', dataIndex: 'linhVucChinh', key: 'linhVucChinh' },
    //         { title: 'Mã lĩnh vực', dataIndex: 'maLinhVucChinh', key: 'maLinhVucChinh' },
    //     ];
    // }, [pagination])
    return { expandedColumns }
}