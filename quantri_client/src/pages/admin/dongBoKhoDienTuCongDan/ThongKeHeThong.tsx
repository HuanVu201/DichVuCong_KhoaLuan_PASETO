import { lazy } from "@/utils/lazyLoading"

const ThongKeDungLuongSuDungSwapper = lazy(() => import("../../../features/QuanLySuDungKhoTaiLieu/components/ThongKeDungLuong/ThongKeDungLuongSwapper"))

const ThongKeHeThong = () => (
    <ThongKeDungLuongSuDungSwapper/>
)

export default ThongKeHeThong