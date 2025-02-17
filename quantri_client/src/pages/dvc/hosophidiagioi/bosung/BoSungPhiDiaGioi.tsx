import { ButtonActionProvider } from "@/features/hoso/contexts/ButtonActionsContext";
import { TiepNhanHoSoProvider } from "../../tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext";
import {TiepNhanHoSoTrucTuyenTable} from "../../tiepnhanhoso/tructuyen/components/TiepNhanHoSoTrucTuyenTable";
import {ChoBoSungTable} from "../../bosunghoso/chobosung/components/ChoBoSungTable";

const BoSungPhiDiaGioiTableWrapper = () => (
    <ButtonActionProvider>
        <ChoBoSungTable maScreen="bo-sung-nhan-phi-dia-gioi" extraSearchParams={{ byNguoiNhanPhiDiaGioi: true, byCurrentUser: undefined, trangThaiBoSung: undefined}}/>
    </ButtonActionProvider>
  );
export default BoSungPhiDiaGioiTableWrapper;
  