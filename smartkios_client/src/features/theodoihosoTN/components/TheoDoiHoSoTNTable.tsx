import { useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchHoSo } from "../../hoso/models"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { SearchHoSo } from "../../hoso/redux/action"
import { TheoDoiHoSoTNSearch } from "./TheoDoiHoSoTNSearch"
import { TheoDoiHoSoTNProvider, useTheoDoiHoSoTNContext } from "../contexts/TheoDoiHoSoTNContext"
import { TheoDoiHoSoTNDetail } from "./TheoDoiHoSoTNDetail"
import { ButtonActionProvider, useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions"
import { screenType } from "@/features/hoso/data"

const TheoDoiHoSoTNTable = () => {
    const dispatch = useAppDispatch()
    const { datas: hoSos, count } = useAppSelector(state => state.hoso)
    const theoDoiHoSoTNContext = useTheoDoiHoSoTNContext()
    const buttonActionContext = useButtonActionContext()
    const {btnElememts} = useButtonActions({ maScreen: screenType["theo-doi-ho-so-tn"] })
    const [searchParams, setSearchParams] = useState<ISearchHoSo>({ pageNumber: 1, pageSize: 10 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                {btnElememts}
                <TheoDoiHoSoTNSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={hoSos}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchHoSo(params))}
                />
            </AntdSpace>
            {theoDoiHoSoTNContext.detailTheoDoiHoSoTNModalVisible ? <TheoDoiHoSoTNDetail /> : null}
        </>

    )
}
const TheoDoiHoSoTNWrapper = () => (<TheoDoiHoSoTNProvider>
    <TheoDoiHoSoTNTable />
</TheoDoiHoSoTNProvider>)
export default TheoDoiHoSoTNWrapper