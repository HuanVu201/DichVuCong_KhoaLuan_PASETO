import { useState } from "react"
import { AntdTable, AntdSpace } from "../../../lib/antd/components"
import { useColumn } from "../hooks/useColumn"
import { ITaiKhoanThuHuong, ISearchTaiKhoanThuHuong } from "../models"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { SearchTaiKhoanThuHuong } from "../redux/action"
import { TaiKhoanThuHuongSearch } from "./TaiKhoanThuHuongSearch"
import { TaiKhoanThuHuongProvider, useTaiKhoanThuHuongContext } from "../contexts/TaiKhoanThuHuongContext"
import { TaiKhoanThuHuongDetail } from "./TaiKhoanThuHuongDetail"

const TaiKhoanThuHuongTable = () => {
    const dispatch = useAppDispatch()
    const TaiKhoanThuHuongContext = useTaiKhoanThuHuongContext()
    const { datas: TaiKhoanThuHuongs, count } = useAppSelector(state => state.taikhoanthuhuong)
    const [searchParams, setSearchParams] = useState<ISearchTaiKhoanThuHuong>({ pageNumber: 1, pageSize: 10 })
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize})
    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <TaiKhoanThuHuongSearch setSearchParams={setSearchParams} />
                <AntdTable
                    columns={columns}
                    dataSource={TaiKhoanThuHuongs}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchTaiKhoanThuHuong(params))}
                />
            </AntdSpace>
            {TaiKhoanThuHuongContext.TaiKhoanThuHuongModalVisible ? <TaiKhoanThuHuongDetail setSearchParams = {setSearchParams}/> : null}
        </>

    )
}
const LoaiTaiKhoanThuHuongWrapper = () => (<TaiKhoanThuHuongProvider>
    <TaiKhoanThuHuongTable />
</TaiKhoanThuHuongProvider>)
export default LoaiTaiKhoanThuHuongWrapper