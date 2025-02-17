import { IHoSo } from "@/features/hoso/models"
import { ISearchThanhPhanHoSo, IThanhPhanHoSo } from "@/features/thanhphanhoso/models"
import { AntdTable } from "@/lib/antd/components"
import { Form, FormInstance } from "antd"
import { useEffect, useState } from "react"
import { IThanhPhanThuTucWithSoHoa } from "../themMoiHoSo/TepDinhKem"
import { TRANGTHAISOHOA, TRANGTHAISOHOA_VALUE } from "@/features/hoso/data/formData"
import { useTiepNhanHoSoTrucTuyenColumn } from "@/features/hoso/hooks/useTiepNhanHoSoTrucTuyenColumn"

export interface IThanhPhanHoSoWithSoHoa extends IThanhPhanHoSo {
    fileSoHoa?: string;
}

export const SoHoaThanhPhan = ({form, thanhPhanHoSos}: {form: FormInstance<IHoSo>; thanhPhanHoSos: IThanhPhanHoSo[] | undefined}) => {
    const [dataSource, setDataSource] = useState<IThanhPhanHoSoWithSoHoa[]>([])
    const [searchParams, setSearchParams] = useState<ISearchThanhPhanHoSo>({ pageNumber: 1, pageSize: 1000, reFetch: true })
    const columns = useTiepNhanHoSoTrucTuyenColumn({dataSource, setDataSource, form})
    useEffect(() => {
        form.setFieldValue("thanhPhanHoSos", dataSource) // có thể sẽ chậm
    }, [dataSource])
    useEffect(() => {
        if(thanhPhanHoSos){
            setDataSource(thanhPhanHoSos)
        }
        return () => {
            setDataSource([])
        }
    }, [thanhPhanHoSos])
    return (
        <AntdTable
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        onSearch={() => {}}
    /> 
    )
}