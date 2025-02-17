import { useEffect, useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../../lib/redux/Hooks'
import { IBasePagination } from '../../../models'
import { SearchDonVi } from '@/features/donvi/redux/action'
import { IUser } from '@/features/user/models'


export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()

    const columns = useMemo((): ColumnsType<IUser> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (_, record, idx) => {
                    const pageNumber = pagination.pageNumber ?? 1
                    const pageSize = pagination.pageSize ?? 10
                    return <>{(pageNumber - 1) * pageSize + idx + 1}</>
                },
            },
            {
                title: <p style={{ textAlign: 'center' }}>ID</p>,
                key: "id",
                dataIndex: "id",
            },
            {
                title: <p style={{ textAlign: 'center' }}>Tên người dùng (tài khoản)</p>,
                key: "fullName",
                dataIndex: "fullName",
                render: (_, record) => {
                    return (
                        <div>
                            {record.fullName} ({record.userName})
                        </div>
                    )
                }
            },
            {
                title: <p style={{ textAlign: 'center' }}>Đơn vị - Phòng ban (GroupCode)</p>,
                key: "officeName",
                dataIndex: "officeName",
                render: (_, record) => {
                    return (
                        <div>
                            {record.officeName} - {record.groupName} ({record.groupCode})
                        </div>
                    )
                }
            },
            {
                title: <p style={{ textAlign: 'center' }}>Chức vụ</p>,
                key: "positionName",
                dataIndex: "positionName",
            },
            // {
            //     title: "Mã định danh officeCode",
            //     key: "maDinhDanhOfficeCode",
            //     dataIndex: "maDinhDanhOfficeCode",
            //     align : 'center'

            // },
            {
                title: "Thời gian xóa",
                key: "thoiGianXoa",
                dataIndex: "thoiGianXoa",
                align: 'center'
            },



        ]
    }, [pagination])
    return { columns }
}