import { ButtonActionProvider } from "@/features/hoso/contexts/ButtonActionsContext"
import { TiepNhanHoSoTrucTuyenProvider } from "../../tiepnhanhoso/tructuyen/contexts/TiepNhanHoSoContext"
import {TiepNhanHoSoTrucTuyenTable} from "../../tiepnhanhoso/tructuyen/components/TiepNhanHoSoTrucTuyenTable"

const ChoTiepNhanChungThucTrucTuyen = () => (<TiepNhanHoSoTrucTuyenProvider>
    <ButtonActionProvider>
      <TiepNhanHoSoTrucTuyenTable maScreen="cho-tiep-nhan-ho-so-chung-thuc-truc-tuyen" extraSearchParams={{ laHoSoChungThuc: true}}/>
    </ButtonActionProvider>
  </TiepNhanHoSoTrucTuyenProvider>)
export default ChoTiepNhanChungThucTrucTuyen