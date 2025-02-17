import { ButtonActionProvider } from "@/features/hoso/contexts/ButtonActionsContext";
import { ChoTraTrucTiepProvider } from "../../traketqua/chotratructiep/contexts/ChoTraTrucTiepContext";
import { ChoTraTrucTiepTable } from "../../traketqua/chotratructiep/components/ChoTraTrucTiepTable";
import { TheoDoiHoSoChungThucProvider } from "@/features/theodoihosochungthuc/contexts/TheoDoiHoSoChungThucContext";
import TheoDoiHoSoChungThucTable from "@/features/theodoihosochungthuc/components/TheoDoiHoSoChungThucTable";

const TheoDoiHoSoChungThucWrapper = () => (
    <TheoDoiHoSoChungThucProvider>
      <ButtonActionProvider>
        <TheoDoiHoSoChungThucTable maScreen="theo-doi-ho-so-chung-thuc"  />
      </ButtonActionProvider>
    </TheoDoiHoSoChungThucProvider>
  );
  export default TheoDoiHoSoChungThucWrapper;
  