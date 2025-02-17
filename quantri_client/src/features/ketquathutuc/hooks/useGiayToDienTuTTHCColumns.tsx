import { useMemo } from 'react'
import { IKetQuaThuTuc, ISearchKetQuaThuTuc } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { AppstoreAddOutlined, DeleteOutlined, EditOutlined, FileWordOutlined, PaperClipOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
import { IBasePagination } from '../../../models'
import { useThuTucContext } from '@/features/thutuc/contexts/ThuTucContext'
import { useKetQuaThuTucContext } from '../contexts/KetQuaThuTucProvider'
import { ketQuaThuTucService } from '../services'

export const useGiayToDienTuTTHCColumns = (pagination: IBasePagination, setSearchParams: React.Dispatch<React.SetStateAction<ISearchKetQuaThuTuc>>) => {
    const dispatch = useAppDispatch()
    const ketQuaThuTucContext = useKetQuaThuTucContext()
    const columns = useMemo((): ColumnsType<IKetQuaThuTuc> => {
        return [
            {
                title: "STT",
                key: 'STT',
                width: "5%",
                render: (_, record, idx) => {
                    const pageNumber = pagination.pageNumber ?? 1
                    const pageSize = pagination.pageSize ?? 10
                    return <>{(pageNumber - 1) * pageSize + idx + 1}</>
                },
            },
            {
                title: "Tên kết quả",
                key: "tenKetQua",
                render: (_, record) => {
                    return <>{record.maKetQua} - {record.tenKetQua}</>
                }
            },
            {
                title: "Mã nhận diện OCR",
                key: "maNhanDienOCR",
                dataIndex: "maNhanDienOCR",
            },
            {
                title: "Thao tác",
                dataIndex: '',
                width: "10%",
                align: 'center',
                key: '',
                render: (_, record) => (
                    <Space direction="horizontal">
                        <PaperClipOutlined style={{ color: "cornflowerblue" }} title="Đính kèm phôi" onClick={() => {
                            ketQuaThuTucContext.setMaKetQuaThuTuc(record.id)
                            ketQuaThuTucContext.setDinhKemMauPhoiModalVisible(true)
                        }} />
                        <FileWordOutlined style={{ color: "cornflowerblue" }} title="In biểu mẫu kết quả thủ tục" onClick={() => {
                            ketQuaThuTucContext.setMaKetQuaThuTuc(record.id)
                            ketQuaThuTucContext.setEFormKetQuaTTHCVisible(true)
                        }} />
                        <AppstoreAddOutlined style={{ color: "cornflowerblue" }} title="Thống kê số lượng kết quả biểu mẫu đã trích xuất của thủ tục" onClick={() => {
                            ketQuaThuTucContext.setMaGiayTo(record.maKetQua)
                            ketQuaThuTucContext.setThongKeKetQuaTTHCModalVisible(true)
                        }} />
                        <UnorderedListOutlined title='Tra cứu kết quả giải quyết thủ tục hành chính đã trích xuất của thủ tục' onClick={() => {
                            // console.log(record.id);
                            ketQuaThuTucContext.setMaGiayTo(record.maKetQua)
                            ketQuaThuTucContext.seTraCuuKetQuaTTHCModalVisible(true)
                        }} />
                        <EditOutlined style={{ color: "cornflowerblue" }} title="Xem chi tiết/Sửa" onClick={() => {
                            ketQuaThuTucContext.setMaKetQuaThuTuc(record.id)
                            ketQuaThuTucContext.setEFormVisible(true)
                            ketQuaThuTucContext.setKetQuaThuTucModalVisible(true)
                        }} />
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={async () => {
                                await ketQuaThuTucService.Delete(record.id)
                                setSearchParams(cur => ({ ...cur, maTTHC: record.maTTHC }))
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
    }, [pagination])
    return { columns }
}