import { useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { BaoCaoMau01Provider, useBaoCaoMau01Context } from "../contexts/BaoCao01Context"
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext"
import { BaoCao01Detail } from "./BaoCaoMau01Detail"
import { SearchBaoCao01 } from "@/features/hoso/components/actions/traKetQuaVaDanhGiaHaiLong/redux/action"
import { BaoCao01Search } from "./BaoCaoMau01Search"
import { IPhieuKhaoSat, ISearchPhieuKhaoSat } from "@/features/hoso/components/actions/traKetQuaVaDanhGiaHaiLong/models"
import { userInfo } from "os"
import { Table } from "antd"
import { IPaginationResponse } from "@/models"

const BaoCao01Table = () => {
    const dispatch = useAppDispatch()
    const { datas: BaoCao01s, count, loading } = useAppSelector(state => state.phieukhaosat)
    const { data: user } = useAppSelector(state => state.user)
    const BaoCao01Context = useBaoCaoMau01Context()
    const [dataSource, setDataSource] = useState<IPaginationResponse<IPhieuKhaoSat[]>>([] as any);
    const updateDataSource = (res: IPaginationResponse<IPhieuKhaoSat[]>) => {
        setDataSource(res); // Cập nhật state dataSource với giá trị res mới
    };
    const [searchParams, setSearchParams] = useState<ISearchPhieuKhaoSat>({ pageNumber: 1, pageSize: 50, reFetch: true, donVi: user?.officeCode })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <BaoCao01Search onUpdateDataSource={updateDataSource} setSearchParams={setSearchParams} />
                <Table
                    bordered
                    columns={columns}
                    loading={loading}
                    dataSource={dataSource.data}
                    pagination={{
                        total: count,
                    }}
                    scroll={{ x: 1500 }}
                />
            </AntdSpace>
            {BaoCao01Context.BaoCaoMau01ModalVisible ? <BaoCao01Detail /> : null}

        </>
    )
}
const BaoCao01TableWrapper = () => (<BaoCaoMau01Provider>
    <BaoCao01Table />
</BaoCaoMau01Provider>)
export default BaoCao01TableWrapper