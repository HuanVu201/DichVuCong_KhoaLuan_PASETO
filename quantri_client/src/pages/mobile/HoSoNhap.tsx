import { setAuth } from "@/features/auth/redux/Slice"
import { FormNopHoSoLuuTru } from "@/features/portaldvc/HoSoCaNhan/components/HoSoLuuTru/components/FormNopHoSoLuuTru"
import { HoSoLuuTruProvider } from "@/features/portaldvc/HoSoCaNhan/components/HoSoLuuTru/contexts/HoSoLuuTruContext"
import { FormNopHoSo } from "@/features/portaldvc/NopHoSoTrucTuyen/components"
import { GetUserById } from "@/features/user/redux/Actions"
import { setUserData } from "@/features/user/redux/Slice"
import { userService } from "@/features/user/services"
import axiosInstance from "@/lib/axios"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { IParseUserToken } from "@/models"
import { TiepNhanHoSoProvider } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext"
import { parseJwt } from "@/utils/common"
import { ConfigProvider, Spin } from "antd"
import { useEffect, useLayoutEffect } from "react"
import { useSearchParams } from "react-router-dom"

const HoSoNhapMobileWrapper = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const dispatch = useAppDispatch()
    const { data: auth } = useAppSelector(state => state.auth)
    const { data: user } = useAppSelector(state => state.user)
    useEffect(() => {
        const emcElement = document.querySelector(".yhy-append-wrap") as HTMLDivElement | undefined
        if (emcElement) {
            emcElement.style.display = "none"
        }
        return () => {
            if (emcElement) {
                emcElement.style.display = "block"
            }
        }
    }, [])
    useEffect(() => {
        const token = searchParams.get("token")
        if (token && !auth) {
            dispatch(setAuth({ token, refreshToken: "", refreshTokenExpiryTime: "" }))
        }
    }, [searchParams, auth])

    useEffect(() => {
        (async () => {
            if (auth && auth.token) {
                const parseToken: IParseUserToken = parseJwt(auth.token)
                const res = await userService.GetById(parseToken.uid, auth.token)
                if (res.data) {
                    dispatch(setUserData(parseToken))
                }
            }
        })()
    }, [auth])

    return (
        <>
            {user ? <HoSoLuuTruProvider>
                <TiepNhanHoSoProvider>
                    <FormNopHoSoLuuTru/>
                </TiepNhanHoSoProvider>
            </HoSoLuuTruProvider> : null}
        </>
    )
}

const HoSoNhapWithConfigProvider = () => {
    return <ConfigProvider theme={{
        token: {
        },
        components: {
            Button: {
                colorBgContainer: "#f0ad4e"
            }
        }
    }}>
        <HoSoNhapMobileWrapper />
    </ConfigProvider>
}

export default HoSoNhapWithConfigProvider