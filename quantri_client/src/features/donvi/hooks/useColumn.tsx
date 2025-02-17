import { useMemo } from 'react'
import { IDonVi } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
import { DeleteDonVi } from '../redux/action'
import { IBasePagination } from '../../../models'
import { useDonViContext } from '../contexts/DonViContext'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const donViContext = useDonViContext()
    const columns = useMemo((): ColumnsType<IDonVi> => {
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
                title: "Thao tác",
                dataIndex: '',
                width: "10%",
                align: 'center',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <EditOutlined style={{ color: "cornflowerblue" }} title="Xem chi tiết/Sửa" onClick={() => {
                            donViContext.setDonViId(record.id)
                            donViContext.setDonViModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteDonVi({ id: record.id, forceDelete: false }))
                            }}
                            okText='Xoá'
                            cancelText='Huỷ'
                        >
                            <DeleteOutlined style={{ color: "tomato" }} />
                        </Popconfirm>
                    </Space>
                )
            }
        ]
    }, [pagination])
    return { columns }
}