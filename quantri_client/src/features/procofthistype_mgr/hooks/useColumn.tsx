import { useMemo } from 'react'
import { IProcOfThisType_Mgr } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space, Tag } from 'antd'
import { DeleteOutlined, EditOutlined ,UnorderedListOutlined} from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
import { DeleteProcOfThisType_Mgr } from '../redux/action'
import { IBasePagination } from '../../../models'
import { useProcOfThisType_MgrContext } from '../contexts/ProcOfThisType_MgrContext'
import { toast } from 'react-toastify'
import { SearchTypeOfProc_Mgr } from '@/features/typeOfProc_Mgr/redux/action'
import { useTypeOfProc_MgrContext } from '@/features/typeOfProc_Mgr/contexts/TypeOfProc_MgrContext'

export const useColumn = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const ProcOfThisType_MgrContext = useProcOfThisType_MgrContext()
    const typeOfProc_MgrContext = useTypeOfProc_MgrContext()
    const columns = useMemo((): ColumnsType<IProcOfThisType_Mgr> => {
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
            //     title: "Loại thủ tục",
            //     key: "loaiThuTucId",
            //     dataIndex: "loaiThuTucId",
            // },
            // {
            //     title: "Thủ tục",
            //     key: "thuTucID",
            //     dataIndex: "thuTucID",
            // },
            {
                title: "Tên thủ tục",
                key: "tenThuTuc",
                dataIndex: "tenThuTuc",
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
                            ProcOfThisType_MgrContext.setProcOfThisType_MgrId(record.id)
                            ProcOfThisType_MgrContext.setProcOfThisType_MgrModalVisible(true)
                        }} />
                           {/* <UnorderedListOutlined title='Xem danh sách loại thử tục' onClick={() => {
                            console.log(record.id);
                            ProcOfThisType_MgrContext.setProcOfThisType_MgrId(record.id)
                            ProcOfThisType_MgrContext.setList_ProcOfThisType_MgrModalVisible(true);
                        }} /> */}
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={async() => {
                               // dispatch(DeleteProcOfThisType_Mgr({ id: record.id, forceDelete: false }))
                                try {
                                    const resultAction =  await  dispatch(DeleteProcOfThisType_Mgr({ id: record.id, forceDelete: false }))
                                    if (DeleteProcOfThisType_Mgr.fulfilled.match(resultAction)) {
                                        const { succeeded } = resultAction.payload;
                                        if (succeeded === true) {
                                          dispatch(SearchTypeOfProc_Mgr({  pageNumber: 1, pageSize: 50, nhomthutucid: typeOfProc_MgrContext.typeOfProc_MgrId,}));
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