import { IGiayToSoHoa, ISearchGiayToSoHoa } from "@/features/giaytosohoa/models"
import { SearchGiayToSoHoa } from "@/features/giaytosohoa/redux/action"
import { ISearchHoSo } from "@/features/hoso/models"
import { SearchHoSo } from "@/features/hoso/redux/action"
import { AntdButton, AntdSpace, AntdTable, IAntdTabsProps } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useGiayToSoHoaColumns } from "../../hooks/useGiayToSoHoaColumns"
import { MenuKetQuaThuTucProvider, useMenuKetQuaThuTucContext } from "../../contexts/MenuKetQuaThuTucContext"
import { GiayToSoHoaDetail } from "../modals/GiayToSoHoaDetail"
import { MenuKetQuaThuTucActionSearch } from "./MenuKetQuaThuTucActionSearch"
import { TotalRecord } from "./TotalRecord"
import { giayToSoHoaApi } from "@/features/giaytosohoa/services"
import { Typography } from "antd"


export const MenuKetQuaThuTucActionTable = ({extraSearchParams, hideDanhSach = false, hideXuatDanhSach = false, hideThemMoi = false} : {hideXuatDanhSach?: boolean; extraSearchParams : ISearchGiayToSoHoa; hideDanhSach?: boolean; hideThemMoi?:boolean}) => {
    const [urlSearchParams] = useSearchParams()
    const [searchParams, setSearchParams] = useState<ISearchGiayToSoHoa>({ pageNumber: 1, pageSize: 50 })
    const { columns } = useGiayToSoHoaColumns(searchParams, setSearchParams)
    const [giayToSoHoas, setGiayToSoHoas] = useState<IGiayToSoHoa[]>([])
    const [count, setCount] = useState<number>()
    const menuKetQuaThuTucContext = useMenuKetQuaThuTucContext()
    // useEffect(() => {
    //     const maKetQuaTTHC = urlSearchParams.get("MaKetQuaTTHC")
    //     if (maKetQuaTTHC) {
    //         setSearchParams((curr) => {
    //             return ({ ...curr, hienThiGiayToKetQua: true, daHetHan: false, maKetQuaTTHC })
    //         })
    //     }

    // }, [urlSearchParams])

    useEffect(() => {
        (async () => {
            if(searchParams.maKetQuaTTHC){
                const res = await giayToSoHoaApi.Search({...searchParams, ...extraSearchParams})
                setGiayToSoHoas(res.data.data || [])
                setCount(res.data.totalCount || 0)
            }
        })()
    }, [searchParams])
    

    const resetSearchParams = useCallback(() => {
        const maKetQuaTTHC = urlSearchParams.get("MaKetQuaTTHC")
        
        if (maKetQuaTTHC) {
            setSearchParams({ pageNumber: 1, pageSize: 50, maKetQuaTTHC, hienThiGiayToKetQua: true, daHetHan: undefined, ...extraSearchParams })
        }
    }, [urlSearchParams])

    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <MenuKetQuaThuTucActionSearch setSearchParams={setSearchParams} resetSearch={resetSearchParams} giayToSoHoas={giayToSoHoas} hideXuatDanhSach={hideXuatDanhSach}/>
                {hideDanhSach ? 
                <div><Typography.Title level={5}>Tổng số {count} bản ghi</Typography.Title></div> : 
                <>{searchParams.maKetQuaTTHC ?
                    <>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <TotalRecord count={count} pageNumber={searchParams.pageNumber} pageSize={searchParams.pageSize} style={{ justifyContent: "start" }} />
                            {hideThemMoi ? null : <AntdButton type="primary" onClick={() => menuKetQuaThuTucContext.setViewMode("add")}>Thêm mới</AntdButton>}
                        </div>
                        <AntdTable
                            bordered
                            footer={() => <TotalRecord count={count} pageNumber={searchParams.pageNumber} pageSize={searchParams.pageSize} />}
                            onSearch={(values) => {}}
                            columns={columns}
                            dataSource={giayToSoHoas}
                            searchParams={searchParams}
                            setSearchParams={setSearchParams}
                            pagination={{
                                total: count
                            }}
                        >
                        </AntdTable>
                    </>
                    : null}</>
                }
                
                {menuKetQuaThuTucContext.viewMode ? <GiayToSoHoaDetail setSearchParams={setSearchParams}/> : null}
            </AntdSpace>
        </>

    )
}
