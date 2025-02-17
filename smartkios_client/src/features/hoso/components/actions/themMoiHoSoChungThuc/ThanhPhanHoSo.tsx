import { IHoSo } from "@/features/hoso/models"
import { ISearchThanhPhanThuTuc, IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models"
import {  useThanhPhanThuTucColumn } from "@/features/hoso/hooks/useThanhPhanThuTucColumn"
import { AntdButton, AntdTable } from "@/lib/antd/components"
import { useAppDispatch } from "@/lib/redux/Hooks"
import { PlusCircleOutlined } from "@ant-design/icons"
import { FormInstance } from "antd"
import { useEffect, useState } from "react"
import {v4 as uuid} from 'uuid'
// import { DanhSachGiayToSoHoaModal } from "./DanhSachGiayToSoHoaModal"
import { useTiepNhanHoSoContext } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext"
// import { GiayToSoHoaModal } from "./GiayToSoHoaModal"
import {TRANGTHAISOHOA, TRANGTHAISOHOA_VALUE} from '../../../data/formData'
import { IKetQuaThuTuc, ISearchKetQuaThuTuc } from "@/features/ketquathutuc/models"
import { IThanhPhanHoSo } from "@/features/thanhphanhoso/models"
import { useThanhPhanHoSos } from "./hooks/useThanhPhanHoSos"
import { RenderTitle } from "@/components/common"
import { IDanhMucGiayToChungThuc } from "@/features/danhmucgiaytochungthuc/models"
import { SearchDanhMucGiayToChungThuc } from "@/features/danhmucgiaytochungthuc/redux/action"
import { DanhMucGiayToChungThucApi } from "@/features/danhmucgiaytochungthuc/services"

export type KetQuaThuTucChungThuc = Pick<IThanhPhanHoSo, "soTrang" | "soBanGiay" | "kyDienTuBanGiay" | "dinhKem" | "id"| "ten" | "ma" | "trangThaiDuyet">

export const ThanhPhanChungThucHoSo = ({ form}: { form: FormInstance<IHoSo>}) => {
    const [searchParams, setSearchParams] = useState<ISearchKetQuaThuTuc>({ pageNumber: 1, pageSize: 100, laGiayToThongDung: true })
    const [dataSource, setDataSource] = useState<KetQuaThuTucChungThuc[]>([])
    const [danhMucGiayToChungThucs, setDanhMucGiayToChungThucs] = useState<IDanhMucGiayToChungThuc[]>()
    const {columns} = useThanhPhanHoSos({dataSource, setDataSource, form, danhMucGiayToChungThucs})
    const dispatch = useAppDispatch()


    useEffect(() => {
        form.setFieldValue("thanhPhanHoSos", dataSource) // có thể sẽ chậm
    }, [dataSource])

    useEffect(() => {
        (async () => {
            if(danhMucGiayToChungThucs === undefined){
                const res = await DanhMucGiayToChungThucApi.Search({pageNumber: 1, pageSize: 50, suDung: true, reFetch: true})
                setDanhMucGiayToChungThucs(res.data.data)
            }
        })()
    },[danhMucGiayToChungThucs])
    
    useEffect(() => {
        if(danhMucGiayToChungThucs){
            const data = danhMucGiayToChungThucs.map((x): KetQuaThuTucChungThuc => ({
                ten: x.ten, 
                ma: x.ma,
                dinhKem: "",
                id: uuid(),
                kyDienTuBanGiay: false,
                soBanGiay: 1,
                soTrang: 1,
                // trangThaiDuyet: "Chưa ký"
            }))
            setDataSource(data.slice(0,1))
        }
        return () => {
            setDataSource([])
        }
    }, [danhMucGiayToChungThucs])

    const onAddRow = () => {
        const newRow : any = {
            id: uuid(),
            ten: "",
            dinhKem: "",
            soBanGiay: 1, 
            soTrang: 1,
            kyDienTuBanGiay: false,
        }
        setDataSource([...dataSource, newRow])
    }

    return <>
    <RenderTitle title={"Tệp đính kèm chứng thực"}/>
    <AntdTable
        columns={columns as any}
        dataSource={dataSource as any}
        footer={() => <AntdButton icon={<PlusCircleOutlined/>} type="primary" onClick={onAddRow}>Thêm giấy tờ</AntdButton>}
        pagination={false}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        onSearch={() => {}}
    /> 
    </>

}

