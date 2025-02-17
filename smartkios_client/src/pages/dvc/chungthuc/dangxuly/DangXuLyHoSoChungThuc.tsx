import { ButtonActionProvider } from "@/features/hoso/contexts/ButtonActionsContext"
import { DangXuLyProvider } from "../../xulyhoso/dangxuly/contexts/DangXuLyContext"
import { DangXuLyTable } from "../../xulyhoso/dangxuly/components/DangXuLyTable"

const HoSoTableWrapper = () => (<DangXuLyProvider>
    <ButtonActionProvider>
        <DangXuLyTable maScreen="dang-xu-ly-ho-so-chung-thuc" extraSearchParams={{ laHoSoChungThuc: true}}/>
    </ButtonActionProvider>
</DangXuLyProvider>)
export default HoSoTableWrapper