import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import {  LinkOutlined } from '@ant-design/icons'
import { AntdSpace } from '@/lib/antd/components'
import { FORMAT_TIME, ID_SEPARATE } from '@/data'
import { callApiAndDisplayFile } from '@/utils'
import { IKySoNEAC } from '@/features/neac/models'
import dayjs from 'dayjs'

export const useTaiLieuKySoNamDinhColumn = ({ pageNumber, pageSize }: {
    pageNumber: number | undefined, pageSize: number | undefined,
}) => {
    
    const columns = useMemo((): ColumnsType<IKySoNEAC> => {
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
                title: <p style={{ textAlign: 'center' }}>Đơn vị cung cấp</p>,
                key: "tenGiayTo",
                dataIndex: "tenGiayTo",
            },
            {
                title: <p style={{ textAlign: 'center' }}>Tài liệu</p>,
                key: "duongDanFile",
                align: 'center',
                render: (_, record) => {
                    return (<>
                        {
                            record.duongDanFile?.split(ID_SEPARATE).map((dinhKem, idx) =>
                                <AntdSpace direction="horizontal" onClick={() => callApiAndDisplayFile(dinhKem)} key={idx}>
                                    {''} <LinkOutlined style={{ color: "yellowgreen" }} role='button' title={dinhKem.substring(dinhKem.lastIndexOf("/") + 1)} />
                                </AntdSpace>
                            )
                        }
                    </>)
                }
            },

            {
                title: <p style={{ textAlign: 'center' }}>Ngày ký</p>,
                key: "ngayKy",
                dataIndex: "ngayKy",
                render: (_, record) => (<>
                    {record.ngayKy ? dayjs(record.ngayKy).format(FORMAT_TIME) : ''}
                </>)
            },
        ]
    }, [{ pageNumber, pageSize }])
    return { columns }
}