import { Suspense, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { ButtonActionProvider, useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions"
import { screenType } from "@/features/hoso/data"
import { ISearchHoSo } from "@/features/hoso/models"
import { AntdSpace, AntdTable } from "@/lib/antd/components"
import { HoSoQuaHanSearch } from "./HoSoQuaHanSearch"
import { SearchHoSo } from "@/features/hoso/redux/action"
import { MenuProps, Spin } from "antd"
import { HoSoQuaHanProvider, useHoSoQuaHanContext } from "../contexts/HoSoQuaHanContext"
import { HoSoTableActions, useHoSoColumn } from "@/features/hoso/hooks/useHoSoColumn"
import dayjs from 'dayjs'
import { LazyActions } from "@/features/hoso/components/actions/LazyActions"
import { EyeOutlined } from "@ant-design/icons"
import { SearchHoSoComp } from "@/features/hoso/components/SearchHoSoComp"
import { SearchHoSoToiHan } from "@/pages/dvc/theodoihoso/hosotoihan/components/HoSoToiHanSearch"
import { SearchHoSoQuaHan } from "@/pages/dvc/theodoihoso/hosoquahan/components/HoSoQuaHanSearch"

const HoSoQuaHanTable = () => {
    const dispatch = useAppDispatch()
    const buttonActionContext = useButtonActionContext()
    const { data: user} = useAppSelector(state => state.user)
    const { datas: hoSos, count, loading } = useAppSelector(state => state.hoso)
    const {btnElememts} = useButtonActions({maScreen: screenType["ho-so-qua-han"]})
    const [searchParams, setSearchParams] = useState<ISearchHoSo>({ pageNumber: 1, pageSize: 10, reFetch: true, inMaTrangThais: ["2", "4"], henTraTo: dayjs().format("YYYY-MM-DD"), laNguoiNhanHoSo: true})
    const items: HoSoTableActions[] = useMemo(
        () => [
          {
            icon: <EyeOutlined title="Xem chi tiết" onClick={() => buttonActionContext.setChiTietHoSoModalVisible(true)}/>
          },
        ],
        []
      );
    const { columns } = useHoSoColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize }, items, 'ho-so-qua-han')
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[]) => {
            buttonActionContext.setSelectedHoSos(selectedRowKeys)
        },
        selectedRowKeys: buttonActionContext.selectedHoSos
    }
    return (
        <LazyActions setSearchParams={setSearchParams}>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                {btnElememts}
                <SearchHoSoQuaHan btnComfirmLoading={loading} setSearchParams={setSearchParams} defaultVisible={false} showAdvanceSearchBtn/>
                {searchParams.laNguoiNhanHoSo ? <AntdTable
                    loading={loading}
                    columns={columns}
                    dataSource={hoSos}
                    pagination={{
                        total: count
                    }}
                    rowSelection={rowSelection}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchHoSo(params))}
                />: null}
            </AntdSpace>
        </LazyActions>
            
    )
}
const HoSoTableWrapper = () => (<HoSoQuaHanProvider>
    <ButtonActionProvider>
        <HoSoQuaHanTable/>
    </ButtonActionProvider>
</HoSoQuaHanProvider>)
export default HoSoTableWrapper