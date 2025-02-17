import { ButtonActionProvider } from "@/features/hoso/contexts/ButtonActionsContext"
import { ChoTraKetQuaTable } from "../../traketqua/chotraketqua/components/ChoTraKetQuaTable"
import { ChoTraKetQuaProvider } from "../../traketqua/chotraketqua/contexts/ChoTraKetQuaContext";


const HoSoTableWrapper = () => (
    <ChoTraKetQuaProvider>
      <ButtonActionProvider>
        <ChoTraKetQuaTable maScreen="cho-tra-ket-qua-phi-dia-gioi" extraSearchParams={{byNguoiNhanPhiDiaGioi: true, byCurrentUser: undefined, donViTraKq: undefined}}/>
      </ButtonActionProvider>
    </ChoTraKetQuaProvider>
  );
  export default HoSoTableWrapper;
  