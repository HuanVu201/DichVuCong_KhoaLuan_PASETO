import { IHoSo } from "@/features/hoso/models"
import { AntdTable } from "@/lib/antd/components"
import { useAppDispatch } from "@/lib/redux/Hooks"
import { FormInstance } from "antd"
import { useEffect, useState } from "react"
import { useYeuCauDinhKemBoSungHoSoColumn } from "../hooks/useYeuCauDinhKemBoSungHoSoColumn"
import { ISearchThanhPhanHoSo, IThanhPhanHoSo } from "@/features/thanhphanhoso/models"
import { ThanhPhanBoSungHoSo } from "./actions/yeuCauMotCuaBoSung/YeuCauMotCuaBoSungModal"



export const YeuCauDinhKemBoSungHoSo = ({ form, thanhPhanHoSos}: { form: FormInstance<IHoSo>, thanhPhanHoSos: IThanhPhanHoSo[]| undefined}) => {
    const dispatch = useAppDispatch()
    const [searchParams, setSearchParams] = useState<ISearchThanhPhanHoSo>({ pageNumber: 1, pageSize: 1000, reFetch: true })
    const [dataSource, setDataSource] = useState<ThanhPhanBoSungHoSo[]>([])
    const columns = useYeuCauDinhKemBoSungHoSoColumn({dataSource, setDataSource})
    
    useEffect(() => {
        form.setFieldValue("thanhPhanBoSung", dataSource) // có thể sẽ chậm
    }, [dataSource])

    useEffect(() => {
        if(thanhPhanHoSos != undefined){
            setDataSource(thanhPhanHoSos.map(x => ({tenThanhPhan: x.ten, fileDinhKem: x.dinhKem, noiDungBoSung: "", thanhPhanHoSoId: x.id})))
        }
        return () => {
            setDataSource([])
        }
    }, [thanhPhanHoSos])

    return <>
    <AntdTable
        columns={columns as any}
        dataSource={dataSource as any}
        pagination={false}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        onSearch={() => {}}
    /> 
    </>

}