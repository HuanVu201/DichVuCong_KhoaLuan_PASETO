import { useMemo } from 'react'
import { IKetQuaThuTuc, ISearchKetQuaThuTuc } from '../models'
import { ColumnsType } from 'antd/es/table'
import { Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../lib/redux/Hooks'
import { IBasePagination } from '../../../models'
import { useThuTucContext } from '@/features/thutuc/contexts/ThuTucContext'
import { useKetQuaThuTucContext } from '../contexts/KetQuaThuTucProvider'
import { ketQuaThuTucService } from '../services'

export const useKetQuaThuTucColumns = (pagination: IBasePagination, setSearchParams: React.Dispatch<React.SetStateAction<ISearchKetQuaThuTuc>> ) => {
    const dispatch = useAppDispatch()
    const ketQuaThuTucContext = useKetQuaThuTucContext()
    const columns = useMemo((): ColumnsType<IKetQuaThuTuc> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
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
                        <EditOutlined style={{ color: "cornflowerblue" }} title="Xem chi tiết/Sửa" onClick={() => {
                            ketQuaThuTucContext.setMaKetQuaThuTuc(record.id)
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