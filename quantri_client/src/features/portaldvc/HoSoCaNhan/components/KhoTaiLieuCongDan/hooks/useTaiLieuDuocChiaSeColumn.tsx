import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined, LinkOutlined, ShareAltOutlined } from '@ant-design/icons'
import { useAppDispatch } from '@/lib/redux/Hooks'
import { IBasePagination } from '@/models'
import { useKhoTaiLieuCongDanContext } from '../contexts/KhoTaiLieuCongDanContext'
import { ITaiLieuLuuTruCongDan, ISearchTaiLieuLuuTruCongDan, Nguon_CongDanTaiLen } from '../models'
import { AntdSpace } from '@/lib/antd/components'
import { FORMAT_TIME, ID_SEPARATE } from '@/data'
import { callApiAndDisplayFile } from '@/utils'
import { khoTaiLieuCongDanApi } from '../services'
import { toast } from 'react-toastify'
import dayjs from "dayjs";

export const useTaiLieuDuocChiaSeColumn = ({ pageNumber, pageSize, searchParams, setSearchParams }: {
    pageNumber: number | undefined, pageSize: number | undefined,
    searchParams: ISearchTaiLieuLuuTruCongDan | undefined,
    setSearchParams: React.Dispatch<React.SetStateAction<ISearchTaiLieuLuuTruCongDan>>,
}) => {
    const dispatch = useAppDispatch()
    const khoTaiLieuContext = useKhoTaiLieuCongDanContext()
    const columns = useMemo((): ColumnsType<ITaiLieuLuuTruCongDan> => {
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
                title: <p style={{ textAlign: 'center' }}>Người chia sẻ</p>,
                key: "tenNguoiChiaSe",
                dataIndex: "tenNguoiChiaSe",
            },
            {
                title: <p style={{ textAlign: 'center' }}>Thời gian chia sẻ</p>,
                key: "createdOn",
                align: 'center',
                render: (_, record) => {
                    return (<>
                        {
                            record.createdOn
                                ? <p>{dayjs(record.createdOn).format(FORMAT_TIME)}</p> : null
                        }
                    </>)
                }
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
                title: <p style={{ textAlign: 'center' }}>Dung lượng</p>,
                key: "dungLuong",
                align: 'center',
                render: (_, record) => {
                    return (<>
                        {(Math.floor((record.dungLuong ?? 0) * 100) / 100).toString()} MB
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
                                const res = await khoTaiLieuCongDanApi.DeleteTaiLieuChiaSe({ id: record.id, forceDelete: false })
                     
                                if (res.status == 200) {
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