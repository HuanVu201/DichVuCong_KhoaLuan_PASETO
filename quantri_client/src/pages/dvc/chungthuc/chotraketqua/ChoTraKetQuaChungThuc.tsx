import { ButtonActionProvider } from "@/features/hoso/contexts/ButtonActionsContext";
import { ChoTraTrucTiepProvider } from "../../traketqua/chotratructiep/contexts/ChoTraTrucTiepContext";
import { ChoTraTrucTiepTable } from "../../traketqua/chotratructiep/components/ChoTraTrucTiepTable";

const HoSoTableWrapper = () => (
    <ChoTraTrucTiepProvider>
      <ButtonActionProvider>
        <ChoTraTrucTiepTable maScreen="cho-tra-ket-qua-ho-so-chung-thuc" extraSearchParams={{kenhThucHien: undefined, laHoSoChungThuc: true, laNguoiNhanHoSo: true,
          inMaTrangThais: undefined, maTrangThai: '9'
        }}/>
      </ButtonActionProvider>
    </ChoTraTrucTiepProvider>
  );
  export default HoSoTableWrapper;
  