import { useEffect, useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { BaoCaoMau01Provider, useBaoCaoMau01Context } from "../contexts/BaoCao01Context"
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext"
import { BaoCao01Detail } from "./BaoCaoMau01Detail"
import { SearchBaoCao01, SearchPhieuKhaoSat } from "@/features/hoso/components/actions/traKetQuaVaDanhGiaHaiLong/redux/action"
import { resetDatas } from "@/features/hoso/components/actions/traKetQuaVaDanhGiaHaiLong/redux/slice"
import { BaoCao01Search } from "./BaoCaoMau01Search"
import { IPhieuKhaoSat, ISearchPhieuKhaoSat } from "@/features/hoso/components/actions/traKetQuaVaDanhGiaHaiLong/models"
import { userInfo } from "os"
import { Table } from "antd"
import { IPaginationResponse } from "@/models"
import './BaoCaoMau01.scss'
import { ExportExcelBaoCao01DGHL } from "./ExportExcelBaoCao01DGHL"

const BaoCao01Table = () => {
    const dispatch = useAppDispatch()
    const { data: user } = useAppSelector(state => state.user)
    const BaoCao01Context = useBaoCaoMau01Context()
    const { datas: phieukhaosats, count } = useAppSelector(state => state.phieukhaosat)
    const { datas: coCauToChucs } = useAppSelector(state => state.cocautochuc)

    const [searchParams, setSearchParams] = useState<ISearchPhieuKhaoSat>({ pageNumber: 1, pageSize: 50, reFetch: true, donVi: user?.officeCode })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    useEffect(() => {
        return () => {
            dispatch(resetDatas())
        }
    }, [])  
    
    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <BaoCao01Search setSearchParams={setSearchParams} />
                <AntdTable
                    bordered
                    columns={columns as any}
                    dataSource={phieukhaosats as any}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchPhieuKhaoSat(params))}
                />
            </AntdSpace>
            {BaoCao01Context.BaoCaoMau01ModalVisible ? <BaoCao01Detail /> : null}
            {phieukhaosats ? <ExportExcelBaoCao01DGHL
              quy={searchParams.quy} nam={searchParams.nam} data={phieukhaosats}
             groupName={coCauToChucs && coCauToChucs.length > 0 && searchParams.donVi ? coCauToChucs?.filter(x => x.groupCode == searchParams.donVi)[0].groupName : undefined}

             />
              : null}

        </>
    )
}
const BaoCao01TableWrapper = () => (<BaoCaoMau01Provider>
    <BaoCao01Table />
</BaoCaoMau01Provider>)
export default BaoCao01TableWrapper