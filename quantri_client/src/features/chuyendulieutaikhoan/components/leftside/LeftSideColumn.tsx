import { useMemo, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space, TableColumnsType, Tag, Typography } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { DEFAULT_TABLE_CELL_LOAD_MORE_LENGTH } from '@/data'
import { IBasePagination } from '@/models'
import { IUser } from '@/features/user/models'


export const useColumn = (pagination: IBasePagination) => {

    const columns = useMemo((): TableColumnsType<IUser> => {
        return [
            {
                title: "Họ và tên",
                key: "fullName",
                dataIndex: "fullName",
            },
            {
                title: "Tài khoản",
                key: "userName",
                dataIndex: "userName",
            },
            {
                title: "Phòng ban",
                key: "groupName",
                dataIndex: "groupName",
            },
            {
                title: "Đơn vị",
                key: "officeName",
                dataIndex: "officeName",
            },
            {
                title: "Chức vụ",
                key: "positionName",
                dataIndex: "positionName",
            },

        ]
    }, [pagination])
    return { columns }
}