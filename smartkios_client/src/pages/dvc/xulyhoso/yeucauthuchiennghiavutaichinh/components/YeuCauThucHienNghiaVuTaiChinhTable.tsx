import { Suspense, lazy, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { ButtonActionProvider, useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions"
import { screenType } from "@/features/hoso/data"
import { ISearchHoSo } from "@/features/hoso/models"
import { AntdSpace, AntdTable } from "@/lib/antd/components"
import { YeuCauThucHienNghiaVuTaiChinhSearch } from "./YeuCauThucHienNghiaVuTaiChinhSearch"
import { SearchHoSo } from "@/features/hoso/redux/action"
import { MenuProps, Spin } from "antd"
import { YeuCauThucHienNghiaVuTaiChinhProvider, useYeuCauThucHienNghiaVuTaiChinhContext } from "../contexts/YeuCauThucHienNghiaVuTaiChinhContext"
import { HoSoTableActions, useHoSoColumn } from "@/features/hoso/hooks/useHoSoColumn"
import { LazyActions } from "@/features/hoso/components/actions/LazyActions"
import { EyeOutlined } from "@ant-design/icons"
import { SearchHoSoComp } from "@/features/hoso/components/SearchHoSoComp"

const YeuCauThucHienNghiaVuTaiChinhTable = () => {
    const dispatch = useAppDispatch()
    const buttonActionContext = useButtonActionContext()
    const { datas: hoSos, count } = useAppSelector(state => state.hoso)
    const {btnElememts} = useButtonActions({maScreen: screenType["yeu-cau-thuc-hien-nghia-vu-tai-chinh"]})
    const [searchParams, setSearchParams] = useState<ISearchHoSo>({ pageNumber: 1, pageSize: 10, reFetch: true, byCurrentUser: true, maTrangThai: "6"})
    const items: HoSoTableActions[] = useMemo(
        () => [
          {
            icon: <EyeOutlined title="Xem chi tiết" onClick={() => buttonActionContext.setChiTietHoSoModalVisible(true)}/>
          },
        ],
        []
    );
    const { columns } = useHoSoColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize }, items)
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
                <SearchHoSoComp setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={hoSos}
                    pagination={{
                        total: count
                    }}
                    rowSelection={rowSelection}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchHoSo(params))}
                />
            </AntdSpace>
        </LazyActions>
            
    )
}
const HoSoTableWrapper = () => (<YeuCauThucHienNghiaVuTaiChinhProvider>
    <ButtonActionProvider>
        <YeuCauThucHienNghiaVuTaiChinhTable/>
    </ButtonActionProvider>
</YeuCauThucHienNghiaVuTaiChinhProvider>)
export default HoSoTableWrapper