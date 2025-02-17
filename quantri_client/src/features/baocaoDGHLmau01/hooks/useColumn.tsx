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
    const { datas: donVis } = useAppSelector(state => state.cocautochuc)
    const { data: user } = useAppSelector(state => state.user)

    useEffect(() => {
        dispatch(SearchCoCauToChuc({ pageSize: 1500, groupCode: user?.officeCode, getAllChildren: true, type: 'don-vi' }))
    }, [])

    const columns = useMemo((): TableColumnsType<IPhieuKhaoSat> => {
        return [
            {
                title: "STT",
                width: '3%  ',
                align: "center",
                render: (_, record, idx) => {
                    const pageNumber = pagination.pageNumber ?? 1
                    const pageSize = pagination.pageSize ?? 10
                    return <>{(pageNumber - 1) * pageSize + idx + 1}</>
                },
            },
            {
                title: "Mã hồ sơ",
                key: "maHoSo",
                dataIndex: "maHoSo",
                width: 200,
                align: 'center',
            },

            {
                title: "Đơn vị",
                key: "groupName",
                dataIndex: "groupName",
                width: 300,
                align: 'center',
            },

            {
                title: "Chỉ số 1",
                key: "chiSo1",
                dataIndex: "chiSo1",
                align: 'center'
            },
            {
                title: "Chỉ số 2",
                key: "chiSo2",
                dataIndex: "chiSo2",
                align: 'center'
            },
            {
                title: "Chỉ số 3",
                key: "chiSo3",
                dataIndex: "chiSo3",
                align: 'center'
            },
            {
                title: "Chỉ số 4",
                key: "chiSo4",
                dataIndex: "chiSo4",

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
                key: "chiSo6",
                dataIndex: "chiSo6",

                align: 'center'
            },
            {
                title: "Chỉ số 7",
                key: "chiSo7",
                dataIndex: "chiSo7",

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
                title: "Chỉ số 10",
                key: "chiSo10",
                dataIndex: "chiSo10",
                align: 'center',

            },
            {
                title: "Chỉ số 11",
                key: "chiSo11",
                dataIndex: "chiSo11",
                align: 'center',

            },

            {
                title: "Thao tác",
                dataIndex: '',

                align: 'center',
                fixed: 'right',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <EyeOutlined style={{ color: "cornflowerblue" }} title="Xem chi tiết" onClick={() => {
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