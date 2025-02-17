import { ButtonActionProvider } from "@/features/hoso/contexts/ButtonActionsContext";
import { ChoTraTrucTiepProvider } from "../../traketqua/chotratructiep/contexts/ChoTraTrucTiepContext";
import { ChoTraTrucTiepTable } from "../../traketqua/chotratructiep/components/ChoTraTrucTiepTable";

const HoSoTableWrapper = () => (
    <ChoTraTrucTiepProvider>
      <ButtonActionProvider>
        <ChoTraTrucTiepTable maScreen="da-tra-ket-qua-ho-so-chung-thuc" extraSearchParams={{kenhThucHien: undefined, laHoSoChungThuc: true, maTrangThai: "10", inMaTrangThais: []}}/>
      </ButtonActionProvider>
    </ChoTraTrucTiepProvider>
  );
  export default HoSoTableWrapper;
  