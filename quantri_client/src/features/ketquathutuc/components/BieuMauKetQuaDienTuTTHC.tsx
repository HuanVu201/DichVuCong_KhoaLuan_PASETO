import { useEffect, useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useKetQuaThuTucColumns } from "../hooks/useKetQuaThuTucColumns"
import { IKetQuaThuTuc, ISearchKetQuaThuTuc } from "../models"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { KetQuaThuTucDetail } from "./KetQuaThuTucDetail"
import { ThuTucProvider, useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext"
import { ketQuaThuTucService } from "../services"
import { KetQuaThuTucProvider, useKetQuaThuTucContext } from "../contexts/KetQuaThuTucProvider"
import { BieuMauKetQuaDienTuSearch } from "./BieuMauKetQuaDienTuSearch"
import { toast } from "react-toastify"

const BieuMauKetQuaDienTuTTHCTable = () => {
    const dispatch = useAppDispatch()
    const KetQuaThuTucContext = useKetQuaThuTucContext()
    const thuTucContext = useThuTucContext();
    const [ketQuaThuTucs, setKetQuaThuTucs] = useState<IKetQuaThuTuc[]>()
    const [count, setCount] = useState<number>()
    const [searchParams, setSearchParams] = useState<ISearchKetQuaThuTuc>({ pageNumber: 1, pageSize: 50 } as any)
    const { columns } = useKetQuaThuTucColumns({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize }, setSearchParams)
    useEffect(() => {
        if (KetQuaThuTucContext.thuTucId) {
            setSearchParams((curr) => ({ ...curr, maTTHC: KetQuaThuTucContext.thuTucId } as any))
        }
    }, [KetQuaThuTucContext.thuTucId])
    useEffect(() => {
        return () => {
            setKetQuaThuTucs(undefined)
        }
    }, [])
    const onSearch = async (values: ISearchKetQuaThuTuc) => {

        const res = await ketQuaThuTucService.Search(values)

        if (res.data) {
            setKetQuaThuTucs(res.data.data || [])
            setCount(res.data.totalCount || 0)
        }
    }
    const resetSearchParams = () => {
        if (KetQuaThuTucContext.thuTucId) {
            setSearchParams({ pageNumber: 1, pageSize: 50, maTTHC: KetQuaThuTucContext.thuTucId })
        }
    }
    useEffect(() => {

        thuTucContext.setThuTucId(searchParams.maTTHC);

        onSearch(searchParams)

    }, [
        searchParams
    ])
    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <BieuMauKetQuaDienTuSearch setSearchParams={setSearchParams} resetSearch={resetSearchParams} />
                {<AntdTable
                    columns={columns as any}
                    dataSource={ketQuaThuTucs as any}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => { }}
                />}
            </AntdSpace>
            {KetQuaThuTucContext.ketQuaThuTucModalVisible ? <KetQuaThuTucDetail setSearchParams={setSearchParams} /> : null}
        </>

    )
}
const LoaiKetQuaThuTucWrapper = () => (
    <ThuTucProvider>
        <KetQuaThuTucProvider>
            <BieuMauKetQuaDienTuTTHCTable />
        </KetQuaThuTucProvider>
    </ThuTucProvider>)
export default LoaiKetQuaThuTucWrapper