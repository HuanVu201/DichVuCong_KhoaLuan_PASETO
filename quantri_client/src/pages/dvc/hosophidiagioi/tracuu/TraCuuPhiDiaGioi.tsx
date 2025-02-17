import { useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { ButtonActionProvider, useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions"
import { ScreenType, screenType } from "@/features/hoso/data"
import { ISearchHoSo } from "@/features/hoso/models"
import { AntdSpace, AntdTable } from "@/lib/antd/components"
import { SearchHoSo } from "@/features/hoso/redux/action"
import { HoSoTableActions, useHoSoColumn } from "@/features/hoso/hooks/useHoSoColumn"
import { LazyActions } from "@/features/hoso/components/actions/LazyActions"
import { EyeOutlined } from "@ant-design/icons"
import { SearchHoSoComp } from "@/features/hoso/components/SearchHoSoComp"
import { lazy } from "@/utils/lazyLoading"
import { deleteObjectKeyValues } from "@/utils/common"
import { XuatDanhSachHoSoTheoBaoCaoTongHopModal } from "@/features/hoSoTheoBaoCaoTongHop/exportElements/XuatDanhSachHoSoTheoBaoCaoTongHop"

const SearchTraCuuPhiDiaGioi = lazy(() => import("./SearchTraCuu"))

export const TraCuuPhiDiaGioi = ({maScreen, extraSearchParams}: {maScreen: ScreenType, extraSearchParams?: ISearchHoSo;}) => {
    const dispatch = useAppDispatch()
    const buttonActionContext = useButtonActionContext()
    const { data: user} = useAppSelector(state => state.user)
    const { datas: hoSos, count, loading } = useAppSelector(state => state.hoso)
    const {btnElememts} = useButtonActions({maScreen})
    const [searchParams, setSearchParams] = useState<ISearchHoSo>({ pageNumber: 1, pageSize: 10, reFetch: true, byNguoiNhanPhiDiaGioi: true, ...extraSearchParams})
    const items: HoSoTableActions[] = useMemo(
        () => [
          {
            icon: <EyeOutlined title="Xem chi tiết" onClick={() => buttonActionContext.setChiTietHoSoModalVisible(true)}/>
          },
        ],
        []
    );
    const { columns } = useHoSoColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize }, items, maScreen)
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[]) => {
            buttonActionContext.setSelectedHoSos(selectedRowKeys)
        },
        selectedRowKeys: buttonActionContext.selectedHoSos
    }

    const onSearch = (params : ISearchHoSo) => {
        if("donViPhiDiaGioi" in params){
            params.groupCode = params.donViPhiDiaGioi as string | undefined
        }
        deleteObjectKeyValues(params, ["soBanNganh", "donViPhiDiaGioi", "capThucHienDonViPhiDiaGioi"] as any)
        dispatch(SearchHoSo(params))
    }

    return (
        <LazyActions setSearchParams={setSearchParams}>
            <AntdSpace direction="vertical" style={{width:"100%"}}>
                {btnElememts}
                <SearchTraCuuPhiDiaGioi btnComfirmLoading={loading} setSearchParams={setSearchParams} defaultVisible={false}/>
                {user?.officeCode ? <AntdTable
                    loading={loading}
                    columns={columns}
                    dataSource={hoSos}
                    pagination={{
                        total: count
                    }}
                    rowSelection={rowSelection}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={onSearch}
                />: null}
            </AntdSpace>
            {hoSos ? <XuatDanhSachHoSoTheoBaoCaoTongHopModal data={hoSos} /> : null}
        </LazyActions>
            
    )
}
const HoSoTableWrapper = () => (
    <ButtonActionProvider>
        <TraCuuPhiDiaGioi maScreen={"tra-cuu-phi-dia-gioi"}/>
    </ButtonActionProvider>)
export default HoSoTableWrapper