import { useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ISearchHoSo } from "../../hoso/models"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { SearchHoSo } from "../../hoso/redux/action"
import { BoSungHoSoSearch } from "./BoSungHoSoSearch"
import { BoSungHoSoProvider, useBoSungHoSoContext } from "../contexts/BoSungHoSoContext"
import { BoSungHoSoDetail } from "./BoSungHoSoDetail"
import { ButtonActionProvider, useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions"
import { screenType } from "@/features/hoso/data"

const BoSungHoSoTable = () => {
    const dispatch = useAppDispatch()
    const { datas: hoSos, count } = useAppSelector(state => state.hoso)
    const boSungHoSoContext = useBoSungHoSoContext()
    const buttonActionContext = useButtonActionContext()
    const {btnElememts} = useButtonActions({ maScreen: screenType["bo-sung-ho-so"] })
    const [searchParams, setSearchParams] = useState<ISearchHoSo>({ pageNumber: 1, pageSize: 50 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                {btnElememts}
                <BoSungHoSoSearch setSearchParams={setSearchParams} />
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
            {boSungHoSoContext.detailBoSungHoSoModalVisible ? <BoSungHoSoDetail /> : null}
        </>

    )
}
const BoSungHoSoWrapper = () => (<BoSungHoSoProvider>
    <BoSungHoSoTable />
</BoSungHoSoProvider>)
export default BoSungHoSoWrapper