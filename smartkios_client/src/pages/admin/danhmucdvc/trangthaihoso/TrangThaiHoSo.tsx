import { TrangThaiHoSoTable } from "@/features/trangthaihoso/components/TrangThaiHoSoTable"
import { TrangThaiHoSoProvider } from "@/features/trangthaihoso/contexts/TrangThaiHoSoContext"


const TrangThaiHoSoTableWrapper = () => (<TrangThaiHoSoProvider>
    <TrangThaiHoSoTable/>
</TrangThaiHoSoProvider>)
export default TrangThaiHoSoTableWrapper