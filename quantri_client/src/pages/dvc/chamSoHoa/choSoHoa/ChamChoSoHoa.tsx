import { ButtonActionProvider } from "@/features/hoso/contexts/ButtonActionsContext"
import ChamSoHoaTable from "../Table"
import { TramSoHoaProvider } from "../contexts/TramSoHoaContext"


const DaChamSoHoa = () => {
    return <TramSoHoaProvider>
        <ButtonActionProvider>
            <ChamSoHoaTable maScreen={"cham-so-hoa-cho-so-hoa"} extraSearchParams={{ trangThaiSoHoa: "1" }} />
        </ButtonActionProvider>
    </TramSoHoaProvider>
}

export default DaChamSoHoa 