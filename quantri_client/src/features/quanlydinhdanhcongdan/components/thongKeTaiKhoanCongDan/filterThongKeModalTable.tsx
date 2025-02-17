import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useQuanLyDinhDanhContext } from "../../context/quanLyDinhDanhCongDanContext"
import { AntdModal, AntdSpace, AntdTable } from "@/lib/antd/components"
import { TaiKhoanSearch } from "../taiKhoanSearch"
import { useEffect, useState } from "react"
import { ISearchQuanLyTaiKhoanDinhDanhParams } from "../../models/QuanLyTaiKhoanModel"
import { TaiKhoanDinhDanhDetail } from "../taiKhoanDetail"
import { SearchDanhSachTaiKhoan } from "../../redux/action"
import { useColumnTaiKhoan } from "../../hooks/useColumnTaiKhoan"
import { TaiKhoanSearchForThongKe } from "./taiKhoanSearchForThongKe"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import KhoTaiLieuDienTuTabeleManager from "@/features/portaldvc_admin/ThongKeKhoTaiLieuDienTu/components/EditKhoOfUsers/KhoTaiLieuDienTuTableManager"


export const FilterThongKeModal = () => {
    const dispatch = useAppDispatch()
    const quanLyDinhDanhContext = useQuanLyDinhDanhContext()
    const { datas: dinhdanhcongdans, count, loading } = useAppSelector(state => state.dinhdanhcongdan)
    const [title, setTitle] = useState<string>()

    const { columns } = useColumnTaiKhoan({
        pageNumber: quanLyDinhDanhContext.filterTaiKhoanParams.pageNumber,
        pageSize: quanLyDinhDanhContext.filterTaiKhoanParams.pageSize
    })

    const handleCancel = () => {
        quanLyDinhDanhContext.setFilterThongKeModalVisible(false)
        quanLyDinhDanhContext.setFilterTaiKhoanParams({
            ...quanLyDinhDanhContext.filterTaiKhoanParams,
            fullName: undefined,
            userName: undefined,
            phoneNumber: undefined,
            email: undefined
        })
    }
    useEffect(() => {
        setTitle(`${quanLyDinhDanhContext.filterTaiKhoanParams.daDinhDanh == true ? 'đã định danh ' : 'chưa định danh '}`
            + `${quanLyDinhDanhContext.filterTaiKhoanParams.doiTuong == 'congDan' ? 'của Công dân' : quanLyDinhDanhContext.filterTaiKhoanParams.doiTuong == 'toChucDoanhNghiep' ? 'của Tổ chức/Doanh nghiệp' : ''}`)
    })

    useEffect(() => {
        if (quanLyDinhDanhContext.filterThongKeModalVisible)
            dispatch(SearchDanhSachTaiKhoan(quanLyDinhDanhContext.filterTaiKhoanParams))
    }, [quanLyDinhDanhContext.reload])

    return (<>
        <AntdModal title={`Danh sách tài khoản ${title}`} visible={quanLyDinhDanhContext.filterThongKeModalVisible} handlerCancel={handleCancel} footer={null} fullsizeScrollable>

            <AntdSpace direction="vertical" style={{ width: "100%" }} >
                <Spin spinning={loading}
                    indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
                >
                    <TaiKhoanSearchForThongKe />
                    <AntdTable
                        // loading={loading}
                        columns={columns}
                        dataSource={dinhdanhcongdans}
                        pagination={{
                            total: count
                        }}
                        searchParams={quanLyDinhDanhContext.filterTaiKhoanParams}
                        setSearchParams={quanLyDinhDanhContext.setFilterTaiKhoanParams}
                        onSearch={(params) => dispatch(SearchDanhSachTaiKhoan(params))}
                        style={{ margin: '20px 0' }}
                    />
                    <TaiKhoanDinhDanhDetail />
                    <KhoTaiLieuDienTuTabeleManager
                        soDinhDanh={quanLyDinhDanhContext.soDinhDanh}
                        setSoDinhDanh={(value) => quanLyDinhDanhContext.setSoDinhDanh(value)}
                        khoTaiLieuDienTuModalVisible={quanLyDinhDanhContext.khoTaiLieuDienTuModalVisible}
                        setKhoTaiLieuDienTuModalVisible={(value: boolean) => quanLyDinhDanhContext.setKhoTaiLieuDienTuModalVisible(value)}
                    />
                </Spin>
            </AntdSpace>
        </AntdModal>
    </>)
}