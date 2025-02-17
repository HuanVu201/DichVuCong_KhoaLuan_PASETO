import { IHoSo } from "@/features/hoso/models"
import { AntdButton, AntdTable } from "@/lib/antd/components"
import { useAppDispatch } from "@/lib/redux/Hooks"
import { FormInstance } from "antd"
import { useEffect, useState } from "react"
import { useDinhKemBoSungHoSoColumn } from "../hooks/useDinhKemBoSungHoSoColumn"
import { ISearchThanhPhanHoSo, IThanhPhanHoSo } from "@/features/thanhphanhoso/models"
import { ThanhPhanBoSungHoSo } from "./actions/yeuCauMotCuaBoSung/YeuCauMotCuaBoSungModal"
import { PlusCircleOutlined } from "@ant-design/icons"
import {v4 as uuid} from 'uuid'

export type DanhSachDinhKemBoSung = {
    thanhPhanHoSoId :string;
    fileDinhKemCu :string;
    fileDinhKemMoi :string;
    laThanhPhanMoi :boolean;
    noiDungBoSung :string;
    tenThanhPhan :string;
}

export const DinhKemBoSungHoSo = ({ form, thanhPhanHoSos, maHoSo}: {maHoSo: string | undefined; form: FormInstance<any>, thanhPhanHoSos: IThanhPhanHoSo[]| undefined}) => {
    const [searchParams, setSearchParams] = useState<ISearchThanhPhanHoSo>({ pageNumber: 1, pageSize: 1000, reFetch: true })
    const [dataSource, setDataSource] = useState<DanhSachDinhKemBoSung[]>([])
    const columns = useDinhKemBoSungHoSoColumn({dataSource, setDataSource, maHoSo})
    
    useEffect(() => {
        form.setFieldValue("danhSachGiayToBoSung", dataSource) // có thể sẽ chậm
    }, [dataSource])

    useEffect(() => {
        if(thanhPhanHoSos != undefined){
            setDataSource(thanhPhanHoSos.map(x => ({tenThanhPhan: x.ten, fileDinhKemCu: x.dinhKem, fileDinhKemMoi: "", thanhPhanHoSoId: x.id, noiDungBoSung: x.noiDungBoSung, laThanhPhanMoi: false})))
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
        key={"thanhPhanHoSoId"}
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