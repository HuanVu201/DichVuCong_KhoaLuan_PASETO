import { ButtonActionProvider } from "@/features/hoso/contexts/ButtonActionsContext"
import { DanhGiaHaiLongPortal } from "./components/DanhGiaHaiLong"
import { DanhGiaHaiLongProvider } from "./contexts/DanhGiaHaiLongContexts"

const DanhGiaHaiLongWrapper = () => {
    return (
        <ButtonActionProvider>
            <div className="container" style={{ marginTop: '50px' }}>
                <DanhGiaHaiLongPortal></DanhGiaHaiLongPortal>
            </div>
        </ButtonActionProvider>
    )
}


export default DanhGiaHaiLongWrapper