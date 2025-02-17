import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { IBasePagination } from '../../../models'
import { ISearchUser, IUser } from '@/features/user/models'
import { useAppDispatch } from '@/lib/redux/Hooks'
import { useScreenActionContext } from '../contexts/ScreenActionContext'
import { IScreenAction, ISearchScreenAction } from '../models'
import { IAction } from '@/features/action/models'

export const useAddActionColumn = (pagination: ISearchScreenAction) => {
    const screenActionContext = useScreenActionContext()
    const dispatch = useAppDispatch()
    const columns = useMemo(() : ColumnsType<IAction> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Tên action",
                key: "ten",
                dataIndex: "ten",
            },
            {
                title: "Mã action",
                key: "ma",
                dataIndex: "ma",
            },
            // {
            //     title: "Thao tác",
            //     dataIndex: '',
            //     width:"10%",
            //     align:'center',
            //     key: '',
            //     render: (_, record) => (
            //         <Space direction="horizontal">
            //             <EyeOutlined style={{color:"cornflowerblue"}} title="Xem chi tiết" onClick={() => {
            //                 //TODO
            //             }} />
            //         </Space>
            //     )
            // }
        ]
    }, [pagination])
    return columns
}