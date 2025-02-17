import { DuThaoXuLyHoSoTable } from "@/features/duthaoxulyhoso/components/DuThaoXuLyHoSoTable"
import { DuThaoXuLyHoSoProvider } from "@/features/duthaoxulyhoso/contexts/DuThaoXuLyHoSoContext"
import { DUTHAOXULYHOSO_LOAI, DUTHAOXULYHOSO_TRANGTHAI } from "@/features/duthaoxulyhoso/models"
import { ButtonActionProvider } from "@/features/hoso/contexts/ButtonActionsContext"

const TraLaiXinRutChoDuyetThongQuaWrapper = () => (
    <ButtonActionProvider>
        <DuThaoXuLyHoSoProvider>
            <DuThaoXuLyHoSoTable maScreen="du-thao-tra-lai-xin-rut-cho-duyet-thong-qua" extraSearchParams={{ loaiDuThao: DUTHAOXULYHOSO_LOAI["Trả lại/Xin rút"], trangThaiDuThao: DUTHAOXULYHOSO_TRANGTHAI["Chờ ký duyệt"] }} />
        </DuThaoXuLyHoSoProvider>
    </ButtonActionProvider>
)
export default TraLaiXinRutChoDuyetThongQuaWrapper