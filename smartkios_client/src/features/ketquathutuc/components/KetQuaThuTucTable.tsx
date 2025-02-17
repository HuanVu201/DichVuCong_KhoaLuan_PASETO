import { useEffect, useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useKetQuaThuTucColumns } from "../hooks/useKetQuaThuTucColumns"
import { IKetQuaThuTuc, ISearchKetQuaThuTuc } from "../models"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { KetQuaThuTucSearch } from "./KetQuaThuTucSearch"
import { KetQuaThuTucDetail } from "./KetQuaThuTucDetail"
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext"
import { ketQuaThuTucService } from "../services"
import { KetQuaThuTucProvider, useKetQuaThuTucContext } from "../contexts/KetQuaThuTucProvider"

const KetQuaThuTucTable = () => {
    const dispatch = useAppDispatch()
    const KetQuaThuTucContext = useKetQuaThuTucContext()
    const thuTucContext = useThuTucContext()
    const [ketQuaThuTucs, setKetQuaThuTucs] = useState<IKetQuaThuTuc[]>()
    const [count, setCount] = useState<number>()
    const [searchParams, setSearchParams] = useState<ISearchKetQuaThuTuc>({ pageNumber: 1, pageSize: 10} as any)
    const { columns } = useKetQuaThuTucColumns({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize},setSearchParams)
    useEffect(() => {
        if(thuTucContext.thuTucId){
            setSearchParams((curr) => ({...curr, maTTHC: thuTucContext.thuTucId} as any))
        }
    }, [thuTucContext.thuTucId])
    useEffect(() => {
        return () => {
            setKetQuaThuTucs(undefined)
        }
    }, [])
    const onSearch =async (values: ISearchKetQuaThuTuc) => {
        const res = await ketQuaThuTucService.Search(values)
        if(res.data.data){
            setKetQuaThuTucs(res.data.data)
            setCount(res.data.totalCount)
        }
    }
    const resetSearchParams = () => {
        if(thuTucContext.thuTucId){
            setSearchParams({ pageNumber: 1, pageSize: 10, maTTHC: thuTucContext.thuTucId})
        }
    }
    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <KetQuaThuTucSearch setSearchParams={setSearchParams} resetSearch={resetSearchParams}/>
                {searchParams.maTTHC ? <AntdTable
                    columns={columns as any}
                    dataSource={ketQuaThuTucs as any}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => onSearch(params)}
                />: null}
            </AntdSpace>
            {KetQuaThuTucContext.ketQuaThuTucModalVisible ? <KetQuaThuTucDetail setSearchParams = {setSearchParams}/> : null}
        </>

    )
}
const LoaiKetQuaThuTucWrapper = () => (<KetQuaThuTucProvider>
    <KetQuaThuTucTable />
</KetQuaThuTucProvider>)
export default LoaiKetQuaThuTucWrapper