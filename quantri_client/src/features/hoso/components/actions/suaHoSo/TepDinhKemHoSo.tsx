import { IHoSo } from "@/features/hoso/models"
import { AntdButton, AntdTable } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { PlusCircleOutlined } from "@ant-design/icons"
import { FormInstance } from "antd"
import { useEffect, useState } from "react"
import {v4 as uuid} from 'uuid'
import { useTiepNhanHoSoContext } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext"
import {TRANGTHAISOHOA, TRANGTHAISOHOA_VALUE} from '../../../data/formData'
import { ISearchThanhPhanHoSo, IThanhPhanHoSo } from "@/features/thanhphanhoso/models"
import { DanhSachGiayToSoHoaModal } from "../themMoiHoSo/DanhSachGiayToSoHoaModal"
import { GiayToSoHoaModal } from "../themMoiHoSo/GiayToSoHoaModal"
import { useThanhPhanHoSoColumn } from "@/features/hoso/hooks/useThanhPhanHoSoColumn"
import { SearchThanhPhanHoSo } from "@/features/thanhphanhoso/redux/action"
import { thanhPhanHoSoApi } from "@/features/thanhphanhoso/services"

export interface IThanhPhanHoSoWithSoHoa extends IThanhPhanHoSo {
    trangThaiSoHoa: keyof typeof TRANGTHAISOHOA_VALUE;
    fileSoHoa?: string
}

export const TepDinhKemSuaHoSo = ({ form}: { form: FormInstance<IHoSo>}) => {
    const dispatch = useAppDispatch()
    const [searchParams, setSearchParams] = useState<ISearchThanhPhanHoSo>({ pageNumber: 1, pageSize: 50, reFetch: true })
    const [dataSource, setDataSource] = useState<IThanhPhanHoSoWithSoHoa[]>([])
    const columns = useThanhPhanHoSoColumn({dataSource, setDataSource, form, pagination: {pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize}})
    const tiepNhanHoSoContext = useTiepNhanHoSoContext()
    const { data: hoSo } = useAppSelector(state => state.hoso)
    // const { datas: thanhPhanHoSos, count} = useAppSelector(state => state.thanhphanhoso)
    const [newCount, setNewCount] = useState<number>()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        form.setFieldValue("thanhPhanHoSos", dataSource) // có thể sẽ chậm
    }, [dataSource])
    useEffect(() => {
        (async () => {
            if (hoSo) {
                setLoading(true)
                const res = await thanhPhanHoSoApi.Search({...searchParams, pageSize:200, hoSo : hoSo.maHoSo})
                setLoading(false)
                // dispatch(SearchThanhPhanHoSo(params))
                setDataSource(res.data.data.map(x => ({...x, trangThaiSoHoa: x.trangThaiSoHoa} as any)))
                setNewCount(res.data.totalCount)
            }
        })()
    }, [hoSo])
    // useEffect(() => {
    //     if (hoSo) {
    //       setSearchParams((curr) => ({...curr, hoSo : hoSo.maHoSo}))
    //     }
    //   }, [hoSo])

    // useEffect(() => {
    //     if(thanhPhanHoSos){
    //         setDataSource(thanhPhanHoSos.map(x => ({...x, trangThaiSoHoa: TRANGTHAISOHOA["Chưa số hóa"]})))
    //     }
    //     return () => {
    //         setDataSource([])
    //     }
    // }, [thanhPhanHoSos])

    const onAddRow = () => {
        const newRow : any = {
            id: uuid(),
            batBuoc: false,
            ten: "",
            soBanChinh: 0,
            soBanSao: 0,
            nhanBanGiay: false,
            trangThaiSoHoa: TRANGTHAISOHOA["Chưa số hóa"],
            dinhKem: "",
            hoSo: hoSo?.maHoSo
        }
        const newDataSource = [...dataSource, newRow]
        setNewCount(newDataSource.length)
        setDataSource(newDataSource)
    }

    return <>
     <AntdTable
        columns={columns}
        loading={loading}
        dataSource={dataSource}
        footer={() => <AntdButton icon={<PlusCircleOutlined/>} type="primary" onClick={onAddRow}>Thêm thành phần</AntdButton>}
        pagination={{total:newCount, }}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        onSearch={(params) => {}}
    />
    {tiepNhanHoSoContext.danhSachGiayToSoHoaModalVisible ?<DanhSachGiayToSoHoaModal form={form}/> : null}
    {tiepNhanHoSoContext.giayToSoHoaVisible ?<GiayToSoHoaModal /> : null}
    </>

}