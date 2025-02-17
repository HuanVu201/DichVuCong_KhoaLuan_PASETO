import { useMemo } from 'react'
import { ITypeOfProc_Mgr } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space, Tag } from 'antd'
import { DeleteOutlined, EditOutlined ,UnorderedListOutlined} from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
import { DeleteTypeOfProc_Mgr, SearchTypeOfProc_Mgr } from '../redux/action'
import { IBasePagination } from '../../../models'
import { useTypeOfProc_MgrContext } from '../contexts/TypeOfProc_MgrContext'
import { toast } from 'react-toastify'
import { useProcGroup_MgrContext } from '@/features/proGruop_Mgr/contexts/ProcGroup_MgrContext'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const ProcGroup_MgrContext = useProcGroup_MgrContext();
    const TypeOfProc_MgrContext = useTypeOfProc_MgrContext()
    const columns = useMemo((): ColumnsType<ITypeOfProc_Mgr> => {
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
                title: "Thứ tự",
                key: "thuTu",
                dataIndex: "thuTu",
            },
            // {
            //     title: "Nhóm thủ tục id",
            //     key: "nhomThuTucId",
            //     dataIndex: "nhomThuTucId",
            // },
            
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
                            TypeOfProc_MgrContext.setTypeOfProc_MgrId(record.id)
                            TypeOfProc_MgrContext.setTypeOfProc_MgrModalVisible(true)
                        }} />
                           <UnorderedListOutlined title='Xem danh thủ tục thuộc loại' onClick={() => {
                            console.log(record.id);
                            TypeOfProc_MgrContext.setTypeOfProc_MgrId(record.id)
                            TypeOfProc_MgrContext.setList_ProcOfThisTyPeModalVisible(true);
                            console.log(TypeOfProc_MgrContext.List_ProcOfThisTyPeModalVisible);
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={async () => {
                              try {
                                const resultAction =  await  dispatch(DeleteTypeOfProc_Mgr({ id: record.id, forceDelete: false }))
                                if (DeleteTypeOfProc_Mgr.fulfilled.match(resultAction)) {
                                    const { succeeded } = resultAction.payload;
                                    if (succeeded === true) {
                                      dispatch(SearchTypeOfProc_Mgr({  pageNumber: 1, pageSize: 50, nhomthutucid: ProcGroup_MgrContext.procGroup_MgrId, }));
                                    }
                                  }
                              } catch (error) {
                                console.error('Error:', error);  console.error('Error:', error);
                                toast.error("Có lỗi xảy ra");
                              }
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