import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { getLoaiThoiGianLamViec } from '@/features/truonghopthutuc/data'
import { ITruongHopThuTuc } from '@/features/truonghopthutuc/models'
import { DEFAULT_HOUR_PER_DAY } from '@/data'

export const useTruongHopThuTucColumn = () => {
    const columns = useMemo(() : ColumnsType<ITruongHopThuTuc> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            // {
            //     title: "Mã trường hợp",
            //     key: "ma",
            //     dataIndex: "ma",
            // },
            {
                title: "Tên trường hợp",
                key: "ten",
                dataIndex: "ten",
            },
            {
                title: "Thời gian thực hiện",
                key: "thoiGianThucHien",
                // dataIndex: "thoiGianThucHien",
                render: (_,record) => {
                    return <div>{Math.round(record.thoiGianThucHien / DEFAULT_HOUR_PER_DAY) + ` (${record.loaiThoiGianThucHien})`}</div>
                }
            },
            // {
            //     title: "Loại thời gian thực hiện",
            //     key: "loaiThoiGianThucHien",
            //     render: (_,record) => {
            //         return <div>{record.loaiThoiGianThucHien}</div>
            //     }
            // },
            // {
            //     title: "Yêu cầu nộp phí trực tuyến",
            //     key: "yeuCauNopPhiTrucTuyen",
            //     dataIndex: "yeuCauNopPhiTrucTuyen",
            // },
        ]
    }, [])
    return columns
}