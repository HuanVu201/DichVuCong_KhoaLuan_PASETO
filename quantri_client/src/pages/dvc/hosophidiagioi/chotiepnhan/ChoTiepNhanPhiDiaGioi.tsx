import { ButtonActionProvider } from "@/features/hoso/contexts/ButtonActionsContext";
import { TiepNhanHoSoProvider } from "../../tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext";
import {TiepNhanHoSoTrucTuyenTable} from "../../tiepnhanhoso/tructuyen/components/TiepNhanHoSoTrucTuyenTable";

const ChoTiepNhanPhiDiaGioiTableWrapper = () => (
    <TiepNhanHoSoProvider>
      <ButtonActionProvider>
        <TiepNhanHoSoTrucTuyenTable maScreen="cho-tiep-nhan-phi-dia-gioi" extraSearchParams={{ byNguoiNhanPhiDiaGioi: true, byCurrentUser: undefined, trangThaiPhiDiaGioi: "4"}}/>
      </ButtonActionProvider>
    </TiepNhanHoSoProvider>
  );
export default ChoTiepNhanPhiDiaGioiTableWrapper;
  