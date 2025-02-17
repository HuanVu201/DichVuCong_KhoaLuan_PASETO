import { AntdSpace, AntdTable } from "@/lib/antd/components"
import { ComponentProps, Suspense, useCallback, useEffect, useState } from "react"
import { useDanhSachGiayToContext } from "../contexts/DanhSachGiayToProvider"
import { useColumns } from "../hooks/useDanhSachGiayToColumns"
import { Search } from "./Search"
import { Detail } from "./Detail"
import { ITaiLieuLuuTruCongDan, Nguon_DVCQG } from "@/features/portaldvc/HoSoCaNhan/components/KhoTaiLieuCongDan/models"
import { khoTaiLieuCongDanApi, SearchDanhSachTaiLieuCongDan } from "@/features/portaldvc/HoSoCaNhan/components/KhoTaiLieuCongDan/services"
import { lazy } from "@/utils/lazyLoading"
import { Spin } from "antd"
import { toast } from "react-toastify"
import { getFileName } from "@/utils"

const ThongTinGiayToDVCQG = lazy(() => import("../../../../features/QuanLySuDungKhoTaiLieu/components/DanhSachSuDung/ThongTinGiayToDVCQG"))

export const DanhSachGiayTo = ({extraSearchParams, giayToQuocGiaModalTitle, giayToQuocGiaSearchText, syncAllGiayTo } : {syncAllGiayTo?:boolean; giayToQuocGiaSearchText?: string; giayToQuocGiaModalTitle?: string; extraSearchParams : SearchDanhSachTaiLieuCongDan}) => {
    const [dataSource, setDataSource] = useState<ITaiLieuLuuTruCongDan[]>([])
    const [searchParams, setSearchParams] = useState<SearchDanhSachTaiLieuCongDan>({pageNumber: 1, pageSize: 50})
    const [loading, setLoading] = useState(false)
    const { columns } = useColumns(searchParams, setSearchParams)
    const [count, setCount] = useState<number>()
    const menuKetQuaThuTucContext = useDanhSachGiayToContext()

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const res = await khoTaiLieuCongDanApi.DanhSachTaiLieuCongDan({...searchParams, ...extraSearchParams})
                setDataSource(res.data.data || [])
                setCount(res.data.totalCount || 0)
            } catch (error) {
                setLoading(false)
            } finally{
                setLoading(false)
            }
        })()
    }, [searchParams])
    

    const resetSearchParams = useCallback(() => {
        setSearchParams({ pageNumber: 1, pageSize: 50, ...extraSearchParams })
    }, [])

    const onOkHandler : ComponentProps<typeof ThongTinGiayToDVCQG>["onOkHandler"]= async (dinhKem, callApiAndDisplayFile) => {
        if(callApiAndDisplayFile?.req?.SoDinhDanhChuSoHuu == undefined){
            if(syncAllGiayTo) {
                setSearchParams((curr) => ({...curr}))
            } else {
                toast.warn("Không có thông tin số giấy tờ chủ hồ sơ")
            }
            return;
        }
        try {
            const res = await khoTaiLieuCongDanApi.AdminAddTaiLieuVaoKho({
                duongDan: dinhKem,
                soGiayToChuHoSo: callApiAndDisplayFile.req?.SoDinhDanhChuSoHuu,
                tenGiayTo: callApiAndDisplayFile.res?.tenGiayTo || getFileName(dinhKem),
                nguon: Nguon_DVCQG
            })
            if(res.data.succeeded){
                menuKetQuaThuTucContext.setViewMode(undefined)
                setSearchParams((curr) => ({...curr}))
                toast.success("Thêm mới thành công")
            }
        } catch (error) {
            console.log(error);
            toast.warn("Có lỗi xảy ra khi thêm mới")
        }
    }
    
    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <Search setSearchParams={setSearchParams} resetSearch={resetSearchParams} loading={loading}/>
                <>
                    <AntdTable
                        bordered
                        onSearch={(values) => {}}
                        columns={columns}
                        dataSource={dataSource}
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                        pagination={{
                            total: count
                        }}
                        loading={loading}
                    >
                    </AntdTable>
                </>
                
                {menuKetQuaThuTucContext.viewMode != "add" && menuKetQuaThuTucContext.viewMode? <Detail searchParams={searchParams} setSearchParams={setSearchParams}/> : null}
                {menuKetQuaThuTucContext.viewMode == "add" ? <Suspense fallback={<Spin spinning={true} rootClassName="suspense-spin"></Spin>}>
                <ThongTinGiayToDVCQG syncAll={syncAllGiayTo} searchText={giayToQuocGiaSearchText} title={giayToQuocGiaModalTitle} onOkHandler={onOkHandler} onCloseModal={() => menuKetQuaThuTucContext.setViewMode(undefined)}/>
                </Suspense> : null}
            </AntdSpace>
        </>

    )
}

