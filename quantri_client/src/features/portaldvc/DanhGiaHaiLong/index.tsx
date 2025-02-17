import { ButtonActionProvider } from "@/features/hoso/contexts/ButtonActionsContext"
import { DanhGiaHaiLongPortal } from "./components/DanhGiaHaiLong"
import { DanhGiaHaiLongProvider } from "./contexts/DanhGiaHaiLongContexts"
import "./index.scss"

const DanhGiaHaiLongWrapper = () => {
    return (
        <ButtonActionProvider>
            <div className="containerDGHL commonBackgroundTrongDong" style={{ paddingTop: '50px' }}>
                <DanhGiaHaiLongPortal></DanhGiaHaiLongPortal>
            </div>
        </ButtonActionProvider>
    )
}


export default DanhGiaHaiLongWrapper