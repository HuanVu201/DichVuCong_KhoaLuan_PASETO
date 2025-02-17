import { ButtonActionProvider } from "@/features/hoso/contexts/ButtonActionsContext";
import { TiepNhanHoSoProvider } from "../../tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext";
import {TiepNhanHoSoTrucTuyenTable} from "../../tiepnhanhoso/tructuyen/components/TiepNhanHoSoTrucTuyenTable";

const TiepNhanPhiDiaGioiTableWrapper = () => (
    <TiepNhanHoSoProvider>
      <ButtonActionProvider>
        <TiepNhanHoSoTrucTuyenTable maScreen="tiep-nhan-phi-dia-gioi" extraSearchParams={{ byNguoiNhanPhiDiaGioi: true, trangThaiPhiDiaGioi: "1", byCurrentUser: undefined }}/>
      </ButtonActionProvider>
    </TiepNhanHoSoProvider>
  );
export default TiepNhanPhiDiaGioiTableWrapper;
  