import { RenderTitle } from "@/components/common"
import { ISearchThanhPhanHoSo, IThanhPhanHoSo } from "@/features/thanhphanhoso/models"
import { AntdModal, AntdTable } from "@/lib/antd/components"
import { useAppSelector } from "@/lib/redux/Hooks"
import { Form } from "antd"
import { useEffect, useState } from "react"
import { useThanhPhanChungThuc } from "./hooks/useThanhPhanChungThuc"
import { FormInstance } from "antd/lib"


export const ThanhPhanChungThuc = ({form, thanhPhanHoSos}: {form: FormInstance<any>; thanhPhanHoSos: IThanhPhanHoSo[] | undefined}) => {
    const [searchParams, setSearchParams] = useState<ISearchThanhPhanHoSo>({})
    const [dataSource, setDataSource] = useState<IThanhPhanHoSo[]>([]);
    useEffect(() => {
        if(thanhPhanHoSos?.length){
            setDataSource(thanhPhanHoSos.map(x => ({...x, trangThaiDuyet: "Chưa ký"})))
        }
    }, [thanhPhanHoSos])
    useEffect(() => {
        form.setFieldValue("thanhPhanHoSos", dataSource) // có thể sẽ chậm
    }, [dataSource])
    
    const {columns} = useThanhPhanChungThuc({dataSource, setDataSource, form})



    return <div style={{width: "100%"}}>
        <RenderTitle title="Thành phần chứng thực"/>
        <AntdTable 
            columns={columns}
            dataSource={dataSource}
            pagination={{
                total: dataSource.length
            }}
            setSearchParams={setSearchParams}
            searchParams={searchParams}
            onSearch={() => {}}
        />
    </div>
}