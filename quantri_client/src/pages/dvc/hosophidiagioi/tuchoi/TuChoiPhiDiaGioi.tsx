import { ButtonActionProvider } from "@/features/hoso/contexts/ButtonActionsContext";
import { TiepNhanHoSoProvider } from "../../tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext";
import {TuChoiTiepNhanHoSoTrucTuyenTable} from "../../tiepnhanhoso/tuchoitiepnhan/components/TuChoiTiepNhanHoSoTrucTuyenTable";

const TuChoiPhiDiaGioiTableWrapper = () => (
    <TiepNhanHoSoProvider>
      <ButtonActionProvider>
        <TuChoiTiepNhanHoSoTrucTuyenTable maScreen="tu-choi-phi-dia-gioi" extraSearchParams={{ byNguoiNhanPhiDiaGioi: true , byCurrentUser: undefined}}/>
      </ButtonActionProvider>
    </TiepNhanHoSoProvider>
  );
export default TuChoiPhiDiaGioiTableWrapper;
  