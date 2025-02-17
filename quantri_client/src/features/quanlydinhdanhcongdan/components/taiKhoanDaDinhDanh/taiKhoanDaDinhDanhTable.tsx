import { useEffect, useState } from "react"
import { AntdTable, AntdSpace } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext"
import { QuanLyDinhDanhCongDanProvider, useQuanLyDinhDanhContext } from "../../context/quanLyDinhDanhCongDanContext"
import { ISearchQuanLyTaiKhoanDinhDanhParams } from "../../models/QuanLyTaiKhoanModel"
import { useColumnTaiKhoan } from "../../hooks/useColumnTaiKhoan"
import { SearchDanhSachTaiKhoan } from "../../redux/action"
import { TaiKhoanSearch } from "../taiKhoanSearch"
import { TaiKhoanDinhDanhDetail } from "../taiKhoanDetail"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { KhoTaiLieuDienTuManagerProvider } from "@/features/portaldvc_admin/ThongKeKhoTaiLieuDienTu/contexts/KhoTaiLieuDienTuManagerContext"
import KhoTaiLieuDienTuTabeleManager from "@/features/portaldvc_admin/ThongKeKhoTaiLieuDienTu/components/EditKhoOfUsers/KhoTaiLieuDienTuTableManager"
import LichSuTruyCapWrapper from "../lichsutruycapdetail"

const TaiKhoanDaDinhDanhTable = () => {
    const dispatch = useAppDispatch()
    const quanLyDinhDanhCongDanContext = useQuanLyDinhDanhContext()
    const { datas: dinhdanhcongdans, count, loading } = useAppSelector(state => state.dinhdanhcongdan)
    const [searchParams, setSearchParams] = useState<ISearchQuanLyTaiKhoanDinhDanhParams>({
        daDinhDanh: true,
        pageNumber: 1, pageSize: 10
    })

    const { columns } = useColumnTaiKhoan({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    useEffect(() => {
        dispatch(SearchDanhSachTaiKhoan(searchParams))
    }, [quanLyDinhDanhCongDanContext.reload])

    return (
        <>
            <AntdSpace direction="vertical" style={{ width: "100%" }}>
                <Spin spinning={loading}
                    indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
                >
                    <TaiKhoanSearch searchParams={searchParams} setSearchParams={setSearchParams} />
                    <AntdTable
                        // loading={loading}
                        columns={columns}
                        dataSource={dinhdanhcongdans}
                        pagination={{
                            total: count
                        }}
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                        onSearch={(params) => dispatch(SearchDanhSachTaiKhoan(params))}
                        style={{ margin: '20px 0' }}
                    />
                    <TaiKhoanDinhDanhDetail />
                    <KhoTaiLieuDienTuTabeleManager
                        soDinhDanh={quanLyDinhDanhCongDanContext.soDinhDanh}
                        setSoDinhDanh={(value) => quanLyDinhDanhCongDanContext.setSoDinhDanh(value)}
                        khoTaiLieuDienTuModalVisible={quanLyDinhDanhCongDanContext.khoTaiLieuDienTuModalVisible}
                        setKhoTaiLieuDienTuModalVisible={(value: boolean) => quanLyDinhDanhCongDanContext.setKhoTaiLieuDienTuModalVisible(value)}
                    />
                    <LichSuTruyCapWrapper></LichSuTruyCapWrapper>
                </Spin>
            </AntdSpace>

        </>
    )
}
const TaiKhoanDaDinhDanhTableWrapper = () => (
    <QuanLyDinhDanhCongDanProvider>
        <KhoTaiLieuDienTuManagerProvider>
            <TaiKhoanDaDinhDanhTable />
        </KhoTaiLieuDienTuManagerProvider>
    </QuanLyDinhDanhCongDanProvider>
)
export default TaiKhoanDaDinhDanhTableWrapper