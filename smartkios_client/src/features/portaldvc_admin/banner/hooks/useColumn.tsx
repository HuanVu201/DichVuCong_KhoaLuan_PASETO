import { useMemo } from 'react'
import { IBanner } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../../lib/redux/Hooks'
import { DeleteBanner } from '../redux/action'
import { IBasePagination } from '../../../../models'
import { useBannerContext } from '../contexts/BannerContext'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const bannerContext = useBannerContext()
    const columns = useMemo(() : ColumnsType<IBanner> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Đường dẫn ảnh",
                key: "imageUrl",
                dataIndex: "imageUrl",
            },
            {
                title: "Sử dụng",
                key: "suDung",
                dataIndex: "suDung",
                align: 'center',
                render: (text) => text == true ? <CheckCircleOutlined style={{color : 'green'}}></CheckCircleOutlined> : <CloseCircleOutlined style={{color : 'red'}}></CloseCircleOutlined>
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
                            bannerContext.setMaBanner(record.id)
                            bannerContext.setMaBannerModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteBanner({ id: record.id, forceDelete: false }))
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