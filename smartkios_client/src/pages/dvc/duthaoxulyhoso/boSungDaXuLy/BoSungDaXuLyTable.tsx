import { DuThaoXuLyHoSoTable } from "@/features/duthaoxulyhoso/components/DuThaoXuLyHoSoTable";
import { DUTHAOXULYHOSO_LOAI, DUTHAOXULYHOSO_TRANGTHAI } from "@/features/duthaoxulyhoso/models";
import { ButtonActionProvider } from "@/features/hoso/contexts/ButtonActionsContext";


const BoSungDaXuLyWrapper = () => (
    <ButtonActionProvider>
        <DuThaoXuLyHoSoTable maScreen="du-thao-bo-sung-da-xu-ly" extraSearchParams={{loaiDuThao: DUTHAOXULYHOSO_LOAI["Bổ sung"], trangThaiDuThao: DUTHAOXULYHOSO_TRANGTHAI["Đã xử lý"]}}/>
    </ButtonActionProvider>
)
export default BoSungDaXuLyWrapper