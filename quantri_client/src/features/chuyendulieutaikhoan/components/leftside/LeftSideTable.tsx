import { ISearchUser, IUser } from "@/features/user/models"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { SetStateAction, useState } from "react"
import { useColumn } from "./LeftSideColumn"
import { AntdSpace, AntdTable } from "@/lib/antd/components"
import { LeftSideChuyenDLTKSearch } from "./LeftSideSearch"
import { SearchUser } from "@/features/user/redux/Actions"
import { Table } from "antd"
import { IPaginationResponse } from "@/models"

const LeftSideChuyenDLTKTable = () => {
    const dispatch = useAppDispatch()
    const { datas: Configs, count, loading } = useAppSelector(state => state.user)
    const [searchParams, setSearchParams] = useState<ISearchUser>({ pageNumber: 1, pageSize: 50, reFetch: true })
    const [dataSource, setDataSource] = useState<SetStateAction<IPaginationResponse<IUser[]>>>([] as any);
    const updateDataSource = (res: IPaginationResponse<IUser[]>) => {
        setDataSource(res); // Cập nhật state dataSource với giá trị res mới
    
    };
    const data = [dataSource]
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    
    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <LeftSideChuyenDLTKSearch onUpdateDataSource={updateDataSource} />
                <Table
                    bordered
                    columns={columns as any}
                    loading={loading}
                    dataSource={data }
                    pagination={false}
                    // searchParams={searchParams}
                    // setSearchParams={setSearchParams}
                    // onSearch={(params) => dispatch(SearchUser(params))}
                    // scroll={{ x: 1500 }}
                />
            </AntdSpace>
        </>
    )
}
// const ConfigTableWrapper = () => (<ConfigProvider>
//     <ConfigTable />
// </ConfigProvider>)
export default LeftSideChuyenDLTKTable