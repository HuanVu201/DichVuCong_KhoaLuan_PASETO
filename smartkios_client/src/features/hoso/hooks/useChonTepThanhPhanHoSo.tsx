import { useCallback, useMemo, useTransition } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Checkbox, Input, InputNumber, Popconfirm, Space, Tag } from 'antd'
import { ImportOutlined, MinusCircleOutlined, UploadOutlined } from '@ant-design/icons'
import { AntdButton, UploadTable } from '@/lib/antd/components'
import { FormInstance } from 'antd/lib'
import { IHoSo } from '@/features/hoso/models'
import { toast } from 'react-toastify'
import { ITiepNhanHoSoContext, useTiepNhanHoSoContext } from '../../../pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext'
import { TRANGTHAISOHOA, TRANGTHAISOHOA_VALUE } from '../data/formData'
import { IThanhPhanHoSoWithSoHoa } from '../components/actions/suaHoSo/TepDinhKemHoSo'
import { IThanhPhanHoSo } from '@/features/thanhphanhoso/models'
import { useUploadTable } from '@/lib/antd/components/upload/hooks/useUploadTable'
import { ITiepNhanHoSoTrucTuyenContext } from '@/pages/dvc/tiepnhanhoso/tructuyen/contexts/TiepNhanHoSoContext'
import { validateDigitalSignatureFiles } from '../components/ultis/validate'
import { TrangThaiSoHoaTag } from '@/components/common'
import { useAppSelector } from '@/lib/redux/Hooks'

const FOLDER_NAME = "ThanhPhanHoSo"

export const useChonTepThanhPhanHoSoColumn = ({dataSource}: {dataSource?: IThanhPhanHoSo[]}) => {

    const columns = useMemo(() : ColumnsType<IThanhPhanHoSo> => {
        return [
            {
                title: "Tên giấy tờ",
                key: "ten",
                dataIndex: "ten",
                render: (_, record, idx) => {
                    return <Input.TextArea rows={2} defaultValue={record.ten} title={record.ten}/>
                }
            },
            {
                title: "Đính kèm",
                key: "dinhKem",
                render: (_, record, idx) => {
                    let hideKySoWith = undefined
                    if (record.trangThaiSoHoa == TRANGTHAISOHOA["Tái sử dụng từ kết quả hồ sơ khác"] || record.trangThaiSoHoa == TRANGTHAISOHOA["Tái sử dụng"]) {
                        hideKySoWith = <TrangThaiSoHoaTag trangThai={record.trangThaiSoHoa} />
                    }
                    if (!record.dinhKem) {
                        hideKySoWith = undefined
                    }
                    return <>
                        <UploadTable 
                            dataSource={dataSource} 
                            setDataSource={() => {}} 
                            folderName={""}
                            colDinhKemName={"dinhKem"}
                            rowNumber={idx}
                            dinhKem={record.dinhKem}
                            hideUpload
                        />
                    </>
                }
            },
        ]
    }, [])
    return {columns}
}