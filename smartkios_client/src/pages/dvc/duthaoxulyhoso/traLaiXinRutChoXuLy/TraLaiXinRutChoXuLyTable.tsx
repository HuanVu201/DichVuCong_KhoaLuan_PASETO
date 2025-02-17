import { DuThaoXuLyHoSoTable } from "@/features/duthaoxulyhoso/components/DuThaoXuLyHoSoTable";
import { DUTHAOXULYHOSO_LOAI, DUTHAOXULYHOSO_TRANGTHAI } from "@/features/duthaoxulyhoso/models";
import { ButtonActionProvider } from "@/features/hoso/contexts/ButtonActionsContext";


const TraLaiXinRutChoXuLyWrapper = () => (
    <ButtonActionProvider>
        <DuThaoXuLyHoSoTable maScreen="du-thao-tra-lai-xin-rut-cho-xu-ly"  extraSearchParams={{loaiDuThao: DUTHAOXULYHOSO_LOAI["Trả lại/Xin rút"], trangThaiDuThao: DUTHAOXULYHOSO_TRANGTHAI["Chờ xử lý"]}}/>
    </ButtonActionProvider>
)
export default TraLaiXinRutChoXuLyWrapper