import { useCallback, useEffect, useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { LogDeletedUserSearch } from "./LogDeletedUserSearch"
import { SearchLogDeletedUser } from "../redux/action"
import { ISearchUser } from "@/features/user/models"
import { LogDeletedUserProvider } from "../contexts/LogDeletedUserContext"

const LogDeletedUserTable = () => {
    const dispatch = useAppDispatch()
    const { datas, count } = useAppSelector(state => state.logdeleteduser)
    const [searchParams, setSearchParams] = useState<ISearchUser>({ pageNumber: 1, pageSize: 30 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })

    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <LogDeletedUserSearch setSearchParams={setSearchParams} searchParams={searchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={datas}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchLogDeletedUser(params))
                    }
                />
            </AntdSpace>
        </>
    )
}
const LoaiLogTaiKhoanCSDLDanCuWrapper = () => (<LogDeletedUserProvider>
    <LogDeletedUserTable />
</LogDeletedUserProvider>)
export default LoaiLogTaiKhoanCSDLDanCuWrapper