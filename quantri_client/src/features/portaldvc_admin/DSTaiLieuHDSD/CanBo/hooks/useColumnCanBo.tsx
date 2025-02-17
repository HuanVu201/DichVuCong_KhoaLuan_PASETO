import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/lib/redux/Hooks'
import { IDSTaiLieuHDSD } from '../../models'
import { IBasePagination } from '@/models'
import { callApiAndDisplayFile, callApiAndDisplayPublicFile, getFileName } from '@/utils'

export const useColumnCanBo = (pagination: IBasePagination) => {
    const dispatch = useAppDispatch()
    const columns = useMemo((): ColumnsType<IDSTaiLieuHDSD> => {
        return [
            {
                title: "STT",
                key: 'STT',
                width:"5%",
                render: (_, record, idx) => {
                  const pageNumber = pagination.pageNumber ?? 1
                  const pageSize = pagination.pageSize ?? 10
                  return <>{(pageNumber - 1) * pageSize + idx + 1}</>
                },
              },
            {
                title: (<p style={{ textAlign: 'center' }}>Tên tài liệu</p>),
                key: "tenTaiLieu",
                dataIndex: "tenTaiLieu",
                width: '25%'
            },
            {
                title: (<p style={{ textAlign: 'center' }}>Mô tả</p>),
                key: "moTa",
                dataIndex: "moTa",
                width: '25%'
            },
            {
                title: (<p style={{ textAlign: 'center' }}>Tệp đính kèm</p>),
                key: "tepDinhKem",
                dataIndex: "tepDinhKem",
                width: '25%',
                align: 'center',
                render: (_, record) => (
                    <div >
                        <span style={{color : '#b73737'}} role='button' onClick={() => { callApiAndDisplayPublicFile(record.tepDinhKem) }}>{getFileName(record.tepDinhKem)}</span>
                    </div>
                )
            },
            {
                title: (<p style={{ textAlign: 'center' }}>Ngày đăng</p>),
                key: "ngayDang",
                dataIndex: "ngayDang",
                width: '25%',
                align: 'center'

            },

        ]
    }, [pagination])
    return { columns }
}