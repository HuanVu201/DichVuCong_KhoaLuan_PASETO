import { DuThaoXuLyHoSoTable } from "@/features/duthaoxulyhoso/components/DuThaoXuLyHoSoTable";
import { DuThaoXuLyHoSoProvider } from "@/features/duthaoxulyhoso/contexts/DuThaoXuLyHoSoContext";
import { DUTHAOXULYHOSO_LOAI, DUTHAOXULYHOSO_TRANGTHAI } from "@/features/duthaoxulyhoso/models";
import { ButtonActionProvider } from "@/features/hoso/contexts/ButtonActionsContext";


const XinLoiChoDuyetThongQuaWrapper = () => (
    <ButtonActionProvider>
        <DuThaoXuLyHoSoProvider>
        <DuThaoXuLyHoSoTable maScreen="du-thao-xin-loi-cho-duyet-thong-qua" extraSearchParams={{loaiDuThao: DUTHAOXULYHOSO_LOAI["Xin lỗi"], trangThaiDuThao: DUTHAOXULYHOSO_TRANGTHAI["Chờ ký duyệt"]}}/>
        </DuThaoXuLyHoSoProvider>
    </ButtonActionProvider>
)
export default XinLoiChoDuyetThongQuaWrapper