
import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { LinkOutlined } from '@ant-design/icons'
import { FORMAT_DATE, FORMAT_DATE_WITHOUT_TIME, HOST_PATH, ID_SEPARATE } from '@/data'
import { IGiayToSoHoa } from '@/features/giaytosohoa/models'
import dayjs from 'dayjs'
import { AntdSpace } from '@/lib/antd/components'
import { callApiAndDisplayFile } from '@/utils'
import { GIAYTOSOHOA_LOAISOHOA } from '../data/formData'

export const useGiayToSoHoaColumn = () => {
    const columns = useMemo(() : ColumnsType<IGiayToSoHoa> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Tên giấy tờ",
                key: "ten",
                width:"35%",
                dataIndex: "ten",
            },
            {
                title: "Mã giấy tờ",
                key: "ma",
                dataIndex: "ma",
            },
            {
                title: "Người số hóa",
                key: "fullName",
                dataIndex: "fullName",
            },
            {
                title: "Đơn vị",
                key: "groupName",
                dataIndex: "groupName",
            },
            {
                title: "Thời hạn",
                key: "thoiGianSoHoa",
                dataIndex: "thoiGianSoHoa",
                render: (_, record) => {
                    return <>
                        <p>- Ngày số hóa: <span style={{fontWeight:500}}>{record.thoiGianSoHoa ? dayjs(record.thoiGianSoHoa).format(FORMAT_DATE_WITHOUT_TIME) : ""}</span></p>
                        <p>- Ngày hết hạn: <span style={{fontWeight:500}}>{record.thoiHanHieuLuc ? dayjs(record.thoiHanHieuLuc).format(FORMAT_DATE_WITHOUT_TIME) : ""}</span></p>
                    </>
                }
            },
            {
                title: "Loại số hóa",
                key: "loaiSoHoa",
                dataIndex: "loaiSoHoa",
                render: (_, record) => {
                    return <>{record.loaiSoHoa ? (GIAYTOSOHOA_LOAISOHOA as any)[record.loaiSoHoa] : ""}</>
                }
            },
            {
                title: "Đính kèm",
                key: "dinhKem",
                dataIndex: "dinhKem",
                render: (_, record) => {
                    return <>
                    {record.dinhKem.split(ID_SEPARATE).map((dinhKem, idx) => 
                       <AntdSpace direction="horizontal" onClick={() => callApiAndDisplayFile(dinhKem)} key={idx}>
                            <LinkOutlined role='button' title={dinhKem.substring(dinhKem.lastIndexOf("/") + 1)}/>
                        </AntdSpace>
                    )}
                    </>
                }
            },
        ]
    }, [])
    return columns
}