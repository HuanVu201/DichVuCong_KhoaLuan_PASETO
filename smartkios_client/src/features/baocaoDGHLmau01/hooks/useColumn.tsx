import { useEffect, useMemo, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space, TableColumnsType, Tag } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined, EyeOutlined, FormOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../../lib/redux/Hooks'
import { IBasePagination } from '../../../models'
import { DEFAULT_TABLE_CELL_LOAD_MORE_LENGTH } from '@/data'
import { SearchDonVi } from '@/features/donvi/redux/action'
import { SearchCoCauToChuc } from '@/features/cocautochuc/redux/crud'
import { useBaoCaoMau01Context } from '../contexts/BaoCao01Context'
import { IPhieuKhaoSat } from '@/features/hoso/components/actions/traKetQuaVaDanhGiaHaiLong/models'


export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const baoCaoMau01Context = useBaoCaoMau01Context()
    const { datas: donVis} = useAppSelector(state => state.cocautochuc)

    useEffect(() => {
        dispatch(SearchCoCauToChuc({ pageSize: 1500 }))
    }, [])

    const columns = useMemo((): TableColumnsType<IPhieuKhaoSat> => {
        return [
            {
                title: "STT",
                width: 20,
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Mã hồ sơ",
                key: "maHoSo",
                dataIndex: "maHoSo",
                align: 'center',
                width : 100, 
            },

            {
                title: "Đơn vị",
                key: "donVi",
                dataIndex: "donVi",
                align: 'center',
                width : 100, 
                render: (_, record) => {
                    const tenDonVi = donVis?.find(x => x.groupCode == record.donVi)
                    if (tenDonVi)
                        return tenDonVi.groupName;

                    return "Đơn vị không tồn tại"
                }

            },
           
            {
                title: "Chỉ số 1",
                key: "chiSo1",
                dataIndex: "chiSo1",
                width: 30,
                align: 'center'
            },
            {
                title: "Chỉ số 2",
                key: "chiSo2",
                dataIndex: "chiSo2",
                width: 30,
                align: 'center'
            },
            {
                title: "Chỉ số 3",
                key: "chiSo3",
                dataIndex: "chiSo3",
                width: 30,
                align: 'center'
            },
            {
                title: "Chỉ số 4",
                key: "chiSo4",
                dataIndex: "chiSo4",
                width: 30,
                align: 'center'
            },
            {
                title: "Chỉ số 5",
                key: "traLoi5",
                dataIndex: "traLoi5",
                width: 30,
                align: 'center'
            },
            {
                title: "Chỉ số 6",
                key: "chiSo6",
                dataIndex: "chiSo6",
                width: 30,
                align: 'center'
            },
            {
                title: "Chỉ số 7",
                key: "chiSo7",
                dataIndex: "chiSo7",
                width: 30,
                align: 'center'
            },
            {
                title: "Chỉ số 8",
                key: "traLoi8",
                dataIndex: "traLoi8",
                width: 30,
                align: 'center'
            },
            {
                title: "Chỉ số 9",
                key: "traLoi9",
                dataIndex: "traLoi9",
                width: 30,
                align: 'center'
            },

            {
                title: "Thao tác",
                dataIndex: '',
                width: 30,
                align: 'center',
                fixed: 'right',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <EyeOutlined style={{ color: "cornflowerblue" }} title="Đánh giá cơ quan" onClick={() => {
                            baoCaoMau01Context.setBaoCaoMau01Id(record.id)
                            baoCaoMau01Context.setBaoCaoMau01ModalVisible(true)
                        }} />

                      

                    </Space>
                )
            }
        ]
    }, [pagination])
    return { columns }
}