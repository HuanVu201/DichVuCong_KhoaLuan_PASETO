import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { getLoaiThoiGianLamViec } from '@/features/truonghopthutuc/data'
import { ITruongHopThuTuc } from '@/features/truonghopthutuc/models'
import { AntdButton } from '@/lib/antd/components'
import { CheckOutlined } from '@ant-design/icons'

export const useThayDoiTruongHopThuTucColumn = ({onThayDoiTruongHopThuTuc, maTruongHopHienTai, loading}: {onThayDoiTruongHopThuTuc: (truongHopThuTucId: string) => void, maTruongHopHienTai: string | undefined, loading?: boolean}) => {
    const columns = useMemo(() : ColumnsType<ITruongHopThuTuc> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Tên trường hợp",
                key: "ten",
                dataIndex: "ten",
            },
            {
                title: "Thời gian thực hiện",
                key: "thoiGianThucHien",
                dataIndex: "thoiGianThucHien",
            },
            {
                title: "Loại thời gian thực hiện",
                key: "loaiThoiGianThucHien",
                render: (_,record) => {
                    return <div>{record.loaiThoiGianThucHien}</div>
                }
            },
            {
                title: "Thao tác",
                dataIndex: '',
                width: "10%",
                align: 'center',
                key: '',
                render: (_, record) => {
                    const disabled = maTruongHopHienTai === record.ma
                    return <AntdButton icon={<CheckOutlined />} loading={disabled ? false : loading} disabled={disabled} onClick={() => disabled ? null : onThayDoiTruongHopThuTuc(record.id)}>Thay đổi</AntdButton>
                }
            }
        ]
    }, [maTruongHopHienTai, loading])
    return columns
}