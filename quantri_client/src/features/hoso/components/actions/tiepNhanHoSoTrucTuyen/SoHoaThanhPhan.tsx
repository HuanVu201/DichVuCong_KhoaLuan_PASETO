import { IHoSo } from "@/features/hoso/models"
import { ISearchThanhPhanHoSo, IThanhPhanHoSo } from "@/features/thanhphanhoso/models"
import { AntdTable } from "@/lib/antd/components"
import { Form, FormInstance, Input } from "antd"
import { useEffect, useState } from "react"
import { IThanhPhanThuTucWithSoHoa } from "../themMoiHoSo/TepDinhKem"
import { TRANGTHAISOHOA, TRANGTHAISOHOA_VALUE } from "@/features/hoso/data/formData"
import { useTiepNhanHoSoTrucTuyenColumn } from "@/features/hoso/hooks/useTiepNhanHoSoTrucTuyenColumn"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { SearchThanhPhanHoSo } from "@/features/thanhphanhoso/redux/action"
import { thanhPhanHoSoApi } from "@/features/thanhphanhoso/services"

export interface IThanhPhanHoSoWithSoHoa extends IThanhPhanHoSo {
    fileSoHoa?: string;
}

export const SoHoaThanhPhan = ({form}: {form: FormInstance<IHoSo>}) => {
    const [dataSource, setDataSource] = useState<IThanhPhanHoSoWithSoHoa[]>([])
    const [searchParams, setSearchParams] = useState<ISearchThanhPhanHoSo>({ pageNumber: 1, pageSize: 10, reFetch: true })
    const columns = useTiepNhanHoSoTrucTuyenColumn({dataSource, setDataSource, form})
    const [newCount, setNewCount] = useState<number>()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        form.setFieldValue("thanhPhanHoSos", dataSource) // có thể sẽ chậm
    }, [dataSource])
    const { data: hoSo } = useAppSelector((state) => state.hoso)
  
    useEffect(() => {
        (async () => {
            if (hoSo) {
                setLoading(true)
                const res = await thanhPhanHoSoApi.Search({...searchParams, pageSize:200, hoSo : hoSo.maHoSo})
                setLoading(false)
                // dispatch(SearchThanhPhanHoSo(params))
                setDataSource(res.data.data.map(x => ({...x})))
                setNewCount(res.data.totalCount)
            }
        })()
    }, [hoSo])
    
    return (
        <>
        <Form.Item name={"thanhPhanHoSos"} hidden><Input/></Form.Item>
        <AntdTable
        columns={columns}
        loading={loading}
        dataSource={dataSource}
        pagination={{total: newCount}}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        onSearch={(params) => {}}/>
        </>
    )
}