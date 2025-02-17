import { useMemo } from 'react'
import { IProcGroup_Mgr } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space, Tag } from 'antd'
import { DeleteOutlined, EditOutlined ,UnorderedListOutlined} from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
import { DeleteProcGroup_Mgr } from '../redux/action'
import { IBasePagination } from '../../../models'
import { useProcGroup_MgrContext } from '../contexts/ProcGroup_MgrContext'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const ProcGroup_MgrContext = useProcGroup_MgrContext()
    const columns = useMemo((): ColumnsType<IProcGroup_Mgr> => {
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
                title: "Tên",
                key: "ten",
                dataIndex: "ten",
            },
            {
                title: "Mô tả",
                key: "moTa",
                dataIndex: "moTa",
            },
            {
                title: "Icon",
                key: "icon",
                dataIndex: "icon",
            },
            {
                title: "Màu sắc",
                key: "mauSac",
                dataIndex: "mauSac",
            },
            {
                title: "Đối tượng",
                key: "doiTuong",
                dataIndex: "doiTuong",
            },
            {
                title: "Thứ tự",
                key: "thuTu",
                dataIndex: "thuTu",
            },
            // {
            //     title: "Sử dụng",
            //     key: "suDung",
            //     dataIndex: "suDung",
            //     width: '5%',
            //     render: (_, record) => {
            //         return <Tag color={record.suDung ? "green" : "red"} style={{ display: 'flex', justifyContent: 'center' }}>
            //             {record.suDung ? "Có" : "Không"}
            //         </Tag>
            //     }
            // },
            {
                title: "Thao tác",
                dataIndex: '',
                width: "10%",
                align: 'center',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <EditOutlined style={{ color: "cornflowerblue" }} title="Xem chi tiết/Sửa" onClick={() => {
                            ProcGroup_MgrContext.setProcGroup_MgrId(record.id)
                            ProcGroup_MgrContext.setProcGroup_MgrModalVisible(true)
                        }} />
                           <UnorderedListOutlined title='Xem danh sách loại thử tục' onClick={() => {
                            console.log(record.id);
                            ProcGroup_MgrContext.setProcGroup_MgrId(record.id)
                            ProcGroup_MgrContext.setList_TypeOfProc_MgrModalVisible(true);
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                dispatch(DeleteProcGroup_Mgr({ id: record.id, forceDelete: false }))
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