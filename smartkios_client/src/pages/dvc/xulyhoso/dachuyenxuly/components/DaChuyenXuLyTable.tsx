import { Suspense, lazy, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { ButtonActionProvider, useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions"
import { screenType } from "@/features/hoso/data"
import { ISearchHoSo } from "@/features/hoso/models"
import { AntdSpace, AntdTable } from "@/lib/antd/components"
import { DaChuyenXuLySearch } from "./DaChuyenXuLySearch"
import { SearchHoSo } from "@/features/hoso/redux/action"
import { MenuProps, Spin } from "antd"
import { DaChuyenXuLyProvider } from "../contexts/DaChuyenXuLyContext"
import { HoSoTableActions, useHoSoColumn } from "@/features/hoso/hooks/useHoSoColumn"
import { LazyActions } from "@/features/hoso/components/actions/LazyActions"
import { EyeOutlined, FileTextOutlined, PrinterOutlined } from "@ant-design/icons"
import { SearchHoSoComp } from "@/features/hoso/components/SearchHoSoComp"

const DaChuyenXuLyTable = () => {
    const dispatch = useAppDispatch()
    const buttonActionContext = useButtonActionContext()
    const { datas: hoSos, count } = useAppSelector(state => state.hoso)
    const {data: user} = useAppSelector(state => state.user)
    const {btnElememts} = useButtonActions({maScreen: screenType["da-chuyen-xu-ly-ho-so"]})
    const [searchParams, setSearchParams] = useState<ISearchHoSo>({ pageNumber: 1, pageSize: 10, reFetch: true, notInMaTrangThais: ["3", "7","9","10"], nguoiDaXuLy: user?.id})
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
const HoSoTableWrapper = () => (<DaChuyenXuLyProvider>
    <ButtonActionProvider>
        <DaChuyenXuLyTable />
    </ButtonActionProvider>
</DaChuyenXuLyProvider>)
export default HoSoTableWrapper