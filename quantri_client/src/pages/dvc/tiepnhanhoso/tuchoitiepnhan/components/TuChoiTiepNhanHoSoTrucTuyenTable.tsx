import { useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { ButtonActionProvider, useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo, ISearchHoSo } from "@/features/hoso/models"
import { AntdButton, AntdSpace, AntdTable } from "@/lib/antd/components"
import { SearchHoSo, SearchNguoiDangXuLy } from "@/features/hoso/redux/action"
import { HoSoTableActions, useHoSoColumn } from "../../../../../features/hoso/hooks/useHoSoColumn"
import { TableRowSelection } from "antd/es/table/interface"
import { LazyActions } from "@/features/hoso/components/actions/LazyActions"
import { EyeOutlined } from "@ant-design/icons"
import { SearchHoSoComp } from "@/features/hoso/components/SearchHoSoComp"
import { useTuChoiTiepNhanHoSoColumn } from "../hooks/useColumnTuChoiTiepNhan"
import { TableProps } from "antd"
import { ScreenType } from "@/features/hoso/data"
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/ExportExcel/exportTableToExcel"
import { XuatDanhSachHoSoTheoBaoCaoTongHopModal } from "@/features/hoSoTheoBaoCaoTongHop/exportElements/XuatDanhSachHoSoTheoBaoCaoTongHop"

export const TuChoiTiepNhanHoSoTrucTuyenTable = ({maScreen, extraSearchParams} : {maScreen?: ScreenType; extraSearchParams?: ISearchHoSo;}) => {
    const dispatch = useAppDispatch()
    const buttonActionContext = useButtonActionContext()
    const { datas: hoSos, count, loading } = useAppSelector(state => state.hoso)
    // const buttons = useButtonActions({maScreen: screenType["tiep-nhan-ho-so-truc-tuyen"]})
    const [searchParams, setSearchParams] = useState<ISearchHoSo>({ pageNumber: 1, pageSize: 10, reFetch: true, byCurrentUser: true, maTrangThai: "3", hienThiTrangThaiThanhToan : false, ...extraSearchParams })
    const items: HoSoTableActions[] = useMemo(
        () => [
            {
                icon: <EyeOutlined title="Xem chi tiết" onClick={() => buttonActionContext.setChiTietHoSoModalVisible(true)} />
            },
        ],
        []
    );
    const { columns } = useTuChoiTiepNhanHoSoColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize }, items)
    const rowSelection: TableRowSelection<IHoSo> = {
        onChange: (selectedRowKeys: React.Key[]) => {
            buttonActionContext.setSelectedHoSos(selectedRowKeys)
        },
        selectedRowKeys: buttonActionContext.selectedHoSos
    }
    const onChange: TableProps<any>['onChange'] = (pagination, filters, sorter, extra) => {
        if (filters) {
            const cleanedFilters = Object.fromEntries(
                Object.entries(filters).filter(([key, value]) => value !== null && value !== undefined && value.length > 0)

            );
            
            if (Object.keys(cleanedFilters).length > 0) {
                if (cleanedFilters.lyDoTuChoi) {
                    setSearchParams({
                        pageNumber: pagination.current || 1,
                        pageSize: pagination.pageSize || 10,
                        reFetch: true,
                        byCurrentUser: true,
                        maTrangThai: "3",
                        lyDoTuChoi: cleanedFilters.lyDoTuChoi[0] as any
                    });
                }
            }
            else {
                setSearchParams({
                    pageNumber: pagination.current || 1,
                    pageSize: pagination.pageSize || 10,
                    reFetch: true,
                    byCurrentUser: true,
                    maTrangThai: "3",
                });
            }
        }
    };
    return (
        <LazyActions setSearchParams={setSearchParams}>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                {/* {buttons} */}
                <SearchHoSoComp btnComfirmLoading={loading} setSearchParams={setSearchParams} defaultVisible={false} showAdvanceSearchBtn 
                 extraButtons={maScreen === "tu-choi-phi-dia-gioi" ? <AntdButton
                    type="primary"
                    onClick={() => {
                      downloadPhieuExcel("Danh sách hồ sơ", "danhSachHoSoTable");
                    }}
                  >
                    In danh sách
                  </AntdButton> : undefined}/>
                <AntdTable
                    loading={loading}
                    columns={columns}
                    dataSource={hoSos}
                    pagination={{
                        total: count
                    }}
                    rowSelection={rowSelection}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchNguoiDangXuLy(params))}
                    onChange={onChange}
                />
            </AntdSpace>
            {hoSos ? <XuatDanhSachHoSoTheoBaoCaoTongHopModal data={hoSos} /> : null}
        </LazyActions>

    )
}
const HoSoTableWrapper = () => (
    <ButtonActionProvider>
        <TuChoiTiepNhanHoSoTrucTuyenTable />
    </ButtonActionProvider>
)
export default HoSoTableWrapper