import { Suspense, lazy, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { ButtonActionProvider, useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions"
import { ScreenType, screenType } from "@/features/hoso/data"
import { ISearchHoSo } from "@/features/hoso/models"
import { AntdSpace, AntdTable } from "@/lib/antd/components"
import { DangXuLySearch } from "./DangXuLySearch"
import { SearchHoSo } from "@/features/hoso/redux/action"
import { MenuProps, Spin } from "antd"
import { DangXuLyProvider, useDangXuLyContext } from "../contexts/DangXuLyContext"
import { HoSoTableActions, useHoSoColumn } from "@/features/hoso/hooks/useHoSoColumn"
import { LazyActions } from "@/features/hoso/components/actions/LazyActions"
import { EyeOutlined, FileTextOutlined, PrinterOutlined } from "@ant-design/icons"
import { SearchHoSoComp } from "@/features/hoso/components/SearchHoSoComp"

export const DangXuLyTable = ({maScreen, extraSearchParams} : {maScreen: ScreenType; extraSearchParams?: ISearchHoSo }) => {
    const dispatch = useAppDispatch()
    const buttonActionContext = useButtonActionContext()
    const { datas: hoSos, count } = useAppSelector(state => state.hoso)
    const {btnElememts} = useButtonActions({ maScreen: maScreen })
    const [searchParams, setSearchParams] = useState<ISearchHoSo>({ pageNumber: 1, pageSize: 10, reFetch: true, byCurrentUser: true, maTrangThai: "4", ...extraSearchParams })
    const items: HoSoTableActions[] = useMemo(
        () => [
          {
            icon: <EyeOutlined title="Xem chi tiết" onClick={() => buttonActionContext.setChiTietHoSoModalVisible(true)}/>
          },
          {
            icon: <PrinterOutlined title="Xuất phiếu tiếp nhận" onClick={() => buttonActionContext.setInPhieuTiepNhanHoSoModalVisible(true)}/>
          },
          {
            icon: <FileTextOutlined title="Xuất phiếu kiểm soát" onClick={() => buttonActionContext.setInPhieuKiemSoatModalVisible(true)}/>
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
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
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
const HoSoTableWrapper = () => (<DangXuLyProvider>
    <ButtonActionProvider>
        <DangXuLyTable maScreen="dang-xu-ly-ho-so"/>
    </ButtonActionProvider>
</DangXuLyProvider>)
export default HoSoTableWrapper