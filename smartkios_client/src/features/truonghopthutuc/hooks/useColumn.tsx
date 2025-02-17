import { useMemo } from 'react'
import { ISearchTruongHopThuTuc, ITruongHopThuTuc } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Space } from 'antd'
import { DeleteOutlined, EditOutlined, FileDoneOutlined, NodeIndexOutlined, CopyOutlined, CameraOutlined, FilePdfOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
import { IBasePagination } from '../../../models'
import { useTruongHopThuTucContext } from '../contexts/TruongHopThuTucContext'
import { useThuTucContext } from '@/features/thutuc/contexts/ThuTucContext'

export const useColumn = (pagination: IBasePagination, setSearchParams: React.Dispatch<React.SetStateAction<ISearchTruongHopThuTuc>>) => {
    const dispatch = useAppDispatch()
    const truongHopThuTucContext = useTruongHopThuTucContext()
    const thuTucContext = useThuTucContext()
    const columns = useMemo((): ColumnsType<ITruongHopThuTuc> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Mã trường hợp",
                key: "ma",
                dataIndex: "ma",
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
                align: 'center',
                render: (text, record) => {

                    return (
                        <div>
                            <div>{text / 8} Ngày ( {text} Giờ ) </div>
                        </div>
                    )
                }
            },
            {
                title: "Loại thời gian thực hiện",
                key: "loaiThoiGianThucHien",
                render: (_, record) => {
                    return <div>{record.loaiThoiGianThucHien}</div>
                },
                align: 'center'
            },
            {
                title: "Yêu cầu nộp phí trực tuyến",
                key: "yeuCauNopPhiTrucTuyen",
                dataIndex: "yeuCauNopPhiTrucTuyen",
                align: 'center',
                render: (text) => text == true ? <CheckCircleOutlined style={{ color: 'green' }}></CheckCircleOutlined> : <CloseCircleOutlined style={{ color: 'red' }}></CloseCircleOutlined>


            },
            {
                title: "Thao tác",
                dataIndex: '',
                width: "10%",
                align: 'center',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <EditOutlined style={{ color: "cornflowerblue" }} title="Xem chi tiết/Sửa" onClick={() => {
                            truongHopThuTucContext.setTruongHopThuTucId(record.id)
                            truongHopThuTucContext.setTruongHopThuTucModalVisible(true)
                        }} />
                        <FileDoneOutlined title='Cập nhật EForm' onClick={() => {
                            truongHopThuTucContext.setTruongHopThuTucId(record.id)
                            truongHopThuTucContext.setEFormModalVisible(true)
                        }} />
                        <FilePdfOutlined title='Cập nhật EForm Kết quả' onClick={() => {
                            truongHopThuTucContext.setTruongHopThuTucId(record.id)
                            truongHopThuTucContext.setEFormModalKetQuaVisible(true)
                        }} />
                        <NodeIndexOutlined title='Chỉnh sửa quy trình' onClick={() => {
                            truongHopThuTucContext.setTruongHopThuTucId(record.id)
                            truongHopThuTucContext.setFlowModalVisible(true)
                        }} />
                        <CopyOutlined title='Sao chép trường hợp thủ tục' style={{ color: "#026e39" }}
                            onClick={() => {
                                truongHopThuTucContext.setTruongHopThuTucId(record.id)
                                truongHopThuTucContext.setMaTHTTVisible(record.ma)
                                truongHopThuTucContext.setConfirmCopyTHTTVisible(true)
                            }} />
                        <CameraOutlined title='Sao chép quy trình từ thủ tục khác' style={{ color: "#175fa7" }}
                            onClick={() => {
                                truongHopThuTucContext.setTruongHopThuTucId(record.id)
                                truongHopThuTucContext.setConfirmCopyTPTTVisible(true)
                            }} />
                        <DeleteOutlined title='Xóa trường hợp thủ tục' style={{ color: "tomato" }}
                            onClick={() => {

                                truongHopThuTucContext.setTruongHopThuTucId(record.id)
                                truongHopThuTucContext.setMaTHTTVisible(record.ma)
                                truongHopThuTucContext.setConfirmDeleteTHTTVisible(true)
                            }} />

                    </Space>
                )
            }
        ]
    }, [pagination])
    return columns
}