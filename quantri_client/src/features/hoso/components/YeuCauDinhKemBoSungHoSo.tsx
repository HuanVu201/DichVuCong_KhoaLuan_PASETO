import { IHoSo } from "@/features/hoso/models"
import { AntdButton, AntdTable } from "@/lib/antd/components"
import { useAppDispatch } from "@/lib/redux/Hooks"
import { FormInstance } from "antd"
import { useEffect, useState } from "react"
import { useYeuCauDinhKemBoSungHoSoColumn } from "../hooks/useYeuCauDinhKemBoSungHoSoColumn"
import { ISearchThanhPhanHoSo, IThanhPhanHoSo } from "@/features/thanhphanhoso/models"
import { ThanhPhanBoSungHoSo } from "./actions/yeuCauMotCuaBoSung/YeuCauMotCuaBoSungModal"
import { PlusCircleOutlined } from "@ant-design/icons"
import {v4 as uuid} from 'uuid'
import { TRANGTHAISOHOA } from "../data/formData"


export const YeuCauDinhKemBoSungHoSo = ({ form, thanhPhanHoSos}: 
    { form: FormInstance<IHoSo>, thanhPhanHoSos: IThanhPhanHoSo[]| undefined}) => {
    const dispatch = useAppDispatch()
    const [searchParams, setSearchParams] = useState<ISearchThanhPhanHoSo>({ pageNumber: 1, pageSize: 1000, reFetch: true })
    const [dataSource, setDataSource] = useState<ThanhPhanBoSungHoSo[]>([])
    const columns = useYeuCauDinhKemBoSungHoSoColumn({dataSource, setDataSource})
    
    useEffect(() => {
        form.setFieldValue("thanhPhanBoSung", dataSource) // có thể sẽ chậm
    }, [dataSource])

    useEffect(() => {
        if(thanhPhanHoSos != undefined){
            setDataSource(thanhPhanHoSos.map(x => ({tenThanhPhan: x.ten, fileDinhKem: x.dinhKem, noiDungBoSung: "", thanhPhanHoSoId: x.id, laThanhPhanMoi: false})))
        }
        return () => {
            setDataSource([])
        }
    }, [thanhPhanHoSos])


    const onAddRow = () => {
        const newRow : any = {
            thanhPhanHoSoId: uuid(),
            tenThanhPhan: "", 
            fileDinhKem: null, 
            noiDungBoSung: "",
            laThanhPhanMoi: true
        }
        setDataSource((curr) => ([...curr, newRow]))
    }

    return <>
    <AntdTable
        columns={columns as any}
        dataSource={dataSource as any}
        footer={() => <AntdButton icon={<PlusCircleOutlined/>} type="primary" onClick={onAddRow}>Thêm thành phần</AntdButton>}
        pagination={false}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        onSearch={() => {}}
    /> 
    </>

}