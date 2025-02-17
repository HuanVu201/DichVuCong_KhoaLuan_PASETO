import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { IBasePagination } from '../../../models'
import { useButtonActionContext } from '../contexts/ButtonActionsContext'
import { IYeuCauThanhToan } from '@/features/yeucauthanhtoan/models'
import { getCurrency } from '@/utils'


export const useYeuCauThanhToanColumn = (pagination: IBasePagination) => {
    const columns = useMemo((): ColumnsType<IYeuCauThanhToan> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Phí",
                key: "phi",
                dataIndex: "phi",
                render:(_, record) => {
                    return <>{getCurrency(record.phi)}</>
                }
            },
            {
                title: "Lệ phí",
                key: "lePhi",
                dataIndex: "lePhi",
                render:(_, record) => {
                    return <>{getCurrency(record.lePhi)}</>
                }
            },
            {
                title: "Số tiền",
                key: "soTien",
                dataIndex: "soTien",
                render:(_, record) => {
                    return <>{getCurrency(record.soTien)}</>
                }
            },
            {
                title: "Hình thức thu",
                key: "hinhThucThu",
                dataIndex: "hinhThucThu",
            },
            {
                title: "Trạng thái",
                key: "trangThai",
                dataIndex: "trangThai",
            },
            // {
            //     title: "Thao tác",
            //     dataIndex: '',
            //     width: "10%",
            //     align: 'center',
            //     key: '',
            //     render: (_, record) => {
            //         return <Space direction="horizontal">
            //             <Dropdown menu={{ items }} trigger={['click']}>
            //                 <a onClick={(e) => {
            //                     e.preventDefault()
            //                     buttonActionContext.setSelectedHoSos([record.id])
            //                 }}>
            //                     <Space>
            //                         Chức năng
            //                         <DownOutlined />
            //                     </Space>
            //                 </a>
            //             </Dropdown>
            //         </Space>
            //     }
            // }
        ]
    }, [pagination])
    return columns
}