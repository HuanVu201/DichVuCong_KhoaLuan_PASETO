
import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { CloudUploadOutlined, DeleteOutlined, DownloadOutlined, EyeOutlined, LinkOutlined, LoginOutlined } from '@ant-design/icons'
import { FORMAT_DATE, FORMAT_DATE_WITHOUT_TIME, FORMAT_TIME, HOST_PATH, ID_SEPARATE } from '@/data'
import { IGiayToSoHoa } from '@/features/giaytosohoa/models'
import dayjs from 'dayjs'
import { AntdSpace } from '@/lib/antd/components'
import { callApiAndDisplayFile, getFile, getFileName } from '@/utils'
import { GIAYTOSOHOA_LOAISOHOA } from '@/features/hoso/data/formData'
import { Popconfirm, Typography } from 'antd'
import { useTaiLieuDienTuContext } from '@/features/portaldvc/HoSoCaNhan/context/TaiLieuDienTu/TaiLieuDienTuContext'
import { fileApi } from '@/features/file/services'
import { saveAs } from 'file-saver'
import { DownloadAndSaveFile } from '@/utils/common'
import { useWindowSizeChange } from '@/hooks/useWindowSizeChange'
import { useKhoTaiLieuDienTuContext } from '../contexts'
import { giayToSoHoaApi } from "@/features/giaytosohoa/services"
import { toast } from "react-toastify"
import { KhoTaiLieuDienTuApi } from "../services/KhoTaiLieuDienTuService";
import { IPhienBanGiayToSoHoaKhoTaiLieuDienTu } from '../models/PhienBanGiayToSoHoaKhoTaiLieuDienTuModel'

export const usePhienBanGiayToColumn = () => {
    const { isWindow } = useWindowSizeChange()
    const khoTaiLieuDienTuContext = useKhoTaiLieuDienTuContext()
    const columns = useMemo((): ColumnsType<IPhienBanGiayToSoHoaKhoTaiLieuDienTu> => {
        return [
            {
                title: "STT",
                width: "5%",
                align: "center",
                render: (text, record, index) => index + 1,
            },
            {
                title: "Tên kho tài liệu",
                key: "tenKhoTaiLieu",
                width: "35%",
                dataIndex: "tenKhoTaiLieu",

            },
            {
                title: "Mã hồ sơ",
                key: "maHoSo",
                dataIndex: "maHoSo",
                hidden: !isWindow,
            },
            {
                title: "Mã giấy tờ",
                key: "maGiayTo",
                hidden: !isWindow,
                dataIndex: "maGiayTo",
            },
            {
                title: "Dung lượng",
                key: "dungLuong",
                dataIndex: "dungLuong",
                width: "10%",
                align: 'center',
                render: (_, record) => (
                    <>{record.dungLuong ? record.dungLuong.toFixed(2) : 0} MB</>
                )
            },
            {
                title: "Thời gian tạo",
                key: "createdOn",
                hidden: !isWindow,
                dataIndex: "createdOn",
                render: (_, record) => {
                    return <>
                        {record.createdOn ? dayjs(record.createdOn).format(FORMAT_TIME) : ""}
                    </>
                }
            },
            {
                title: "Thời gian thay đổi",
                key: "lastModifiedOn",
                hidden: !isWindow,
                dataIndex: "lastModifiedOn",
                render: (_, record) => {
                    return <>
                        {record.lastModifiedOn ? dayjs(record.lastModifiedOn).format(FORMAT_TIME) : ""}
                    </>
                }
            },


        ]
    }, [isWindow])
    return columns
}