import { useState } from "react"
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

const BaoCao2Table = () => {
    const dispatch = useAppDispatch()
    const { datas: DanhGiaCoQuans, count, loading } = useAppSelector(state => state.danhgiacoquan)
    const [dataSource, setDataSource] = useState<IPaginationResponse<IDanhGiaCoQuan[]>>([] as any);
    const updateDataSource = (res: IPaginationResponse<IDanhGiaCoQuan[]>) => {
        setDataSource(res); // Cập nhật state dataSource với giá trị res mới
    };
    const danhGiaCoQuanContext = useDanhGiaCoQuanContext()
    const [searchParams, setSearchParams] = useState<ISearchDanhGiaCoQuan>({ pageNumber: 1, pageSize: 50, reFetch: true })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })

    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <BaoCao02Search onUpdateDataSource={updateDataSource} setSearchParams={setSearchParams} />
                <Table
                    bordered
                    columns={columns}
                    loading={loading}
                    dataSource={dataSource.data}

                    scroll={{ x: 1500 }}
                />
            </AntdSpace>
            {danhGiaCoQuanContext.DanhGiaCoQuanModalVisible ? <BaoCaoCoQuan02Detail /> : null}

        </>
    )
}
const DanhGiaCoQuanTableWrapper = () => (<DanhGiaCoQuanProvider>
    <BaoCao2Table />
</DanhGiaCoQuanProvider>)
export default DanhGiaCoQuanTableWrapper