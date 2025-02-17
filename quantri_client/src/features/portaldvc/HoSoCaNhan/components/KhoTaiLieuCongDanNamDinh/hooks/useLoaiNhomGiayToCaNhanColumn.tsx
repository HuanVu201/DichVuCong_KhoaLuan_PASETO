import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined, LinkOutlined, ShareAltOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/lib/redux/Hooks'
import { IBasePagination } from '@/models'
import { AntdSpace } from '@/lib/antd/components'
import { FORMAT_TIME, ID_SEPARATE } from '@/data'
import { callApiAndDisplayFile } from '@/utils'
import { toast } from 'react-toastify'
import { ILoaiNhomGiayToCaNhan, ISearchLoaiNhomGiayToCaNhan } from '../models'
import { useKhoTaiLieuCongDanNamDinhContext } from '../contexts'
import { TaiLieuGiayToCaNhanApi } from '../services/TaiLieuGiayToCaNhanService'
import dayjs from 'dayjs'
import { LoaiNhomGiayToCaNhanApi } from '../services/LoaiNhomGiayToCaNhanService'
import { useKhoTaiLieuCongDanContext } from '../../KhoTaiLieuCongDan/contexts/KhoTaiLieuCongDanContext'

export const useLoaiNhomGiayToCaNhanColumn = ({ pageNumber, pageSize, searchParams, setSearchParams, type }: {
    pageNumber: number | undefined, pageSize: number | undefined,
    searchParams: ISearchLoaiNhomGiayToCaNhan | undefined,
    setSearchParams: React.Dispatch<React.SetStateAction<ISearchLoaiNhomGiayToCaNhan>>,
    type: string
}) => {
    const dispatch = useAppDispatch()
    const khoTaiLieuContext = useKhoTaiLieuCongDanContext()
    const columns = useMemo((): ColumnsType<ILoaiNhomGiayToCaNhan> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (_, record, idx) => {
                    const pageNumberr = pageNumber ?? 1
                    const pageSizee = pageSize ?? 10
                    return <>{(pageNumberr - 1) * pageSizee + idx + 1}</>
                },
            },
            {
                title: <p style={{ textAlign: 'center' }}>Tên {type}</p>,
                key: "ten",
                dataIndex: "ten",
            },
            {
                title: <p style={{ textAlign: 'center' }}>Ghi chú</p>,
                key: "ghiChu",
                dataIndex: "ghiChu",
            },
            {
                title: <p style={{ textAlign: 'center' }}>Thời gian tạo</p>,
                key: "createdOn",
                dataIndex: "createdOn",
                render: (_, record)=> (
                    <>
                        {record.createdOn ? dayjs(record.createdOn).format(FORMAT_TIME) : ''}
                    </>
                )
            },
            
            {
                title: "Thao tác",
                dataIndex: '',
                width: "10%",
                align: 'center',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <EditOutlined style={{ color: "cornflowerblue" }} title="Cập nhật" onClick={() => {
                            khoTaiLieuContext.setLoaiNhomId(record.id)
                            khoTaiLieuContext.setDetailLoaiNhomGiayToModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={async () => {
                                const res = await LoaiNhomGiayToCaNhanApi.Delete({ id: record.id, forceDelete: false })
                                console.log(res)
                                if (res.data.succeeded) {
                                    toast.success("Thao tác thành công!")
                                    setSearchParams({ ...searchParams, reFetch: true })
                                } else {
                                    toast.error(res.data.message)
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
    }, [{ pageNumber, pageSize }])
    return { columns }
}