import { AntdButton, AntdModal, AntdSpace, AntdTable } from "@/lib/antd/components"
import { LoadingOutlined } from "@ant-design/icons"
import { Spin } from "antd"
import { ComponentProps, Suspense, useEffect, useState } from "react"
import { useDanhSachTaiLieuNguoiDung } from "../../hooks/useDanhSachTaiLieuNguoiDung"
import { khoTaiLieuCongDanApi, SearchDanhSachTaiLieuCongDan } from "@/features/portaldvc/HoSoCaNhan/components/KhoTaiLieuCongDan/services"
import { ITaiLieuLuuTruCongDan, Nguon_DVCQG } from "@/features/portaldvc/HoSoCaNhan/components/KhoTaiLieuCongDan/models"
import { toast } from "react-toastify"
import { lazy } from "@/utils/lazyLoading"
import { KhoTaiLieuCongDanProvider, useKhoTaiLieuCongDanContext } from "@/features/portaldvc/HoSoCaNhan/components/KhoTaiLieuCongDan/contexts/KhoTaiLieuCongDanContext"

const TaiLieuDetailModal = lazy(() => import("../../../../features/portaldvc/HoSoCaNhan/components/KhoTaiLieuCongDan/components/TaiLieuDetailModal"))

const ChiTietNguoiSuDungModal = ({ onClose, khoLuuTruId, nguon, isViewDetail }: { onClose: () => void; khoLuuTruId: string | undefined, nguon?: string | undefined, isViewDetail?: boolean }) => {
    const [loading, setLoading] = useState(false)
    const khoTaiLieuContext = useKhoTaiLieuCongDanContext()
    const [dataSource, setDataSource] = useState<ITaiLieuLuuTruCongDan[]>([])
    const [searchParams, setSearchParams] = useState<SearchDanhSachTaiLieuCongDan>({ pageNumber: 1, pageSize: 10 })
    const [count, setCount] = useState(0)
    const columns = useDanhSachTaiLieuNguoiDung({ pagination: { pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize } })

    useEffect(() => {
        ; (async () => {
            if (khoLuuTruId || nguon) {
                setLoading(true)
                try {
                    const res = await khoTaiLieuCongDanApi.DanhSachTaiLieuCongDan({ ...searchParams, khoLuuTruId, nguon: nguon })
                    setDataSource(res.data.data)
                    setCount(res.data.totalCount)
                } catch (error) {
                    console.log(error);
                    toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
                    setLoading(false)
                } finally {
                    setLoading(false)
                }
            }
        })()
    }, [searchParams, nguon])
    const toggleModalVisibleHandler = () => {
        khoTaiLieuContext.setDetailTaiLieuCongDanModalVisible((curr) => !curr)
    }

    return <AntdModal width={1280} title="Danh sách tài liệu cá nhân" visible={true} handlerCancel={onClose} footer={isViewDetail ? null : undefined} okText={"Thêm mới"} onOk={toggleModalVisibleHandler}>
        <AntdSpace direction="vertical" style={{ width: "100%" }}>
            <Spin spinning={loading}
                indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
            >
                <AntdTable
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={() => { }}
                    style={{ marginTop: 10 }}
                />
            </Spin>
            {khoTaiLieuContext.detailTaiLieuCongDanModalVisible ? <Suspense fallback={<Spin spinning={true} rootClassName="suspense-spin"></Spin>}>
                <TaiLieuDetailModal searchParams={searchParams} setSearchParams={setSearchParams} />
            </Suspense> : null}
        </AntdSpace>
    </AntdModal>
}
const ChiTietNguoiSuDungModalWrapper = (props: ComponentProps<typeof ChiTietNguoiSuDungModal>) => <KhoTaiLieuCongDanProvider>
    <ChiTietNguoiSuDungModal {...props} />
</KhoTaiLieuCongDanProvider>

export default ChiTietNguoiSuDungModalWrapper 