import { ButtonActionProvider } from "@/features/hoso/contexts/ButtonActionsContext"
import { DangXuLyProvider } from "../../xulyhoso/dangxuly/contexts/DangXuLyContext"
import { DangXuLyTable } from "../../xulyhoso/dangxuly/components/DangXuLyTable"

const HoSoDangXuLyPhiDiaGioiWrapper = () => (<DangXuLyProvider>
    <ButtonActionProvider>
        <DangXuLyTable maScreen="dang-xu-ly-phi-dia-gioi" extraSearchParams={{ byNguoiNhanPhiDiaGioi: true, byCurrentUser: undefined }}/>
    </ButtonActionProvider>
</DangXuLyProvider>)
export default HoSoDangXuLyPhiDiaGioiWrapper