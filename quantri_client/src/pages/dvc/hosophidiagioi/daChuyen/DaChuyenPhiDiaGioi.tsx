import { ButtonActionProvider } from '@/features/hoso/contexts/ButtonActionsContext'
import {TraCuuPhiDiaGioi} from '../tracuu/TraCuuPhiDiaGioi'

const DaChuyenPhiDiaGioi = () => (
    <ButtonActionProvider>
        <TraCuuPhiDiaGioi maScreen='ho-so-da-chuyen-phi-dia-gioi' extraSearchParams={{khongThuocTrangThaiPhiDiaGioi: "1", trangThaiPhiDiaGioi: undefined}}/>
    </ButtonActionProvider>
)
export default DaChuyenPhiDiaGioi