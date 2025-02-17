import { DuThaoXuLyHoSoTable } from "@/features/duthaoxulyhoso/components/DuThaoXuLyHoSoTable";
import { DuThaoXuLyHoSoProvider } from "@/features/duthaoxulyhoso/contexts/DuThaoXuLyHoSoContext";
import { DUTHAOXULYHOSO_LOAI, DUTHAOXULYHOSO_TRANGTHAI } from "@/features/duthaoxulyhoso/models";
import { ButtonActionProvider } from "@/features/hoso/contexts/ButtonActionsContext";


const BoSungDaXuLyWrapper = () => (
    <ButtonActionProvider>
        <DuThaoXuLyHoSoProvider>
            <DuThaoXuLyHoSoTable maScreen="du-thao-bo-sung-da-xu-ly" extraSearchParams={{ loaiDuThao: DUTHAOXULYHOSO_LOAI["Bổ sung"], trangThaiDuThao: DUTHAOXULYHOSO_TRANGTHAI["Đã xử lý"] }} />
        </DuThaoXuLyHoSoProvider>
    </ButtonActionProvider>
)
export default BoSungDaXuLyWrapper