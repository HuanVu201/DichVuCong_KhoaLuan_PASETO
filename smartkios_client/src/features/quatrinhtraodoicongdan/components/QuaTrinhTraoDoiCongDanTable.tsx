import { useEffect, useState } from "react"
import { AntdTable, AntdSpace, AntdButton } from "../../../lib/antd/components"
import { useQuaTrinhTraoDoiCongDanColumns } from "../hooks/useQuaTrinhTraoDoiCongDanColumns"
import { IQuaTrinhTraoDoiCongDan, ISearchQuaTrinhTraoDoiCongDan } from "../models"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext"
import { quaTrinhTraoDoiCongDanService } from "../services"
import { QuaTrinhTraoDoiCongDanProvider, useQuaTrinhTraoDoiCongDanContext } from "../contexts/QuaTrinhTraoDoiCongDanProvider"
import { QuaTrinhTraoDoiCongDanDetail } from "./QuaTrinhTraoDoiCongDanDetail"

const QuaTrinhTraoDoiCongDanTable = () => {
    // const dispatch = useAppDispatch()
    const quaTrinhTraoDoiCongDanContext = useQuaTrinhTraoDoiCongDanContext()
    const {data: hoSo} = useAppSelector(state => state.hoso)
    const [quaTrinhTraoDoiCongDans, setQuaTrinhTraoDoiCongDans] = useState<IQuaTrinhTraoDoiCongDan[]>()
    const [count, setCount] = useState<number>()
    const [searchParams, setSearchParams] = useState<ISearchQuaTrinhTraoDoiCongDan>({ pageNumber: 1, pageSize: 10} as any)
    const { columns } = useQuaTrinhTraoDoiCongDanColumns({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize},setSearchParams)
    useEffect(() => {
        if(hoSo?.maHoSo){
            setSearchParams((curr) => ({...curr, maHoSo: hoSo.maHoSo}))
        }
    }, [hoSo?.maHoSo])
    useEffect(() => {
        return () => {
            setQuaTrinhTraoDoiCongDans(undefined)
        }
    }, [])
    const onSearch =async (values: ISearchQuaTrinhTraoDoiCongDan) => {
        const res = await quaTrinhTraoDoiCongDanService.Search(values)
        if(res.data.data){
            setQuaTrinhTraoDoiCongDans(res.data.data)
            setCount(res.data.totalCount)
        }
    }
    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <AntdButton type="primary" onClick={() => quaTrinhTraoDoiCongDanContext.setQuaTrinhTraoDoiCongDanModalVisible(true)}>Thêm mới</AntdButton>
                {searchParams.maHoSo ? <AntdTable
                    columns={columns as any}
                    dataSource={quaTrinhTraoDoiCongDans as any}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => onSearch(params)}
                />: null}
            </AntdSpace>
            {quaTrinhTraoDoiCongDanContext.quaTrinhTraoDoiCongDanModalVisible ? <QuaTrinhTraoDoiCongDanDetail setSearchParams={setSearchParams}/> : null}
        </>

    )
}
const QuaTrinhTraoDoiCongDanWrapper = () => (<QuaTrinhTraoDoiCongDanProvider>
    <QuaTrinhTraoDoiCongDanTable />
</QuaTrinhTraoDoiCongDanProvider>)
export default QuaTrinhTraoDoiCongDanWrapper