import { DuThaoXuLyHoSoTable } from "@/features/duthaoxulyhoso/components/DuThaoXuLyHoSoTable";
import { DUTHAOXULYHOSO_LOAI, DUTHAOXULYHOSO_TRANGTHAI } from "@/features/duthaoxulyhoso/models";
import { ButtonActionProvider } from "@/features/hoso/contexts/ButtonActionsContext";


const BoSungChoKyDuyetWrapper = () => (
    <ButtonActionProvider>
        <DuThaoXuLyHoSoTable maScreen="du-thao-bo-sung-cho-xu-ly" extraSearchParams={{loaiDuThao: DUTHAOXULYHOSO_LOAI["Bổ sung"], trangThaiDuThao: DUTHAOXULYHOSO_TRANGTHAI["Chờ ký duyệt"]}}/>
    </ButtonActionProvider>
)
export default BoSungChoKyDuyetWrapper