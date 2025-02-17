import { FormNopHoSo } from "@/features/portaldvc/NopHoSoTrucTuyen/components"
import { AntdModal } from "@/lib/antd/components"
import { useHoSoLuuTruContext } from "../contexts/HoSoLuuTruContext"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { GetDuLieuThemHoSo } from "@/features/truonghopthutuc/redux/action"
import { useEffect } from "react"
import { FormNopHoSoLuuTru } from "./FormNopHoSoLuuTru"
import { resetData } from "@/features/hosonhap/redux/slice"
import { URLSearchParamsInit, NavigateOptions, useSearchParams } from "react-router-dom"

export const HoSoLuuTruDetail = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const hoSoLuuTruContext = useHoSoLuuTruContext()
    const handleCancel = () => {
        hoSoLuuTruContext.setHoSoLuuTruModalVisible(false)
        dispatch(resetData())
        setSearchParams({})
    }
    const { duLieuThemHoSo } = useAppSelector(state => state.truonghopthutuc)
    const { data: user } = useAppSelector(state => state.user)

    const dispatch = useAppDispatch()
    // useEffect(() => {
    //     window.objDataCSDLDanCu = undefined
    //     window.objDataNopHoSo = undefined
    //     if (searchParams.get("maTTHC")) {
    //         dispatch(
    //             GetDuLieuThemHoSo({
    //                 thuTucId: searchParams.get("maTTHC") as any,
    //                 truongHopId: searchParams.get("maTruongHop") as any,
    //                 returnPhiLePhi: true,
    //                 returnDonVi: true,
    //                 returnUserInfo: true,
    //                 donViId: searchParams.get("donViId") as any,
    //                 userId: user?.id
    //             })
    //         )
    //     }

    // }, [searchParams])

    return (
        <AntdModal
            width={2000}
            style={{ top: 10 }}
            title="Hồ sơ chưa gửi"
            visible={true}
            handlerCancel={handleCancel}
            footer={null}
        >
            <FormNopHoSoLuuTru ></FormNopHoSoLuuTru>
        </AntdModal>
    )
}