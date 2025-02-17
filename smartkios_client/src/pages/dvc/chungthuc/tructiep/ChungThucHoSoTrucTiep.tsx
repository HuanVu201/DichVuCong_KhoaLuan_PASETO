import { ButtonActionProvider } from "@/features/hoso/contexts/ButtonActionsContext";
import { TiepNhanHoSoProvider } from "../../tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext";
import {TiepNhanHoSoTable} from "../../tiepnhanhoso/tructiep/components/TiepNhanHoSoTable";

const HoSoTableWrapper = () => (
    <TiepNhanHoSoProvider>
      <ButtonActionProvider>
        <TiepNhanHoSoTable maScreen="tiep-nhan-ho-so-chung-thuc-truc-tiep" extraSearchParams={{ laHoSoChungThuc: true}}/>
      </ButtonActionProvider>
    </TiepNhanHoSoProvider>
  );
export default HoSoTableWrapper;
  