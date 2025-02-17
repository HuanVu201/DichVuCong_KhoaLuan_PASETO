import { useEffect, useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext"
import { DanhGiaCoQuanProvider, useDanhGiaCoQuanContext } from "@/features/danhgiacoquan/contexts/DanhGiaCoQuanContext"
import { BaoCao02Search } from "./BaoCao2Search"
import { SearchDanhGiaCoQuan } from "@/features/danhgiacoquan/redux/action"
import { BaoCaoCoQuan02Detail } from "./BaoCao2Detail"
import { IDanhGiaCoQuan, ISearchDanhGiaCoQuan } from "@/features/danhgiacoquan/models"
import { Table } from "antd"
import { IPaginationResponse } from "@/models"
import { ExportExcelBaoCao02DGHL } from "./ExportExcelBaoCao02"

const BaoCao2Table = () => {
    const dispatch = useAppDispatch()
    const { datas: DanhGiaCoQuans, count, loading } = useAppSelector(state => state.danhgiacoquan)
    const [dataSource, setDataSource] = useState<IPaginationResponse<IDanhGiaCoQuan[]>>([] as any);
    const [dataToExportExcel, setDataToExportExcel] = useState()
    const { datas: coCauToChucs } = useAppSelector(state => state.cocautochuc)
    const updateDataSource = (res: IPaginationResponse<IDanhGiaCoQuan[]>) => {
        setDataSource(res); // Cập nhật state dataSource với giá trị res mới
    };
    const currentQuarter = Math.floor((new Date().getMonth() + 3) / 3).toString()
    const currentYear = new Date().getFullYear().toString()
    const danhGiaCoQuanContext = useDanhGiaCoQuanContext()
    const [searchParams, setSearchParams] = useState<ISearchDanhGiaCoQuan>({ pageNumber: 1, pageSize: 50, reFetch: true })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    useEffect(() => {
        if (dataSource.data)
            setDataToExportExcel(dataSource.data[0] as any)
    }, [dataSource])
    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <BaoCao02Search onUpdateDataSource={updateDataSource} setSearchParams={setSearchParams} />
                <Table
                    bordered
                    columns={columns}
                    loading={loading}
                    dataSource={dataSource.data}

                />
            </AntdSpace>
            {danhGiaCoQuanContext.DanhGiaCoQuanModalVisible ? <BaoCaoCoQuan02Detail /> : null}
            {dataSource ? <ExportExcelBaoCao02DGHL
                quy={searchParams.quy ? searchParams.quy : currentQuarter} nam={searchParams.nam ? searchParams.nam : currentYear} data={dataToExportExcel}
                groupName={coCauToChucs && coCauToChucs.length > 0 && searchParams.donVi ? coCauToChucs?.filter(x => x.groupCode == searchParams.donVi)[0].groupName : undefined}

            />
                : null}
        </>
    )
}
const DanhGiaCoQuanTableWrapper = () => (<DanhGiaCoQuanProvider>
    <BaoCao2Table />
</DanhGiaCoQuanProvider>)
export default DanhGiaCoQuanTableWrapper