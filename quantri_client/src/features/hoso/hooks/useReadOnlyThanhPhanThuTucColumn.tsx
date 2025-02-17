import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { FormInstance, Upload, UploadFile } from 'antd/lib'
import { IHoSo } from '@/features/hoso/models'
import { HOST_PATH, ID_SEPARATE } from '@/data'
import { IThanhPhanHoSoWithSoHoa } from '../components/actions/suaHoSo/TepDinhKemHoSo'
import { UploadTable } from '@/lib/antd/components'
import { useAppSelector } from '@/lib/redux/Hooks'

export const useReadOnlyThanhPhanThuTucColumn = ({ dataSource, setDataSource }: { dataSource: IThanhPhanHoSoWithSoHoa[]; setDataSource: React.Dispatch<React.SetStateAction<IThanhPhanHoSoWithSoHoa[]>> }) => {
    const { data: hoSo } = useAppSelector(state => state.hoso)
    const columns = useMemo((): ColumnsType<IThanhPhanHoSoWithSoHoa> => {
        return [
            {
                title: "Tên giấy tờ",
                key: "ten",
                dataIndex: "ten",
                width: "40%",
            },
            {
                title: "Số bản chính",
                key: "soBanChinh",
                dataIndex: "soBanChinh",
            },
            {
                title: "Số bản sao",
                key: "soBanSao",
                dataIndex: "soBanSao",
            },
            {
                title: "Đính kèm",
                key: "dinhKem",
                render: (_, record, idx) => {
                    return hoSo ? <UploadTable setDataSource={setDataSource} hideUpload={true} dinhKem={record.dinhKem} folderName={hoSo.maHoSo} colDinhKemName={"dinhKem"} rowNumber={idx}  /> : null
                }
            },
        ]
    }, [dataSource, hoSo])
    return columns
}