import { useEffect, useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useGdttColumn } from "../hooks/useColumn"
import { ISearchGiaoDichThanhToan } from "../models"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { SearchGiaoDichThanhToan } from "../redux/action"
import { GiaoDichThanhToanSearch } from "./GiaoDichThanhToanSearch"
import { GiaoDichThanhToanProvider, useGiaoDichThanhToanContext } from "../contexts/GiaoDichThanhToanContext"
import { GiaoDichThanhToanDetail } from "./GiaoDichThanhToanDetail"
import { CheckGiaoDichThanhToanModal } from "./CheckGiaoDichThanhToanModal"
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/documents/excel/exportTableToExcel"
import { XuatDanhSachGiaoDichThanhToanModal } from "./XuatGiaoDichThanhToan"
import { useSearchParams } from "react-router-dom"
import { Affix, Button } from "antd"
import { toast } from "react-toastify"
import { XoaGdttModal } from "./XoaGDTTModal"

const GiaoDichThanhToanTable = () => {
    const [parmas] = useSearchParams();
    const dispatch = useAppDispatch()
    const gdttContext = useGiaoDichThanhToanContext();
    const { datas: giaoDichThanhToans, count } = useAppSelector(state => state.giaodichthanhtoans)
    const [searchParams, setSearchParams] = useState<ISearchGiaoDichThanhToan>({ pageNumber: 1, pageSize: 100 })
    const [firstAccess, setFirstAccess] = useState<boolean>(true);
    const { columns } = useGdttColumn({ pagination: searchParams, setSearchParams: setSearchParams })
    const inDanhSach = () => {

        downloadPhieuExcel("Danh sách giao dịch thanh toán", "ContainerSwapper");

    }
    useEffect(() => {
        if (parmas) {
            const trangThai = parmas.get('trangThai')
            if (trangThai) setSearchParams(curr => ({ ...curr, trangThai: trangThai }))

        }
        setFirstAccess(false)
    }, [parmas])
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[]) => {
            gdttContext.setGiaoDichThanhToanId(selectedRowKeys);
        },
        selectedRowKeys: gdttContext.giaoDichThanhToanId,
    };

    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <Affix offsetTop={75}>
                    <AntdSpace direction="horizontal" style={{ flexWrap: "wrap" }}>
                        <Button
                            disabled={gdttContext.giaoDichThanhToanId.length > 1}
                            onClick={() => {
                                if (gdttContext.giaoDichThanhToanId.length == 1) {
                                    gdttContext.setXoaGiaoDichThanhToanModalVisible(true)
                                } else if (gdttContext.giaoDichThanhToanId.length > 1) {

                                }
                                else {
                                    toast.warning("Không có giao dịch thanh toán nào được chọn");
                                }
                            }}
                            style={{ backgroundColor: "#D84A38", color: "white" }}
                        >
                            Xoá
                        </Button>
                    </AntdSpace>
                </Affix>
                <GiaoDichThanhToanSearch setSearchParams={setSearchParams} inDanhSach={inDanhSach} />
                <AntdTable

                    columns={columns}
                    dataSource={giaoDichThanhToans}
                    pagination={{
                        total: count
                    }}
                    rowSelection={rowSelection}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => {
                        if (!firstAccess) return dispatch(SearchGiaoDichThanhToan(params))
                    }}
                />


                {gdttContext.checkGiaoDichThanhToanModalVisible ? <CheckGiaoDichThanhToanModal searchParams={searchParams} /> : null}
                <XuatDanhSachGiaoDichThanhToanModal data={giaoDichThanhToans} />
                {gdttContext.xoaGiaoDichThanhToanModalVisible ? <XoaGdttModal handleCancel={() => gdttContext.setXoaGiaoDichThanhToanModalVisible(false)} searchParams={searchParams} /> : null}
            </AntdSpace>

        </>

    )
}
const GiaoDichThanhToanTableWrapper = () => (<GiaoDichThanhToanProvider>
    <GiaoDichThanhToanTable />
</GiaoDichThanhToanProvider>)
export default GiaoDichThanhToanTableWrapper