import { ButtonActionProvider } from "@/features/hoso/contexts/ButtonActionsContext";
import { TiepNhanHoSoProvider } from "../../tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext";
import {TiepNhanHoSoTrucTuyenTable} from "../../tiepnhanhoso/tructuyen/components/TiepNhanHoSoTrucTuyenTable";

const TiepNhanPhiDiaGioiTableWrapper = () => (
    <TiepNhanHoSoProvider>
      <ButtonActionProvider>
        <TiepNhanHoSoTrucTuyenTable maScreen="cho-ky-duyet-phi-dia-gioi" extraSearchParams={{ byNguoiNhanPhiDiaGioi: true, byCurrentUser: undefined, viewHoSo: "cho-ky-duyet-phi-dia-gioi" }}/>
      </ButtonActionProvider>
    </TiepNhanHoSoProvider>
  );
export default TiepNhanPhiDiaGioiTableWrapper;