import { DuThaoXuLyHoSoTable } from "@/features/duthaoxulyhoso/components/DuThaoXuLyHoSoTable";
import { DuThaoXuLyHoSoProvider } from "@/features/duthaoxulyhoso/contexts/DuThaoXuLyHoSoContext";
import { DUTHAOXULYHOSO_LOAI, DUTHAOXULYHOSO_TRANGTHAI } from "@/features/duthaoxulyhoso/models";
import { ButtonActionProvider } from "@/features/hoso/contexts/ButtonActionsContext";


const BoSungChoDuyetThongQuaWrapper = () => (
    <ButtonActionProvider>
        <DuThaoXuLyHoSoProvider>
            <DuThaoXuLyHoSoTable maScreen="du-thao-bo-sung-cho-duyet-thong-qua" extraSearchParams={{ loaiDuThao: DUTHAOXULYHOSO_LOAI["Bổ sung"], trangThaiDuThao: DUTHAOXULYHOSO_TRANGTHAI["Chờ ký duyệt"] }} />
        </DuThaoXuLyHoSoProvider>
    </ButtonActionProvider>
)
export default BoSungChoDuyetThongQuaWrapper