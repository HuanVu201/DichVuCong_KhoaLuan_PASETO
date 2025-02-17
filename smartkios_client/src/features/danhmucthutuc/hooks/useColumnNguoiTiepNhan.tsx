import { useMemo, useState } from 'react'
import { IUser } from '../../user/models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space, TableColumnsType, Tag } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined, RollbackOutlined, SwapOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
import { AdminResetPassword, DeleteUser, SearchUser } from '../../user/redux/Actions'
import { IBasePagination } from '../../../models'
import { DEFAULT_TABLE_CELL_LOAD_MORE_LENGTH } from '@/data'
import { toast } from 'react-toastify'
import { useCoCauModalContext } from '@/features/cocautochuc/contexts/CoCauModalContext'


export const useColumnNguoiTiepNhanThuTuc = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()

    
    const columns = useMemo((): ColumnsType<IUser> => {
        return [
          {
            title: "STT",
            width: "5%",
            align: "center",
            render: (text, record, index) => index + 1,
          },
          {
            title: "Họ tên",
            key: "fullName",
            dataIndex: "fullName",
          },
          {
            title: "Tài khoản",
            key: "userName",
            dataIndex: "userName",
          },
          {
            title: "Chức vụ",
            key: "positionName",
            dataIndex: "positionName",
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
          
        ];
      }, [pagination]);
    return { columns }
}