import { IHoSo } from "@/features/hoso/models"
import { AntdTable } from "@/lib/antd/components"
import { useAppDispatch } from "@/lib/redux/Hooks"
import { FormInstance } from "antd"
import { useEffect, useState } from "react"
import {TRANGTHAISOHOA, TRANGTHAISOHOA_VALUE} from '../data/formData'
import { useReadOnlyThanhPhanThuTucColumn } from "@/features/hoso/hooks/useReadOnlyThanhPhanThuTucColumn"
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models"
import { ISearchThanhPhanHoSo, IThanhPhanHoSo } from "@/features/thanhphanhoso/models"
import { IThanhPhanHoSoWithSoHoa } from "./actions/suaHoSo/TepDinhKemHoSo"

export interface IThanhPhanThuTucWithSoHoa extends IThanhPhanThuTuc {
    trangThaiSoHoa: keyof typeof TRANGTHAISOHOA_VALUE;
    maGiayTo?: string;
    fileSoHoa?:string
}

export const ReadOnLyTepDinhKem = ({ form, thanhPhanHoSos}: { form: FormInstance<IHoSo>, thanhPhanHoSos: IThanhPhanHoSo[]| undefined}) => {
    const dispatch = useAppDispatch()
    const [searchParams, setSearchParams] = useState<ISearchThanhPhanHoSo>({ pageNumber: 1, pageSize: 1000, reFetch: true })
    const [dataSource, setDataSource] = useState<IThanhPhanHoSoWithSoHoa[]>([])
    const columns = useReadOnlyThanhPhanThuTucColumn({dataSource})
    
    useEffect(() => {
        form.setFieldValue("thanhPhanHoSos", dataSource) // có thể sẽ chậm
    }, [dataSource])
    
    useEffect(() => {
        if(thanhPhanHoSos){
            setDataSource(thanhPhanHoSos.map(x => ({...x, trangThaiSoHoa: TRANGTHAISOHOA["Chưa số hóa"]})))
        }
        return () => {
            setDataSource([])
        }
    }, [thanhPhanHoSos])
    return <>
    <AntdTable
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        onSearch={() => {}}
    /> 
    </>

}