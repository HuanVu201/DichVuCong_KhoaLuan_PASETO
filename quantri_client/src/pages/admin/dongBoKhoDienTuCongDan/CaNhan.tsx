import { DanhSachGiayToProvider } from "./contexts/DanhSachGiayToProvider"
import { DanhSachGiayTo } from "./components/Table"
import { Nguon_CongDanTaiLen } from "@/features/portaldvc/HoSoCaNhan/components/KhoTaiLieuCongDan/models"


const DvcgqWrapper = () => (
    <DanhSachGiayToProvider hideThemMoi={true}>
        <DanhSachGiayTo extraSearchParams={{nguon: Nguon_CongDanTaiLen}} />
    </DanhSachGiayToProvider>
)

export default DvcgqWrapper