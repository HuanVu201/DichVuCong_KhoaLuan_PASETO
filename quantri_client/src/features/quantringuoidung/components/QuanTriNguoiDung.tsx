import CoCauToChucWrapper from "@/features/cocautochuc/components/CoCauToChucWrapper"
import { useAppSelector } from "@/lib/redux/Hooks"

export const QuanTriNguoiDung = () => {
    const { data: user } = useAppSelector(state => state.user)
    return (
        <CoCauToChucWrapper role={user?.officeCode || ''}></CoCauToChucWrapper>
    )
}