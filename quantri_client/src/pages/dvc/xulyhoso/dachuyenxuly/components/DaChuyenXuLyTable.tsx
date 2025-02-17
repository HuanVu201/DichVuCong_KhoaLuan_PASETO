import { useEffect, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { ButtonActionProvider, useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { useButtonActions } from "@/features/hoso/hooks/useButtonActions"
import { screenType } from "@/features/hoso/data"
import { IHoSo, ISearchHoSo } from "@/features/hoso/models"
import { AntdSelect, AntdSpace, AntdTable } from "@/lib/antd/components"
import { DaChuyenXuLySearch } from "./DaChuyenXuLySearch"
import { SearchHoSo, SearchNguoiDaXuLy } from "@/features/hoso/redux/action"
import { Col, Form, MenuProps, Spin } from "antd"
import { DaChuyenXuLyProvider } from "../contexts/DaChuyenXuLyContext"
import { HoSoTableActions, useHoSoColumn } from "@/features/hoso/hooks/useHoSoColumn"
import { LazyActions } from "@/features/hoso/components/actions/LazyActions"
import { EyeOutlined, FileTextOutlined, PrinterOutlined } from "@ant-design/icons"
import { SearchHoSoComp } from "@/features/hoso/components/SearchHoSoComp"
import { useDaChuyenXuLyHoSoColumn } from "../hooks/useDaChuyenXuLyColumn"
import { filterOptions } from "@/utils"
import { GetUsersWithDonViQuanLy } from "@/features/user/redux/Actions"

const DaChuyenXuLyTable = () => {
    const dispatch = useAppDispatch()
    const buttonActionContext = useButtonActionContext()
    const { datas: hoSos, count, loading } = useAppSelector(state => state.hoso)
    const { data: user, datas: users } = useAppSelector(state => state.user)
    const { btnElememts } = useButtonActions({ maScreen: screenType["da-chuyen-xu-ly-ho-so"] })
    const [searchParams, setSearchParams] = useState<ISearchHoSo>({ pageNumber: 1, pageSize: 50, reFetch: true, notInMaTrangThais: ["3", "7", "9", "10"], viewHoSo: 'da-chuyen-xu-ly', hienThiTrangThaiThanhToan: false })
    const items: HoSoTableActions[] = useMemo(
        () => [
            {
                icon: <EyeOutlined title="Xem chi tiết" onClick={() => buttonActionContext.setChiTietHoSoModalVisible(true)} />
            },
            {
                icon: <PrinterOutlined title="Xuất phiếu tiếp nhận" onClick={() => buttonActionContext.setInPhieuTiepNhanHoSoModalVisible(true)} />
            },
            {
                icon: <FileTextOutlined title="Xuất phiếu kiểm soát" onClick={() => buttonActionContext.setInPhieuKiemSoatModalVisible(true)} />
            },
        ],
        []
    );
    useEffect(() => {
        dispatch(GetUsersWithDonViQuanLy({
            pageNumber: 1,
            pageSize: 1500,
            groupCode: user?.groupCode,
            // donViQuanLy: user?.officeCode
        }))
    }, [])

    const { columns } = useDaChuyenXuLyHoSoColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize }, items)
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], hoSos: IHoSo[]) => {
            buttonActionContext.setSelectedHoSos(selectedRowKeys);
            if (selectedRowKeys.length == 1) {
                buttonActionContext.setSelectedHoSo(hoSos[0]);
            }
            else {
                buttonActionContext.setSelectedHoSo(undefined);
            }
        },
        selectedRowKeys: buttonActionContext.selectedHoSos,
    }
    return (
        <LazyActions setSearchParams={setSearchParams}>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                {btnElememts}
                <div className="row">
                    <div className="col">
                        <SearchHoSoComp
                            btnComfirmLoading={loading}
                            extraElement={(form) => (<>
                                <Col span={6}>
                                    <Form.Item label="Hồ sơ tới hạn" name="hoSoToiHan">
                                        <AntdSelect
                                            showSearch
                                            allowClear
                                            filterOption={filterOptions}
                                            options={[
                                                { value: '1', label: '1 ngày' },
                                                { value: '2', label: '2 ngày' },
                                                { value: '3', label: '3 ngày' },
                                            ]}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="NguoiDangXuLy" label="Người xử lý">
                                        <AntdSelect
                                            generateOptions={{
                                                model: users,
                                                label: "fullName",
                                                value: "id",
                                            }}
                                            allowClear
                                            showSearch
                                        />
                                    </Form.Item>
                                </Col>

                            </>)}
                            setSearchParams={setSearchParams} defaultVisible={false} showAdvanceSearchBtn />
                    </div>
                </div>
                <hr style={{ margin: '8px 0' }} />
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
                    onSearch={(params) => dispatch(SearchNguoiDaXuLy(params))}
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