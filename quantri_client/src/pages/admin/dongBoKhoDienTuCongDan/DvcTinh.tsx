import { DanhSachGiayToProvider } from "./contexts/DanhSachGiayToProvider"
import { DanhSachGiayTo } from "./components/Table"
import { Nguon_DVCQG } from "@/features/portaldvc/HoSoCaNhan/components/KhoTaiLieuCongDan/models"


const DvcTinhWrapper = () => (
    <DanhSachGiayToProvider>
        <DanhSachGiayTo syncAllGiayTo={true} extraSearchParams={{nguon: Nguon_DVCQG}} giayToQuocGiaModalTitle={"Chọn hồ sơ điện tử đồng bộ"} giayToQuocGiaSearchText="Lấy hồ sơ"/>
    </DanhSachGiayToProvider>
)

export default DvcTinhWrapper