import { useMemo } from 'react'
import { IDonViThuTuc } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space, Tag } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
import { DeleteDonViThuTuc } from '../redux/action'
import { IBasePagination } from '../../../models'
import { useDonViThuTucContext } from '../contexts/DonViThuTucContext'
import { IDonVi, ISearchDonVi } from '@/features/donvi/models'
import { useDonViContext } from '@/features/donvi/contexts/DonViContext'

export const useColumn = (pagination: IBasePagination, setSearchDonViThuTucParams : React.Dispatch<React.SetStateAction<ISearchDonVi>>) => {
    const dispatch = useAppDispatch()
    // const donViThuTucContext = useDonViThuTucContext()
    const donViContext = useDonViContext()
    const columns = useMemo(() : ColumnsType<IDonVi> => {
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
                key: "groupName",
                dataIndex: "groupName",
            },
            {
                title: "Tài khoản thụ hưởng",
                key: "tenTKThuHuong",
                dataIndex: "tenTKThuHuong",
            },
            {
                title: "Số tài khoản",
                key: "tkThuHuong",
                dataIndex: "tkThuHuong",
            },
            {
                title: "Mã ngân hàng thụ hưởng",
                key: "maNHThuHuong",
                dataIndex: "maNHThuHuong",
            },
            {
                title: "Người tiếp nhận",
                key: "nguoiTiepNhan",
                dataIndex: "nguoiTiepNhan",
                render: (_, record) => {
                    return <>
                        {record.nguoiTiepNhan?.map((user, index) => (
                            <Tag color="volcano" key={index}>{user.userName}</Tag>
                        ))}
                    </>
                }
            },
            
            {
                title: "Thao tác",
                dataIndex: '',
                width:"10%",
                align:'center',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <EditOutlined style={{color:"cornflowerblue"}} title="Xem chi tiết/Sửa" onClick={() => {
                            donViContext.setDonViId(record.id)
                            donViContext.setDonViModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm ={ async () => {
                                await dispatch(DeleteDonViThuTuc({ id: record.id, forceDelete: false })).unwrap()
                                setSearchDonViThuTucParams(cur => ({...cur}))
                            } }
                            okText='Xoá'
                            cancelText='Huỷ'
                        >
                            <DeleteOutlined style={{color:"tomato"}}/>
                        </Popconfirm>
                    </Space>
                )
            }
        ]
    }, [pagination])
    return {columns}
}