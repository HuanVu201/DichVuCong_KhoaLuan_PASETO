import { ButtonActionProvider } from '@/features/hoso/contexts/ButtonActionsContext'
import {TraCuuPhiDiaGioi} from '../tracuu/TraCuuPhiDiaGioi'

const DanhSachDaTiepNhan = () => (
    <ButtonActionProvider>
        <TraCuuPhiDiaGioi maScreen='danh-sach-ho-so-da-tiep-nhan-phi-dia-gioi'/>
    </ButtonActionProvider>
)
export default DanhSachDaTiepNhan