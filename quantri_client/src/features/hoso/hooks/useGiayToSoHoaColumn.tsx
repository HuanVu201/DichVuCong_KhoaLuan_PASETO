
import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { DownloadOutlined, EyeOutlined, LinkOutlined } from '@ant-design/icons'
import { FORMAT_DATE, FORMAT_DATE_WITHOUT_TIME, HOST_PATH, ID_SEPARATE } from '@/data'
import { IGiayToSoHoa } from '@/features/giaytosohoa/models'
import dayjs from 'dayjs'
import { AntdSpace } from '@/lib/antd/components'
import { callApiAndDisplayFile, getFile, getFileName } from '@/utils'
import { GIAYTOSOHOA_LOAISOHOA } from '../data/formData'
import { Typography } from 'antd'
import { useTaiLieuDienTuContext } from '@/features/portaldvc/HoSoCaNhan/context/TaiLieuDienTu/TaiLieuDienTuContext'
import { fileApi } from '@/features/file/services'
import { saveAs } from 'file-saver'
import { DownloadAndSaveFile } from '@/utils/common'
import { useWindowSizeChange } from '@/hooks/useWindowSizeChange'

export const useGiayToSoHoaColumn = ({ setTaiLieuDienTuModalVisible }: { setTaiLieuDienTuModalVisible?: (id: string) => void }) => {
    const {isWindow} = useWindowSizeChange()
    const columns = useMemo((): ColumnsType<IGiayToSoHoa> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Mã/Tên giấy tờ",
                key: "ten",
                width: "45%",
                dataIndex: "ten",
                render: (_, record) => {
                    return <>
                        <strong>{record.ma}</strong>
                        <Typography.Paragraph
                            ellipsis={{ rows: 3, expandable: true, symbol: 'Xem thêm' }}
                        >
                            {record.ten}
                        </Typography.Paragraph>
                    </>
                }
            },
            {
                title: "Người số hóa",
                key: "fullName",
                dataIndex: "fullName",
                hidden: !isWindow,
            },
            {
                title: "Đơn vị",
                key: "groupName",
                hidden: !isWindow,
                dataIndex: "groupName",
            },
            {
                title: "Thời hạn",
                key: "thoiGianSoHoa",
                hidden: !isWindow,
                dataIndex: "thoiGianSoHoa",
                render: (_, record) => {
                    return <>
                        <p>- Ngày số hóa: <span style={{ fontWeight: 500 }}>{record.thoiGianSoHoa ? dayjs(record.thoiGianSoHoa).format(FORMAT_DATE_WITHOUT_TIME) : ""}</span></p>
                        <p>- Ngày hết hạn: <span style={{ fontWeight: 500 }}>{record.thoiHanHieuLuc ? dayjs(record.thoiHanHieuLuc).format(FORMAT_DATE_WITHOUT_TIME) : ""}</span></p>
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
                hidden: !isWindow,
                title: "Đính kèm",
                key: "dinhKem",
                dataIndex: "dinhKem",
                render: (_, record) => {
                    return <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <EyeOutlined style={{ color: "cornflowerblue" }} title="Xem chi tiết/Sửa" onClick={() => {
                            // taiLieuDienTuContext.setMaTaiLieuDienTu(record.id)
                            // taiLieuDienTuContext.setTaiLieuDienTuModalVisible(true)
                            // kMaxLength()

                            setTaiLieuDienTuModalVisible ? setTaiLieuDienTuModalVisible(record.id) : undefined
                        }} />
                        {record.dinhKem?.split(ID_SEPARATE).map((dinhKem, idx) =>
                            <AntdSpace direction="horizontal" onClick={() => callApiAndDisplayFile(dinhKem)} key={idx}>
                                <LinkOutlined style={{ color: "yellowgreen" }} role='button' title={dinhKem.substring(dinhKem.lastIndexOf("/") + 1)} />
                            </AntdSpace>
                        )}
                        {record.dinhKem?.split(ID_SEPARATE).map((dinhKem, idx) =>
                            <AntdSpace direction="horizontal" key={idx}>
                                <DownloadOutlined style={{ color: "darkorchid" }} title="Tải về" onClick={async () => {
                                    await DownloadAndSaveFile(dinhKem)
                                }} />
                            </AntdSpace>
                        )}

                    </div>
                }
            },
        ]
    }, [isWindow])
    return columns
}