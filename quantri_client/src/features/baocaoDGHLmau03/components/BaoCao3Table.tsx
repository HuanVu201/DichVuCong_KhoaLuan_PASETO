import { useEffect, useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext"
import { DanhGiaCoQuanProvider, useDanhGiaCoQuanContext } from "@/features/danhgiacoquan/contexts/DanhGiaCoQuanContext"
import { ISearchDanhGiaCoQuan } from "@/features/danhgiacoquan/models"
import { DanhGiaCoQuanSearch } from "@/features/danhgiacoquan/components/DanhGiaCoQuanSearch"
import { SearchDanhGiaCoQuan } from "@/features/danhgiacoquan/redux/action"
import { BaoCao3Detail } from "./BaoCao3Detail"
import { resetDatas } from "@/features/danhgiacoquan/redux/slice"
import { resetDatas as resetCoCauToChucs } from "@/features/cocautochuc/redux/slice"
import { BaoCao03Search } from "./BaoCao3Search"
import { ExportExcelBaoCao03DGHL } from "./ExportExcelBaoCao03DGHL"
import { ICoCauToChuc } from "@/features/cocautochuc/models"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"

const BaoCao3Table = () => {
    const currentQuarter = Math.floor((new Date().getMonth() + 3) / 3).toString()
    const currentYear = new Date().getFullYear().toString()
    const dispatch = useAppDispatch()
    const { datas: DanhGiaCoQuans, count, loading } = useAppSelector(state => state.danhgiacoquan)
    const danhGiaCoQuanContext = useDanhGiaCoQuanContext()
    const { data: user, } = useAppSelector(state => state.user)
    const { datas: coCauToChucs } = useAppSelector(state => state.cocautochuc)
    const [searchParams, setSearchParams] = useState<ISearchDanhGiaCoQuan>({ pageNumber: 1, pageSize: 50, reFetch: true, maDinhDanhCha: user?.maDinhDanh, quy: currentQuarter, nam: currentYear })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    const [dataCoCauToChuc, setDataCoCauToChuc] = useState<ICoCauToChuc[]>([]);
    const [maDinhDanh, setMaDinhDanh] = useState(searchParams.maDinhDanh)
    useEffect(() => {
        return () => {
            resetDatas()
        }
    }, [])
    useEffect(() => {
        if (searchParams.maDinhDanhCha)
            setMaDinhDanh(searchParams.maDinhDanhCha)
    }, [searchParams.maDinhDanhCha, searchParams.maDinhDanh])

    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <BaoCao03Search dataCoCauToChuc={dataCoCauToChuc} setDataCoCauToChuc={setDataCoCauToChuc} setSearchParams={setSearchParams} />
                <AntdTable
                    bordered
                    columns={columns}
                    loading={loading}
                    dataSource={DanhGiaCoQuans}
                    pagination={{
                        total: count,
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchDanhGiaCoQuan(params))}
                />
            </AntdSpace>
            {danhGiaCoQuanContext.DanhGiaCoQuanModalVisible ? <BaoCao3Detail /> : null}
            {DanhGiaCoQuans ? <ExportExcelBaoCao03DGHL
                quy={searchParams.quy ? searchParams.quy : currentQuarter} nam={searchParams.nam ? searchParams.nam : currentYear} data={DanhGiaCoQuans}
                groupName={dataCoCauToChuc && dataCoCauToChuc.length > 0 ? dataCoCauToChuc?.filter(x => x.maDinhDanh == maDinhDanh)[0]?.groupName : undefined}
            />
                : null}
        </>
    )
}
const DanhGiaCoQuanTableWrapper = () => (<DanhGiaCoQuanProvider>
    <BaoCao3Table />
</DanhGiaCoQuanProvider>)
export default DanhGiaCoQuanTableWrapper