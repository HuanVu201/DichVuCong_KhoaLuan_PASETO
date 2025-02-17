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
import { useAdminThanhPhanHoSoColumn } from "./useAdminThanhPhanHoSoColumn"

export interface IThanhPhanHoSoWithSoHoa extends IThanhPhanHoSo {
    trangThaiSoHoa: keyof typeof TRANGTHAISOHOA_VALUE;
    fileSoHoa?: string
}

export const AdminTepDinhKem = ({ form}: { form: FormInstance<IHoSo>}) => {
    const dispatch = useAppDispatch()
    const [searchParams, setSearchParams] = useState<ISearchThanhPhanHoSo>({ pageNumber: 1, pageSize: 50, reFetch: true })
    const [dataSource, setDataSource] = useState<IThanhPhanHoSoWithSoHoa[]>([])
    const columns = useAdminThanhPhanHoSoColumn({dataSource, setDataSource, form})
    const { data: hoSo } = useAppSelector(state => state.adminHoSo)
    const { datas: thanhPhanHoSos, count } = useAppSelector(state => state.thanhphanhoso)
    
    useEffect(() => {
        form.setFieldValue("thanhPhanHoSos", dataSource) // có thể sẽ chậm
    }, [dataSource])
    
    useEffect(() => {
        if (hoSo) {
          setSearchParams((curr) => ({...curr, hoSo : hoSo.maHoSo}))
        }
      }, [hoSo])

    useEffect(() => {
        if(thanhPhanHoSos){
            setDataSource(thanhPhanHoSos.map(x => ({...x, trangThaiSoHoa: TRANGTHAISOHOA["Chưa số hóa"]})))
        }
        return () => {
            setDataSource([])
        }
    }, [thanhPhanHoSos])

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
    {searchParams.hoSo ? <AntdTable
        columns={columns}
        dataSource={dataSource}
        footer={() => <AntdButton icon={<PlusCircleOutlined/>} type="primary" onClick={onAddRow}>Thêm thành phần</AntdButton>}
        pagination={{total:count, }}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        onSearch={(params) => dispatch(SearchThanhPhanHoSo(params))}
    /> : null}

    </>

}