import { ButtonActionProvider } from "@/features/hoso/contexts/ButtonActionsContext"
import { DaTraProvider } from "../../traketqua/datra/contexts/DaTraContext"
import { DaTraTable } from "../../traketqua/datra/components/DaTraTable"


const DaTraPhiDiaGioiTableWrapper = () => (<DaTraProvider>
    <ButtonActionProvider>
        <DaTraTable maScreen={"da-tra-ho-so-phi-dia-gioi"} extraSearchParams={{byNguoiNhanPhiDiaGioi: true, byCurrentUser: undefined, groupCode: undefined}}/>
    </ButtonActionProvider>
</DaTraProvider>)
export default DaTraPhiDiaGioiTableWrapper