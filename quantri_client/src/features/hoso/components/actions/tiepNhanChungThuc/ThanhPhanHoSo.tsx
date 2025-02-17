import { IHoSo } from "@/features/hoso/models"
import { ISearchThanhPhanThuTuc, IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models"
import {  useThanhPhanThuTucColumn } from "@/features/hoso/hooks/useThanhPhanThuTucColumn"
import { AntdButton, AntdTable } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { PlusCircleOutlined } from "@ant-design/icons"
import { Col, FormInstance, Typography } from "antd"
import { useEffect, useMemo, useState } from "react"
import {v4 as uuid} from 'uuid'
// import { DanhSachGiayToSoHoaModal } from "./DanhSachGiayToSoHoaModal"
import { useTiepNhanHoSoContext } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext"
// import { GiayToSoHoaModal } from "./GiayToSoHoaModal"
import {TRANGTHAISOHOA, TRANGTHAISOHOA_VALUE} from '../../../data/formData'
import { IKetQuaThuTuc, ISearchKetQuaThuTuc } from "@/features/ketquathutuc/models"
import { ISearchThanhPhanHoSo, IThanhPhanHoSo } from "@/features/thanhphanhoso/models"
import { RenderTitle } from "@/components/common"
import { IDanhMucGiayToChungThuc } from "@/features/danhmucgiaytochungthuc/models"
import { SearchDanhMucGiayToChungThuc } from "@/features/danhmucgiaytochungthuc/redux/action"
import { DanhMucGiayToChungThucApi } from "@/features/danhmucgiaytochungthuc/services"
import { useThanhPhanHoSos } from "./hooks/useThanhPhanHoSos"
import { SearchThanhPhanHoSo } from "@/features/thanhphanhoso/redux/action"
import { getCurrency, numberToCurrencyText } from "@/utils"
import { tinhTongTien } from "../yeuCauThanhToanChungThuc/ultis"
import { thanhPhanHoSoApi } from "@/features/thanhphanhoso/services"

export type KetQuaThuTucChungThuc = Pick<IThanhPhanHoSo, "soTrang" | "soBanGiay" | "kyDienTuBanGiay" | "dinhKem" | "id"| "ten" | "maGiayTo" | "trangThaiDuyet">
const PAGE_SIZE = 200
export const ThanhPhanChungThucHoSo = ({ form, useKySoNEAC}: { useKySoNEAC?: boolean, form: FormInstance<IHoSo>}) => {
    const [searchParams, setSearchParams] = useState<ISearchThanhPhanHoSo>({ pageNumber: 1, pageSize: 50 })
    const [dataSource, setDataSource] = useState<KetQuaThuTucChungThuc[]>([])
    const [danhMucGiayToChungThucs, setDanhMucGiayToChungThucs] = useState<IDanhMucGiayToChungThuc[]>()
    const {columns} = useThanhPhanHoSos({dataSource, setDataSource, form, danhMucGiayToChungThucs, useKySoNEAC, pagination: {pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize}})
    // const { datas: thanhPhanHoSos, count } = useAppSelector(state => state.thanhphanhoso)
    const { data: hoSo } = useAppSelector(state => state.hoso)
    const [newCount, setNewCount] = useState<number>()
    // const dispatch = useAppDispatch()

    // useEffect(() => {
    //     setNewCount(count)
    // }, [count])

    useEffect(() => {
        (async () => {
            if (hoSo) {
                const res = await thanhPhanHoSoApi.Search({...searchParams, pageSize:PAGE_SIZE, hoSo : hoSo.maHoSo})
                // dispatch(SearchThanhPhanHoSo(params))
                setDataSource(res.data.data)
                setNewCount(res.data.totalCount)
            }
        })()
    }, [hoSo])

    // useEffect(() => {
    //     if(thanhPhanHoSos){
    //         setDataSource(thanhPhanHoSos)
    //     }
    // }, [thanhPhanHoSos])

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
                ten: "", 
                maGiayTo: "",
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
            hoSo: hoSo?.maHoSo
        }
        const newDataSource = [...dataSource, newRow]
        setNewCount(newDataSource.length)
        setDataSource(newDataSource)
    }
    const tongTien = useMemo(() => {
        return tinhTongTien(dataSource)
    }, [dataSource]);
    return <>
    <RenderTitle title={"Tệp đính kèm chứng thực"}/>
    <Typography.Title level={5} style={{marginTop:5}}>Tổng số tiền: {getCurrency(tongTien, ".")} VNĐ ({numberToCurrencyText(tongTien)})</Typography.Title>
    <AntdTable
        columns={columns as any}
        dataSource={dataSource as any}
        footer={() => {
            return <div style={{display:"flex", justifyContent:"space-between"}}>
            <AntdButton icon={<PlusCircleOutlined/>} type="primary" onClick={onAddRow}>Thêm giấy tờ</AntdButton>
            <Typography.Title level={5} style={{marginTop:5}}>Tổng số tiền: {getCurrency(tongTien, ".")} VNĐ ({numberToCurrencyText(tongTien)})</Typography.Title>
            </div>
        }}
        pagination={{total: newCount}}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        onSearch={(params) =>{}}
    />
    </>

}

