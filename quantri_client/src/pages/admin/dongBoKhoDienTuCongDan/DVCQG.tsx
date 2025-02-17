import { DanhSachGiayToProvider } from "./contexts/DanhSachGiayToProvider"
import { DanhSachGiayTo } from "./components/Table"
import { Nguon_DVCQG } from "@/features/portaldvc/HoSoCaNhan/components/KhoTaiLieuCongDan/models"


const DvcgqWrapper = () => (
    <DanhSachGiayToProvider>
        <DanhSachGiayTo extraSearchParams={{nguon: Nguon_DVCQG}} />
    </DanhSachGiayToProvider>
)

export default DvcgqWrapper