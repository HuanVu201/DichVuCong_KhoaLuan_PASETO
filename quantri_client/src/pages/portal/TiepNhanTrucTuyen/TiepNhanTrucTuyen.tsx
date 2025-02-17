import { HoSoLuuTruProvider } from "@/features/portaldvc/HoSoCaNhan/components/HoSoLuuTru/contexts/HoSoLuuTruContext"
import { FormNopHoSoWrapper } from "@/features/portaldvc/NopHoSoTrucTuyen/components/FormNopHoSoWrapper"
import { TiepNhanHoSoProvider } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext"

const TiepNhanTrucTuyenWrapper = () => {
    return (
        <TiepNhanHoSoProvider>
            <HoSoLuuTruProvider>
                <FormNopHoSoWrapper />
            </HoSoLuuTruProvider>
        </TiepNhanHoSoProvider>
    )
}

export default TiepNhanTrucTuyenWrapper