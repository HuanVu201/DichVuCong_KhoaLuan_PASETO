import { FormNopHoSoWrapper } from "@/features/portaldvc/NopHoSoTrucTuyen/components/FormNopHoSoWrapper"
import { TiepNhanHoSoProvider } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext"

const TiepNhanTrucTuyenWrapper = () => {
    return (
        <TiepNhanHoSoProvider>
            <FormNopHoSoWrapper/>
        </TiepNhanHoSoProvider>
    )
}

export default TiepNhanTrucTuyenWrapper