import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined, LinkOutlined, ShareAltOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/lib/redux/Hooks'
import { IBasePagination } from '@/models'
import { AntdSpace } from '@/lib/antd/components'
import { ID_SEPARATE } from '@/data'
import { callApiAndDisplayFile } from '@/utils'
import { toast } from 'react-toastify'
import { ISearchTaiLieuGiayToCaNhan, ITaiLieuGiayToCaNhan } from '../models'
import { useKhoTaiLieuCongDanNamDinhContext } from '../contexts'
import { TaiLieuGiayToCaNhanApi } from '../services/TaiLieuGiayToCaNhanService'

export const useTaiLieuGiayToCaNhanNamDinhColumn = ({ pageNumber, pageSize, searchParams, setSearchParams }: {
    pageNumber: number | undefined, pageSize: number | undefined,
    searchParams: ISearchTaiLieuGiayToCaNhan | undefined,
    setSearchParams: React.Dispatch<React.SetStateAction<ISearchTaiLieuGiayToCaNhan>>,
}) => {
    const dispatch = useAppDispatch()
    const khoTaiLieuContext = useKhoTaiLieuCongDanNamDinhContext()
    const columns = useMemo((): ColumnsType<ITaiLieuGiayToCaNhan> => {
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
                title: <p style={{ textAlign: 'center' }}>Tên giấy tờ</p>,
                key: "tenGiayTo",
                dataIndex: "tenGiayTo",
            },
            {
                title: <p style={{ textAlign: 'center' }}>Loại/nhóm giấy tờ</p>,
                key: "loaiTaiLieu",
                dataIndex: "loaiTaiLieu",
            },
            {
                title: <p style={{ textAlign: 'center' }}>Tài liệu</p>,
                key: "duongDan",
                align: 'center',
                render: (_, record) => {
                    return (<>
                        {
                            record.duongDan?.split(ID_SEPARATE).map((dinhKem, idx) =>
                                <AntdSpace direction="horizontal" onClick={() => callApiAndDisplayFile(dinhKem)} key={idx}>
                                    {''} <LinkOutlined style={{ color: "yellowgreen" }} role='button' title={dinhKem.substring(dinhKem.lastIndexOf("/") + 1)} />
                                </AntdSpace>
                            )
                        }
                    </>)
                }
            },
            {
                title: "Thao tác",
                dataIndex: '',
                width: "10%",
                align: 'center',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                       
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={async () => {
                                const res = await TaiLieuGiayToCaNhanApi.Delete({ id: record.id, forceDelete: false })
                                console.log(res)
                                if (res.data.succeeded) {
                                    toast.success(res.data.message)
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