import { DuThaoXuLyHoSoTable } from "@/features/duthaoxulyhoso/components/DuThaoXuLyHoSoTable"
import { DUTHAOXULYHOSO_LOAI, DUTHAOXULYHOSO_TRANGTHAI } from "@/features/duthaoxulyhoso/models"
import { ButtonActionProvider } from "@/features/hoso/contexts/ButtonActionsContext"

const TraLaiXinRutChoKyDuyetWrapper = () => (
    <ButtonActionProvider>
        <DuThaoXuLyHoSoTable maScreen="du-thao-tra-lai-xin-rut-cho-ky-duyet" extraSearchParams={{loaiDuThao: DUTHAOXULYHOSO_LOAI["Trả lại/Xin rút"], trangThaiDuThao: DUTHAOXULYHOSO_TRANGTHAI["Chờ ký duyệt"]}}/>
    </ButtonActionProvider>
)
export default TraLaiXinRutChoKyDuyetWrapper