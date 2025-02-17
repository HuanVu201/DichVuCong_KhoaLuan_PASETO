import { useEffect, useMemo, useState } from 'react'
import { IDanhGiaCoQuan } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space, TableColumnsType, Tag } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined, FormOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../../lib/redux/Hooks'
import { DeleteDanhGiaCoQuan } from '../redux/action'
import { IBasePagination } from '../../../models'
import { useDanhGiaCoQuanContext } from '../contexts/DanhGiaCoQuanContext'
import { DEFAULT_TABLE_CELL_LOAD_MORE_LENGTH } from '@/data'
import { SearchDonVi } from '@/features/donvi/redux/action'
import { SearchCoCauToChuc } from '@/features/cocautochuc/redux/crud'


export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const DanhGiaCoQuanContext = useDanhGiaCoQuanContext()
    const { datas: donVis} = useAppSelector(state => state.cocautochuc)

    useEffect(() => {
        dispatch(SearchCoCauToChuc({ pageSize: 1500 }))
    }, [])

    const columns = useMemo((): TableColumnsType<IDanhGiaCoQuan> => {
        return [
            {
                title: "STT",
                width: "3%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Cơ quan",
                key: "donVi",
                dataIndex: "donVi",
                align: 'center',
                width : 300, 
                render: (_, record) => {
                    const tenDonVi = donVis?.find(x => x.groupCode == record.donVi)
                    if (tenDonVi)
                        return tenDonVi.groupName;

                    return "Đơn vị không tồn tại"
                }

            },
            {
                title: "Quý",
                key: "quy",
                dataIndex: "quy",
                align: 'center'
            },
            {
                title: "Năm",
                key: "nam",
                dataIndex: "nam",
                align: 'center'
            },
            {
                title: "Chỉ số 1",
                key: "traLoi1",
                dataIndex: "traLoi1",
                align: 'center'
            },
            {
                title: "Chỉ số 2",
                key: "traLoi2",
                dataIndex: "traLoi2",
                align: 'center'
            },
            {
                title: "Chỉ số 3",
                key: "traLoi3",
                dataIndex: "traLoi3",
                align: 'center'
            },
            {
                title: "Chỉ số 4",
                key: "traLoi4",
                dataIndex: "traLoi4",
                align: 'center'
            },
            {
                title: "Chỉ số 5",
                key: "traLoi5",
                dataIndex: "traLoi5",
                align: 'center'
            },
            {
                title: "Chỉ số 6",
                key: "traLoi6",
                dataIndex: "traLoi6",
                align: 'center'
            },
            {
                title: "Chỉ số 7",
                key: "traLoi7",
                dataIndex: "traLoi7",
                align: 'center'
            },
            {
                title: "Chỉ số 8",
                key: "traLoi8",
                dataIndex: "traLoi8",
                align: 'center'
            },
            {
                title: "Chỉ số 9",
                key: "traLoi9",
                dataIndex: "traLoi9",
                align: 'center'
            },

            {
                title: "Thao tác",
                dataIndex: '',
                align: 'center',
                fixed: 'right',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <EditOutlined style={{ color: "cornflowerblue" }} title="Đánh giá cơ quan" onClick={() => {
                            DanhGiaCoQuanContext.setDanhGiaCoQuanId(record.id)
                            DanhGiaCoQuanContext.setDanhGiaCoQuanModalVisible(true)
                        }} />

                        <FormOutlined style={{ color: "cornflowerblue" }} title="Chấm thẩm định" onClick={() => {
                            DanhGiaCoQuanContext.setDanhGiaCoQuanId(record.id)
                            DanhGiaCoQuanContext.setChamThamDinhModalVisible(true)
                        }} />

                    </Space>
                )
            }
        ]
    }, [pagination])
    return { columns }
}