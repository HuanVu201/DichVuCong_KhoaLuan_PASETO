import { IHoSo } from "@/features/hoso/models"
import { ISearchThanhPhanThuTuc, IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models"
import {  useThanhPhanThuTucColumn } from "@/features/hoso/hooks/useThanhPhanThuTucColumn"
import { AntdButton, AntdTable } from "@/lib/antd/components"
import { useAppDispatch } from "@/lib/redux/Hooks"
import { PlusCircleOutlined } from "@ant-design/icons"
import { FormInstance } from "antd"
import { useEffect, useState } from "react"
import {v4 as uuid} from 'uuid'
import { DanhSachGiayToSoHoaModal } from "./DanhSachGiayToSoHoaModal"
import { useTiepNhanHoSoContext } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext"
import { GiayToSoHoaModal } from "./GiayToSoHoaModal"
import {TRANGTHAISOHOA, TRANGTHAISOHOA_VALUE} from '../../../data/formData'

export interface IThanhPhanThuTucWithSoHoa extends IThanhPhanThuTuc {
    trangThaiSoHoa: keyof typeof TRANGTHAISOHOA_VALUE;
    maGiayTo?: string;
    maGiayToSoHoa?: string;
    fileSoHoa?: string;
}

export const TepDinhKem = ({ form, thanhPhanThuTucs}: { form: FormInstance<IHoSo>, thanhPhanThuTucs: IThanhPhanThuTuc[]| undefined}) => {
    const dispatch = useAppDispatch()
    const [searchParams, setSearchParams] = useState<ISearchThanhPhanThuTuc>({ pageNumber: 1, pageSize: 1000, reFetch: true })
    const [dataSource, setDataSource] = useState<IThanhPhanThuTucWithSoHoa[]>([])
    const columns = useThanhPhanThuTucColumn({dataSource, setDataSource, form})
    const tiepNhanHoSoContext = useTiepNhanHoSoContext()
    
    useEffect(() => {
        form.setFieldValue("thanhPhanHoSos", dataSource) // có thể sẽ chậm
    }, [dataSource])
    
    useEffect(() => {
        if(thanhPhanThuTucs){
            setDataSource(thanhPhanThuTucs.map(x => ({...x, trangThaiSoHoa: TRANGTHAISOHOA["Chưa số hóa"], maGiayToKhoQuocGia: undefined, maGiayTo: x.ma, maGiayToSoHoa: undefined})))
        }
        return () => {
            setDataSource([])
        }
    }, [thanhPhanThuTucs])

    const onAddRow = () => {
        const newRow : any = {
            id: uuid(),
            batBuoc: false,
            ten: "",
            soBanChinh: 0,
            soBanSao: 0,
            nhanBanGiay: false,
            trangThaiSoHoa: TRANGTHAISOHOA["Chưa số hóa"],
            dinhKem: ""
        }
        setDataSource([...dataSource, newRow])
    }

    return <>
    <AntdTable
        columns={columns}
        dataSource={dataSource}
        footer={() => <AntdButton icon={<PlusCircleOutlined/>} type="primary" onClick={onAddRow}>Thêm thành phần</AntdButton>}
        pagination={false}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        onSearch={() => {}}
    /> 
    {tiepNhanHoSoContext.danhSachGiayToSoHoaModalVisible ?<DanhSachGiayToSoHoaModal form={form}/> : null}
    {tiepNhanHoSoContext.giayToSoHoaVisible ?<GiayToSoHoaModal themMoiForm={form}/> : null}
    </>

}